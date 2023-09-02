import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RunProcessService } from 'src/application/usecases/process/run-process.service';

@Injectable()
export class RunProcessCron {
  constructor(private readonly runProcessService: RunProcessService) {}

  @Cron('0 0,6,12,18 * * *')
  async executeProcess(): Promise<void> {
    await this.runProcessService.execute();
  }
}
