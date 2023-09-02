import { IItemsResponse } from './items-process-response.interface';
import { IProcessResponse } from './process-response.interface';

export interface ApiGateway {
  getProcess(
    pageNumber: number,
    startDate: string,
    endDate: string,
  ): Promise<IProcessResponse>;
  getItemsProcess(process: number, pageNumber: number): Promise<IItemsResponse>;
}
