import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { RequestPaginateDto } from './request-paginate.dto';

export class FilterPaginateProcessDto extends RequestPaginateDto {
  @ApiPropertyOptional({
    type: String,
    required: false,
    example: '2023-09-01',
  })
  @Type(() => String)
  @IsOptional()
  dataHoraInicioLances?: string;

  @ApiPropertyOptional({
    type: String,
    required: false,
    example: '84/2023',
  })
  @Type(() => String)
  @IsOptional()
  numero?: string;

  @ApiPropertyOptional({
    type: String,
    required: false,
    example: 'Registro de preços',
  })
  @Type(() => String)
  @IsOptional()
  resumo?: string;

  @ApiPropertyOptional({
    type: String,
    required: false,
    example: 'Cabo elétrico PP 3x6mm',
  })
  @Type(() => String)
  @IsOptional()
  descricaoItem?: string;
}
