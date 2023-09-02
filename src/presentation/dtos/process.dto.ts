import { ApiProperty } from '@nestjs/swagger';

class ItensDto {
  @ApiProperty({ example: 10 })
  quantidade: number;

  @ApiProperty({ example: 20.0 })
  valorReferencia: number;

  @ApiProperty({ example: 'Cabo elétrico PP 3x6mm' })
  descricao: string;

  @ApiProperty({ example: 4 })
  participacaoCodigo: number;

  @ApiProperty({ example: 1 })
  codigo: number;
}

export class ProcessDataDto {
  @ApiProperty({ example: 253716 })
  codigoLicitacao: number;

  @ApiProperty({ example: 1 })
  codigoSituacaoEdital: number;

  @ApiProperty({ example: '2023-09-04T11:00:00Z' })
  dataHoraInicioLances: Date;

  @ApiProperty({ type: ItensDto, required: false })
  itens?: ItensDto[];

  @ApiProperty({ example: '84/2023' })
  numero: string;

  @ApiProperty({ example: 'Registro de preços para futura e eventual...' })
  resumo: string;

  @ApiProperty({ example: 1 })
  statusCodigo: number;

  @ApiProperty({ example: '2023-10-01T22:15:08.355Z' })
  createdAt?: Date;

  @ApiProperty({ example: '2023-10-01T22:15:08.355Z' })
  updatedAt?: Date;
}
