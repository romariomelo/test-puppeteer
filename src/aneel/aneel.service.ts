import { Injectable } from '@nestjs/common';
import { MailerService } from 'src/mailer/mailer.service';
import { AneelCrawler } from './AneelCrawler';

@Injectable()
export class AneelService {
  constructor(private readonly mailerService: MailerService) {}
  async getPautas(): Promise<string> {
    const aneelCrawler = new AneelCrawler();
    const links = await aneelCrawler.getLinks();
    const materias = await aneelCrawler.getMateria(links);

    // this.mailerService.sendMail(
    //   Array.isArray(materias) ? materias.join(' ') : materias,
    // );
    return Array.isArray(materias) ? materias.join(' ') : materias;
  }
}
