import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as formData from 'form-data';
import Mailgun from 'mailgun.js';

@Injectable()
export default class MailGunService {
  private mailgunClient: any;

  constructor(private configService: ConfigService) {
    const mailgun = new Mailgun(formData);

    this.mailgunClient = mailgun.client({
      username: 'api',
      key: this.configService.getOrThrow<string>('MAILGUN_API_KEY'),
    });
  }

  async sendEmail(to: string, subject: string, text: string, html?: string) {
    try {
      const DOMAIN = this.configService.get<string>('MAILGUN_DOMAIN');

      const messageData = {
        from: `Mailgun Sandbox <postmaster@sandbox4e2aaaf623d4482ea9e0cedf41c2b59c.mailgun.org>`,
        to,
        subject,
        text,
        ...(html && { html }), // Include HTML content if provided
      };

      const response = await this.mailgunClient.messages.create(
        DOMAIN,
        messageData,
      );

      return response;
    } catch (error) {
      console.error('Mailgun Error:', error);
      throw new Error('Failed to send email');
    }
  }
}
