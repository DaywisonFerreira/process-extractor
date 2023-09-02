import { InjectModel } from '@nestjs/mongoose';
import { IProcessRepository } from 'src/data/protocols/db/process-repository.interface';
import { Process } from 'src/domain/entities/process';
import { ProcessDocument, ProcessEntity } from '../schemas/process.entity';
import { Model } from 'mongoose';
import { FilterPaginateProcessDto } from 'src/presentation/dtos/filter-paginate-process.dto';
import { MongooseProcessMapper } from '../mappers/mongoose-process-mapper';

export class MongooseProcessRepository implements IProcessRepository {
  constructor(
    @InjectModel(ProcessEntity.name)
    private processModel: Model<ProcessDocument>,
  ) {}

  async create(data: Process): Promise<void> {
    const conditions = { codigoLicitacao: data.codigoLicitacao };
    const existingDocument = await this.processModel.findOne(conditions);
    if (existingDocument) {
      await this.processModel.updateOne(conditions, data);
    } else {
      await this.processModel.create(data);
    }
  }

  async getAll(
    filterArgs: FilterPaginateProcessDto,
  ): Promise<[Process[], number]> {
    const {
      dataHoraInicioLances,
      descricaoItem,
      numero,
      resumo,
      pageNumber,
      pageSize,
    } = filterArgs;
    const filter = {};

    if (numero) {
      filter['numero'] = numero;
    }

    if (dataHoraInicioLances) {
      filter['dataHoraInicioLances'] = {
        $gte: `${dataHoraInicioLances}T00:00:00`,
        $lte: `${dataHoraInicioLances}T23:59:59`,
      };
    }

    if (descricaoItem) {
      filter['$text'] = { $search: descricaoItem };
    }

    if (resumo) {
      filter['$text'] = { $search: resumo };
    }

    const orderBy = { codigoLicitacao: 1 } as any;
    const count = await this.processModel.countDocuments(filter).exec();
    const list = await this.processModel
      .find(filter, {
        _id: 0,
        __v: 0,
      })
      .limit(pageSize)
      .skip(pageSize * pageNumber)
      .sort(orderBy)
      .exec();

    const processList = list.map((process) =>
      MongooseProcessMapper.toDomainEntity(process),
    );
    return [processList, count];
  }

  async remove(processes: number[]): Promise<void> {
    await this.processModel.deleteMany({
      codigoLicitacao: { $nin: processes },
    });
  }
}
