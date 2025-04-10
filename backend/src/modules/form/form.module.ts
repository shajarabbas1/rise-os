import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';
import { FormSection } from './entities/form-section.entity';
import { FormField } from './entities/form-field.entity';
import FormService from './services/form.service';
import FormController from './controllers/form.controller';
import FormSectionController from './controllers/form-section.controller';
import FormSectionService from './services/form-section.service';
import FormFieldService from './services/form-field.service';
import FormFieldController from './controllers/form-field.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Form, FormSection, FormField])],
  controllers: [FormController, FormSectionController, FormFieldController],
  providers: [FormService, FormSectionService, FormFieldService],
  exports: [FormService, FormSectionService, FormFieldService],
})
export default class FormModule {}
