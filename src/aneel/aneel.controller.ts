import { Controller, Get, Res } from '@nestjs/common';
import { AneelService } from './aneel.service';
import { Response } from 'express';

@Controller('aneel')
export class AneelController {
  constructor(private readonly aneelService: AneelService) {}

  @Get()
  async getPautas(@Res() response: Response) {
    const ret = await this.aneelService.getPautas();
    if (Array.isArray(ret)) {
      response.contentType('html').send(ret.join(' '));
    } else {
      response.contentType('html').send(ret);
    }
  }
}
