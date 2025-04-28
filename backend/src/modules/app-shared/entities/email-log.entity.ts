import CustomBaseEntity from '../../../common/infra/base-classes/base.entity';
import { Column, Entity } from 'typeorm';

export enum EmailTransportEnum {
  NODEMAILER = 'NODEMAILER',
  MAIL_GUN = 'MAIL_GUN',
}

export enum EmailStatusEnum {
  PENDING = 'PENDING',
  SENT = 'SENT',
  FAILED = 'FAILED',
}

@Entity({ name: 'email_logs' })
export default class EmailLog extends CustomBaseEntity {
  @Column({
    type: 'text',
    nullable: false,
  })
  templateId: string; // ID of the email template used (foreign key reference in logic)

  @Column({ nullable: false, type: 'varchar', length: 255 })
  sendToEmail: string; // Recipient's email address

  @Column({ nullable: false, type: 'varchar', length: 255 })
  sendFromEmail: string; // Sender's email address (e.g., support@example.com)

  @Column({ type: 'text', nullable: true })
  cc: string; // Comma-separated list of CC'd recipients (optional)

  @Column({ type: 'varchar', length: 1000, nullable: true })
  bcc: string; // Comma-separated list of BCC'd recipients (optional)

  @Column({
    type: 'enum',
    enum: EmailTransportEnum,
    nullable: false,
    default: EmailTransportEnum.NODEMAILER,
  })
  transportMethod: EmailTransportEnum; // Method or provider used to send the email

  @Column({ type: 'timestamp', nullable: true })
  sentAt: Date; // Timestamp when the email was successfully sent

  @Column({ type: 'timestamp', nullable: true })
  failedAt: Date; // Timestamp when the email failed to send

  @Column({ type: 'text', nullable: true })
  failureReason: string; // Reason why the email failed (e.g., SMTP timeout)

  @Column({
    type: 'enum',
    enum: EmailStatusEnum,
    default: EmailStatusEnum.PENDING,
    nullable: false,
  })
  status: EmailStatusEnum; // Current status of the email
}
