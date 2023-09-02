import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PaginatedResults } from './paginated-results.dto';
import { ProcessDataDto } from './process.dto';

export class PaginateProcessDto extends PaginatedResults<ProcessDataDto> {
  @ApiProperty({ type: () => [ProcessDataDto] })
  @Type(() => ProcessDataDto)
  data: ProcessDataDto[];

  constructor(
    data: ProcessDataDto[],
    count: number,
    page: number,
    pageSize: number,
  ) {
    super(data, count, page, pageSize);
  }
}
