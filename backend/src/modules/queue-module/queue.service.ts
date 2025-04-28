import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { QUEUE_NAMES } from 'src/constant';
import { IEmailPayload } from '../app-shared/services/nodemailer.service';

@Injectable()
export default class QueueService {
  constructor(@InjectQueue(QUEUE_NAMES.MAIL) private mailQueue: Queue) {}

  async queueEmail(payload: IEmailPayload) {
    await this.mailQueue.add('send-email', payload);
  }

  // Future: Add queueSMS(), queuePushNotification(), etc.
}
