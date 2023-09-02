import { ApiProperty } from '@nestjs/swagger';

export class Pagination {
  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  totalElements: number;

  @ApiProperty()
  pageNumber: number;

  @ApiProperty()
  pageSize: number;
}

export class Meta {
  @ApiProperty({ type: Pagination })
  pagination: Pagination;
}
export abstract class PaginatedResults<T> {
  data: T[];

  @ApiProperty({ type: Meta })
  meta: Meta;

  constructor(data: T[], totalItems: number, page: number, pageSize: number) {
    this.data = data;
    this.meta = this.createMetadata(totalItems, pageSize, page);
  }

  createMetadata(totalItems: number, pageSize: number, page: number) {
    return {
      pagination: {
        totalPages: Math.ceil(totalItems / pageSize),
        totalElements: totalItems,
        pageNumber: page,
        pageSize: pageSize,
      },
    };
  }
}
