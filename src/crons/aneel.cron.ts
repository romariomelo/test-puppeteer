import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  @Cron('5 * * * * *')
  static handleCron() {
    console.log('Called when the current second is 45');
  }
}
