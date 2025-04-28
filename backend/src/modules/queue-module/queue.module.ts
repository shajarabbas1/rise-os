import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import MailProcessor from './processors/mail.processor';
import QueueService from './queue.service';
import { QUEUE_NAMES } from 'src/constant';
import { AppSharedModule } from '../app-shared/app-shared.module';

@Module({
  imports: [
    BullModule.registerQueue(
      { name: QUEUE_NAMES.MAIL },
      { name: QUEUE_NAMES.SMS },
      { name: QUEUE_NAMES.NOTIFICATION },
    ),
    AppSharedModule,
  ],
  providers: [QueueService, MailProcessor],
  exports: [QueueService],
})
export default class QueueModule {}
