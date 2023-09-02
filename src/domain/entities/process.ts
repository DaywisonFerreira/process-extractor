export type ProcessProperties = {
  codigoLicitacao?: number;
  identificacao?: string;
  numero?: string;
  resumo?: string;
  codigoSituacaoEdital?: number;
  statusCodigo?: number;
  dataHoraInicioLances?: Date;
  itens?: any[];
  createdAt?: Date;
  updatedAt?: Date;
};

export class Process {
  codigoLicitacao: number;
  identificacao: string;
  numero: string;
  resumo: string;
  codigoSituacaoEdital: number;
  statusCodigo: number;
  dataHoraInicioLances: Date;
  itens?: any[];
  createdAt?: Date;
  updatedAt?: Date;

  constructor(input: ProcessProperties) {
    this.codigoLicitacao = input?.codigoLicitacao;
    this.identificacao = input?.identificacao;
    this.numero = input?.numero;
    this.resumo = input?.resumo;
    this.codigoSituacaoEdital = input?.codigoSituacaoEdital;
    this.statusCodigo = input?.statusCodigo;
    this.dataHoraInicioLances = input?.dataHoraInicioLances;
    this.itens = input?.itens;
    this.createdAt = input?.createdAt;
    this.updatedAt = input?.updatedAt;
  }

  toSave() {
    return {
      codigoLicitacao: this.codigoLicitacao,
      identificacao: this.identificacao,
      numero: this.numero,
      resumo: this.resumo,
      codigoSituacaoEdital: this.codigoSituacaoEdital,
      statusCodigo: this.statusCodigo,
      dataHoraInicioLances: this.dataHoraInicioLances,
      itens: this.itens,
    };
  }
}
