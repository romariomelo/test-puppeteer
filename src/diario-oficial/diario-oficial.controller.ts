import { Controller, Get } from '@nestjs/common';
import { DiarioOficialService } from './diario-oficial.service';

@Controller('diario-oficial')
export class DiarioOficialController {
  constructor(private readonly diarioOficialService: DiarioOficialService) {}
  @Get()
  async getDiario() {
    const materias = await this.diarioOficialService.getDiario();
    return materias.join('-------------------------------');
  }
}
