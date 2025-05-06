import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter, SendMailOptions } from 'nodemailer';

export interface IEmailPayload {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  attachments?: { filename: string; content?: string | Buffer }[];
}

@Injectable()
export default class NodeMailerService {
  private transporter: Transporter;

  constructor(private configService: ConfigService) {
    // Initialize the transporter with SMTP configuration
    this.transporter = createTransport({
      host: this.configService.getOrThrow<string>('SMTP_HOST'),
      port: this.configService.getOrThrow<number>('SMTP_PORT'),
      secure: true,
      auth: {
        user: this.configService.getOrThrow<string>('SMTP_EMAIL'),
        pass: this.configService.getOrThrow<string>('SMTP_PASSWORD'),
      },
    });
  }

  /**
   * Sends an email with the specified options.
   * @param to Recipient email address or array of addresses.
   * @param text Plain text body of the email.
   * @param subject Subject of the email.
   * @param html HTML body of the email (optional).
   */
  async sendEmail(payload: IEmailPayload) {
    const { to, subject, html, text, attachments } = payload;

    const mailOptions: SendMailOptions = {
      from: this.configService.getOrThrow<string>('SMTP_EMAIL'), // Sender email
      to,
      subject,
      text,
      html,
      attachments: attachments || [],
    };

    return this.transporter
      .sendMail(mailOptions)
      .then(res => {
        return res;
      })
      .catch(err => {
        throw err;
      });
  }

  getTransporter() {
    return this.transporter;
  }
}
