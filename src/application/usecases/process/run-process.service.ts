import { Inject } from '@nestjs/common';
import { ApiGateway } from 'src/data/protocols/api/api-gateway.interface';
import { ItemResult } from 'src/data/protocols/api/items-process-response.interface';
import { IProcess } from 'src/data/protocols/api/process-response.interface';
import { IProcessRepository } from 'src/data/protocols/db/process-repository.interface';
import { Process } from 'src/domain/entities/process';
import * as mongoose from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { DateUtilHelper } from 'src/utils/date-helper';

export class RunProcessService {
  isExtracting = false;

  constructor(
    @Inject('ProcessRepository')
    private readonly processRepository: IProcessRepository,
    @Inject('ProcessApiGateway')
    private readonly processApiGateway: ApiGateway,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async execute(): Promise<void> {
    if (!this.checkExtractionExecution()) {
      this.isExtracting = true;
      try {
        const existingProcesses = [];
        const { startDate, endDate } = DateUtilHelper.getNext30DaysRange();
        let currentPage = 1;
        let pageCount = 1;

        while (currentPage <= pageCount) {
          const response = await this.processApiGateway.getProcess(
            currentPage,
            startDate,
            endDate,
          );
          if (response?.result?.length) {
            const processPromises = response.result.map(async (process) => {
              existingProcesses.push(process.codigoLicitacao);
              const items = await this.getItensByProcess(
                process.codigoLicitacao,
              );
              return this.saveProcess(process, items);
            });

            await Promise.all(processPromises);
          }
          if (response?.nextPage && currentPage < response.pageCount) {
            currentPage++;
            pageCount = response.pageCount;
          } else {
            break;
          }
        }

        if (existingProcesses.length) {
          await this.processRepository.remove(existingProcesses);
        }
      } catch (error) {
        throw error;
      } finally {
        this.isExtracting = false;
      }
    }
  }

  private async getItensByProcess(process: number): Promise<any[]> {
    try {
      const allItens = [];
      let currentPage = 1;
      let pageCount = 1;

      while (currentPage <= pageCount) {
        const response = await this.processApiGateway.getItemsProcess(
          process,
          currentPage,
        );

        let items;

        if (response.isLote) {
          items = response.lotes.result[0].itens;
        } else {
          items = response.itens.result;
        }

        allItens.push(...items);

        const responsePageCount =
          response?.itens?.pageCount || response?.lotes?.pageCount;

        const responseNextPage =
          response?.itens?.nextPage || response?.lotes?.nextPage;

        if (responseNextPage && currentPage < responsePageCount) {
          currentPage++;
          pageCount = responsePageCount;
        } else {
          break;
        }
      }
      return allItens;
    } catch (error) {
      throw error;
    }
  }

  private async saveProcess(
    process: IProcess,
    items: ItemResult[],
  ): Promise<void> {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const processItems = items.map((item) => {
        return {
          quantidade: item.quantidade,
          valorReferencia: item.valorReferencia,
          descricao: item.descricao,
          participacaoCodigo: item.participacao.codigo,
          codigo: item.codigo,
        };
      });
      const processToSave = new Process({
        codigoLicitacao: process.codigoLicitacao,
        identificacao: process.identificacao,
        numero: process.numero,
        resumo: process.resumo,
        codigoSituacaoEdital: process.codigoSituacaoEdital,
        statusCodigo: process.status.codigo,
        dataHoraInicioLances: new Date(process.dataHoraInicioLances),
        itens: processItems,
      });

      await this.processRepository.create(processToSave);
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  checkExtractionExecution(): boolean {
    return this.isExtracting;
  }
}
