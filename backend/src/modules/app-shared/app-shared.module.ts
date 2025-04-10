import { Module } from '@nestjs/common';
import MailGunService from './services/mail-gun.service';

@Module({
  providers: [MailGunService],
  exports: [MailGunService],
})
export class AppSharedModule {}
