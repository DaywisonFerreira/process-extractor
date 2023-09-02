import { Inject } from '@nestjs/common';
import { IProcessRepository } from 'src/data/protocols/db/process-repository.interface';
import { Process } from 'src/domain/entities/process';
import { FilterPaginateProcessDto } from 'src/presentation/dtos/filter-paginate-process.dto';

export class GetAllProcessService {
  constructor(
    @Inject('ProcessRepository')
    private readonly processRepository: IProcessRepository,
  ) {}

  async execute(
    filter: FilterPaginateProcessDto,
  ): Promise<[Process[], number]> {
    return this.processRepository.getAll(filter);
  }
}
