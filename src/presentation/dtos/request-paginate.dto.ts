import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class RequestPaginateDto {
  @ApiPropertyOptional({ type: 'integer', example: 1 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pageNumber?: number;

  @ApiPropertyOptional({ type: 'integer', example: 10 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pageSize?: number;
}
