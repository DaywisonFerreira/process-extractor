import { Process } from 'src/domain/entities/process';
import { FilterPaginateProcessDto } from 'src/presentation/dtos/filter-paginate-process.dto';

export interface IProcessRepository {
  create(process: Process): Promise<void>;
  getAll(filter: FilterPaginateProcessDto): Promise<[Process[], number]>;
  remove(processes: number[]): Promise<void>;
}
