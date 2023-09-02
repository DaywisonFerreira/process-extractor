import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { RunProcessService } from 'src/application/usecases/process/run-process.service';

@Injectable()
export class ProcessEvent {
  constructor(private runProcessService: RunProcessService) {}

  @OnEvent('extract.process', { async: true })
  async process(): Promise<void> {
    await this.runProcessService.execute();
  }
}
