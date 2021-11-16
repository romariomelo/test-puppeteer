import axios, { AxiosResponse } from 'axios';
import * as cheerio from 'cheerio';

export class DiarioOficialCrawler {
  urlPrefix = 'https://www.in.gov.br/en/web/dou/-/';

  async getPage(secao = 'do1') {
    const uri = `https://www.in.gov.br/leiturajornal?secao=${encodeURI(secao)}`;
    console.info(`>>> Buscando dados da seção ${secao}`);
    return axios.get(uri);
  }

  getMaterias(pageData: AxiosResponse<any>) {
    const $ = cheerio.load(pageData.data);
    const params = $('#params').html();
    return JSON.parse(params).jsonArray;
  }

  filterByOrgao(materias) {
    const materiaList = [];
    for (const item of materias) {
      if (
        item.hierarchyList.some(
          (org) => org === 'Ministério de Minas e Energia',
        ) &&
        item.hierarchyList.some(
          (org) => org === 'Agência Nacional de Energia Elétrica',
        )
      ) {
        materiaList.push(item);
      }
    }
    return materiaList;
  }

  async getTextMateria(urlTitle: string) {
    const fullUrl = `${this.urlPrefix}${urlTitle}`;
    const response = await axios.get(fullUrl);
    const $ = cheerio.load(response.data);
    return $('.texto-dou').html();
  }
}
