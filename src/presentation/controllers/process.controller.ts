import {
  Controller,
  Get,
  Inject,
  Logger,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RunProcessService } from 'src/application/usecases/process/run-process.service';
import { NestjsEventEmitter } from 'src/infra/providers/nestjs-event-emitter';
import { Response } from 'express';
import { PaginateProcessDto } from '../dtos/paginate-process.dto';
import { FilterPaginateProcessDto } from '../dtos/filter-paginate-process.dto';
import { GetAllProcessService } from 'src/application/usecases/process/get-all-process.service';

@Controller()
@ApiTags('Process')
export class ProcessController {
  private readonly logger = new Logger(ProcessController.name);

  constructor(
    @Inject('EventProvider')
    private readonly eventEmitter: NestjsEventEmitter,
    private runProcessService: RunProcessService,
    private getAllProcessService: GetAllProcessService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos os processos' })
  @ApiResponse({ status: 206, type: PaginateProcessDto, isArray: true })
  @ApiResponse({ status: 204, description: 'No Content' })
  async getAll(
    @Query() filterPaginateDto: FilterPaginateProcessDto,
  ): Promise<PaginateProcessDto> {
    try {
      this.logger.log('Listando os processos');
      const { pageNumber, pageSize } = filterPaginateDto;

      const currentPage = Number(pageNumber) || 0;
      const perPage = Number(pageSize) || 20;

      const [resultQuery, count] = await this.getAllProcessService.execute({
        ...filterPaginateDto,
        pageNumber: currentPage,
        pageSize: perPage,
      });
      return new PaginateProcessDto(resultQuery, count, currentPage, perPage);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @Post('/extract')
  @ApiOperation({ summary: 'Extrair os processos manualmente' })
  async extract(@Res() res: Response): Promise<any> {
    const processIsRunning =
      await this.runProcessService.checkExtractionExecution();
    if (processIsRunning) {
      res.status(400).send(`Já existe uma extração de processo em andamento.`);
    }
    this.eventEmitter.emit('extract.process', null);
    res.status(200).send('A extração dos processos será executada.');
  }
}
