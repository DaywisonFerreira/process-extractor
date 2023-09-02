export interface IProcessResponse {
  result: IProcess[];
  offset: number;
  limit: number;
  total: number;
  pageCount: number;
  currentPage: number;
  nextPage: number;
  previousPage: any;
}

export interface IProcess {
  codigoLicitacao: number;
  numeroLicitacao: any;
  identificacao: string;
  numero: string;
  resumo: string;
  razaoSocial: string;
  nomeUnidade: string;
  status: Status;
  situacao: Situacao;
  tipoLicitacao: TipoLicitacao;
  codigoSituacaoEdital: number;
  codigoTratamentoDiferenciado: number;
  dataHoraInicioLances: string;
  dataHoraInicioPropostas: string;
  dataHoraFinalPropostas: string;
  dataHoraFinalLances: any;
  dataHoraPublicacao: string;
  isPublicado: boolean;
  unidadeCompradora: UnidadeCompradora;
  comprador: any;
  urlReferencia: string;
  statusProcessoPublico: StatusProcessoPublico;
  isExclusivoME: boolean;
}

export interface Status {
  codigo: number;
  descricao: string;
}

export interface Situacao {
  codigo: number;
  descricao: any;
}

export interface TipoLicitacao {
  codigoModalidadeLicitacao: number;
  modalidadeLicitacao: string;
  codigoTipoLicitacao: number;
  siglaTipoLicitacao: string;
  tipoLicitacao: string;
  tipoRealizacao: string;
  tipoJulgamento: string;
}

export interface UnidadeCompradora {
  codigoUnidadeCompradora: number;
  nomeUnidadeCompradora: string;
  codigoComprador: number;
  nomeComprador: any;
  cidade: string;
  codigoMunicipioIbge: any;
  uf: string;
}

export interface StatusProcessoPublico {
  codigo: number;
  descricao: string;
}
