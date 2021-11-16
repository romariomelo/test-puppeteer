import axios from 'axios';
import * as querystring from 'querystring';
import * as cheerio from 'cheerio';
import { highlightsKeywords } from 'src/utils/highlights-keywords';

export class AneelCrawler {
  constructor(mes?: number, ano?: number) {
    this.mes = mes;
    this.ano = ano;
  }
  ano;
  mes;
  url =
    'https://www2.aneel.gov.br/aplicacoes_liferay/noticias_area/dsp_listarNoticias.cfm?idAreaNoticia=425&c=0&idarea=425';

  async getLinks(): Promise<string[]> {
    const links: string[] = [];
    const data = querystring.stringify({
      mesPesq: this.mes ? this.mes : 11,
      anoPesq: this.ano ? this.ano : 2021,
    });
    console.info(`>>> Obtendo pautas de ${this.url}`);
    const api = await axios.post(this.url, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const $ = cheerio.load(api.data);
    const linksCheerio = $('.lista-noticias>a');
    for (const link of linksCheerio) {
      links.push($(link).attr('href'));
    }
    return links;
  }

  async getMateria(links: string | string[]): Promise<string | string[]> {
    if (Array.isArray(links)) {
      const materias: string[] = [];
      for (const link of links) {
        materias.push(await this.getOneMateria(link));
      }
      return materias;
    } else {
      return this.getOneMateria(links);
    }
  }

  private async getOneMateria(href: string): Promise<string> {
    console.info(`>>> Obtendo página ${href}`);
    const res = await axios.get(href);
    const $$ = cheerio.load(res.data);
    return highlightsKeywords($$('#cntImprimirDIR').html());
  }
}
