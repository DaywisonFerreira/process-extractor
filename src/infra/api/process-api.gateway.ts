import { ApiGateway } from 'src/data/protocols/api/api-gateway.interface';
import { IItemsResponse } from 'src/data/protocols/api/items-process-response.interface';
import { IProcessResponse } from 'src/data/protocols/api/process-response.interface';
import axios from 'axios';
import axiosRetry from 'axios-retry';

const TEN_SECONDS = 10000;

axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => retryCount * TEN_SECONDS,
});

export class ProcessApiGateway implements ApiGateway {
  async getProcess(
    pageNumber: number,
    startDate: string,
    endDate: string,
  ): Promise<IProcessResponse> {
    const url = `https://compras.api.portaldecompraspublicas.com.br/v2/licitacao/processos?&pagina=${pageNumber}&dataInicial=${startDate}&dataFinal=${endDate}&tipoData=1`;

    const response = await axios
      .get(url)
      .then((res) => res)
      .catch((error) => {
        throw new Error(error.message);
      });
    return response.data;
  }

  async getItemsProcess(
    process: number,
    pageNumber: number,
  ): Promise<IItemsResponse> {
    const url = `https://compras.api.portaldecompraspublicas.com.br/v2/licitacao/${process}/itens?filtro=&pagina=${pageNumber}`;
    const response = await axios
      .get(url)
      .then((res) => res)
      .catch((error) => {
        throw new Error(error.message);
      });
    return response.data;
  }
}
