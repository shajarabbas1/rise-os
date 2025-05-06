import { PartialType } from '@nestjs/swagger';
import { CreateEmailTemplateDto } from './create-email-template.dto';

export default class UpdateEmailTemplateDto extends PartialType(
  CreateEmailTemplateDto,
) {}
