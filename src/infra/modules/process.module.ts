import { Module } from '@nestjs/common';
import { RunProcessService } from 'src/application/usecases/process/run-process.service';
import { RunProcessCron } from 'src/cron/run-process.cron';
import { ProcessApiGateway } from '../api/process-api.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { ProcessEntity, ProcessSchema } from '../db/schemas/process.entity';
import { MongooseProcessRepository } from '../db/repositories/mongoose-process.repository';
import { NestjsEventEmitter } from '../providers/nestjs-event-emitter';
import { ProcessController } from 'src/presentation/controllers/process.controller';
import { ProcessEvent } from 'src/presentation/events/process.event';
import { GetAllProcessService } from 'src/application/usecases/process/get-all-process.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProcessEntity.name, schema: ProcessSchema },
    ]),
  ],
  providers: [
    RunProcessCron,
    ProcessEvent,
    RunProcessService,
    GetAllProcessService,
    {
      provide: 'ProcessRepository',
      useClass: MongooseProcessRepository,
    },
    {
      provide: 'ProcessApiGateway',
      useClass: ProcessApiGateway,
    },
    {
      provide: 'EventProvider',
      useClass: NestjsEventEmitter,
    },
  ],
  controllers: [ProcessController],
})
export class ProcessModule {}
