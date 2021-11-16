import { Get, Injectable } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import * as puppeteer from 'puppeteer';

interface IJsonArray {
  artType: string;
  urlTitle: string;
  numberPage: string;
  pubOrder: string;
  hierarchyStr: string;
  hierarchyList: string[];
  title: string;
  content: string;
  hierarchyLevelSize: number;
}

@Injectable()
export class AppService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}
  async getHello() {
    // let links: string[] = [];
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    try {
      const orgao = encodeURI('Ministério de Minas e Energia');
      const subOrgao = encodeURI('Agência Nacional de Energia Elétrica');
      const secao = encodeURI('do1');
      const uri = `https://www.in.gov.br/leiturajornal?org=${orgao}&org_sub=${subOrgao}&secao=${secao}`;
      // const uri = 'https://www.in.gov.br/leiturajornal';
      await page.goto(uri);

      const params = JSON.parse(
        await page.$eval<string>('#params', (el) => el.innerHTML),
      );

      const jsonArray: IJsonArray[] = params.jsonArray;

      let countMinasEEnergia = 0;
      for (const item of jsonArray) {
        if (
          item.hierarchyList.some(
            (org) => org === 'Ministério de Minas e Energia',
          ) &&
          item.hierarchyList.some(
            (org) => org === 'Agência Nacional de Energia Elétrica',
          )
        ) {
          console.log(item.title);
          countMinasEEnergia++;
          await page.waitForTimeout(10000);
          await page.goto(
            `https://www.in.gov.br/en/web/dou/-/${item.urlTitle}`,
          );
          const texts = await page.$$eval(
            'div.texto-dou',
            (el: HTMLDivElement[]) => {
              return el.map((e) => e.innerText);
            },
          );
          console.log(texts);
        }
      }
      console.log(countMinasEEnergia);

      // let button: puppeteer.ElementHandle<Element>;

      // let countPage: number = 0;
      // do {
      //   links = [...links, ...(await this.getLinksByPage(page))];

      //   button = await page.$(
      //     'span.pagination-button.page-num.active + span.pagination-button.page-num'
      //   );

      //   if (button) {
      //     await button.click();
      //   }
      //   countPage++;
      // } while (button);

      // console.log('Pages:', countPage);
      // console.log(links);
    } catch (err) {
      console.error(err);
    } finally {
      await page.close();
      await browser.close();
    }
  }

  // @Cron('* * * * * *', {
  //   name: 'testCron',
  // })
  // handleCron() {
  //   console.log('Called when the current second is 1');
  // }

  @Get()
  schedule() {
    // d2178859-05aa-4d95-8726-909cbd63278f
    this.schedulerRegistry.getCronJobs().forEach((value, key) => {
      console.log(key);
      console.log(this.schedulerRegistry.doesExists('cron', key));
      this.schedulerRegistry.deleteCronJob(key);
    });
  }
}
