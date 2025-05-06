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
import { FormResponse } from './entities/form-response.entity';
import FormResponseController from './controllers/form-response.controller';
import FormResponseService from './services/form-response.service';
import CategoryModule from '../category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Form, FormSection, FormField, FormResponse]),
    CategoryModule,
  ],

  controllers: [
    FormController,
    FormSectionController,
    FormFieldController,
    FormResponseController,
  ],

  providers: [
    FormService,
    FormSectionService,
    FormFieldService,
    FormResponseService,
  ],
  exports: [
    FormService,
    FormSectionService,
    FormFieldService,
    FormResponseService,
  ],
})
export default class FormModule {}
