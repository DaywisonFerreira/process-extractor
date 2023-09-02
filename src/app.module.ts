import { Module } from '@nestjs/common';
import { ProcessModule } from './infra/modules/process.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { DATABASE_URI } from './commons/environment';

@Module({
  imports: [
    ProcessModule,
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    MongooseModule.forRoot(DATABASE_URI),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
