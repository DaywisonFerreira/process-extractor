import { ProcessEntity } from '../schemas/process.entity';
import { Process } from 'src/domain/entities/process';

export class MongooseProcessMapper {
  static toDomainEntity(processData: ProcessEntity): Process {
    return new Process(processData);
  }
}
