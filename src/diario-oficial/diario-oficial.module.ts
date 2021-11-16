import { Module } from '@nestjs/common';
import { DiarioOficialController } from './diario-oficial.controller';
import { DiarioOficialService } from './diario-oficial.service';

@Module({
  imports: [],
  controllers: [DiarioOficialController],
  providers: [DiarioOficialService],
})
export class DiarioOficialModule {}
