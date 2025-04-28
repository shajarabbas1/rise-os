import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { QUEUE_NAMES } from 'src/constant';
import NodeMailerService, {
  IEmailPayload,
} from 'src/modules/app-shared/services/nodemailer.service';

@Processor(QUEUE_NAMES.MAIL)
export default class MailProcessor {
  constructor(private readonly nodeMailerService: NodeMailerService) {}

  @Process('send-email')
  async handleSendEmail(job: Job<IEmailPayload>) {
    const { to, subject, html } = job.data;

    await this.nodeMailerService.sendEmail(job.data);

    console.log(`📨 Sending email to: ${to}`);
    console.log(`📌 Subject: ${subject}`);
    console.log(`🧾 HTML content:\n${html}`);

    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(`✅ Email sent to: ${to}`);
  }
}
