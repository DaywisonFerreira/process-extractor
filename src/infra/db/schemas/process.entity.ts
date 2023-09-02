import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
class ProcessItems {
  @Prop({ type: Number, required: true })
  quantidade: number;

  @Prop({ type: Number, required: true })
  valorReferencia: number;

  @Prop({ type: String, required: true })
  descricao: string;

  @Prop({ type: Number, required: true })
  participacaoCodigo: number;

  @Prop({ type: Number, required: true })
  codigo: number;
}

const ProcessItemsSchema = SchemaFactory.createForClass(ProcessItems);

@Schema({ collection: 'processes', timestamps: true })
export class ProcessEntity extends Document {
  @Prop({ type: Number, required: true })
  codigoLicitacao: number;

  @Prop({ type: String, required: true })
  identificacao: string;

  @Prop({ type: String, required: true })
  numero: string;

  @Prop({ type: String, required: true })
  resumo: string;

  @Prop({ type: Number, required: true })
  codigoSituacaoEdital: number;

  @Prop({ type: Number, required: true })
  statusCodigo: number;

  @Prop({ type: Date, required: true })
  dataHoraInicioLances: Date;

  @Prop({ type: [ProcessItemsSchema], required: true })
  itens: ProcessItems[];
}

export type ProcessDocument = ProcessEntity & Document;
export const ProcessSchema = SchemaFactory.createForClass(ProcessEntity);
ProcessSchema.index({ codigoLicitacao: 1 }, { unique: true });
ProcessSchema.index({ numero: 1 });
ProcessSchema.index({ dataHoraInicioLances: 1 });
ProcessSchema.index({ resumo: 'text' });
ProcessSchema.index({ 'itens.descricao': 'text' });
