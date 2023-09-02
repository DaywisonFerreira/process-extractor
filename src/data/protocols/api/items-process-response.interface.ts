export interface IItemsResponse {
  isLote: boolean;
  itens: Itens;
  lotes: any;
}

export interface Itens {
  result: ItemResult[];
  offset: number;
  limit: number;
  total: number;
  pageCount: number;
  currentPage: number;
  nextPage: any;
  previousPage: any;
}

export interface ItemResult {
  descricao: string;
  unidade: string;
  quantidade: number;
  melhorLance: any;
  valorReferencia: number;
  exclusivoME: string;
  codigo: number;
  codigoInternoLote: any;
  exibirValorReferencia: any;
  participacao: Participacao;
  situacao: Situacao;
  empate: boolean;
  tipoJulgamento: string;
  isItensPorcentagem: boolean;
}

export interface Participacao {
  codigo: number;
  descricao: string;
}

export interface Situacao {
  codigo: number;
  descricao: string;
}
