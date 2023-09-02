import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RunProcessService } from 'src/application/usecases/process/run-process.service';

@Injectable()
export class RunProcessCron {
  private readonly logger = new Logger(RunProcessCron.name);
  constructor(private readonly runProcessService: RunProcessService) {}

  @Cron('0 0,6,12,18 * * *')
  async executeProcess(): Promise<void> {
    this.logger.log(
      'Iniciando a execução automática da extração de processos - ',
      new Date(),
    );
    await this.runProcessService.execute();
  }
}
