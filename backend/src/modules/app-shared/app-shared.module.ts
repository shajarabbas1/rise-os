import { Module } from '@nestjs/common';
import EmailTemplateController from './controller/email-template.controller';
import EmailTemplateService from './services/email-template.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import EmailTemplate from './entities/email-template.entity';
import EmailLog from './entities/email-log.entity';
import NodeMailerService from './services/nodemailer.service';
import HandlebarService from './services/handlebar.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmailTemplate, EmailLog])],

  providers: [
    
    EmailTemplateService,
    NodeMailerService,
    HandlebarService,
  ],
  exports: [
    
    NodeMailerService,
    EmailTemplateService,
    HandlebarService,
  ],
  controllers: [EmailTemplateController],
})
export class AppSharedModule {}
