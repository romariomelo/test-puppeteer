import { Module } from '@nestjs/common';
import { MailerModule } from 'src/mailer/mailer.module';
import { AneelController } from './aneel.controller';
import { AneelService } from './aneel.service';

@Module({
  imports: [MailerModule],
  controllers: [AneelController],
  providers: [AneelService],
  exports: [],
})
export class AneelModule {}
