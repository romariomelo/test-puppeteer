import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AneelModule } from './aneel/aneel.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksService } from './crons/aneel.cron';
import { DiarioOficialModule } from './diario-oficial/diario-oficial.module';

@Module({
  imports: [
    AneelModule,
    DiarioOficialModule,
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, TasksService],
})
export class AppModule {}
