import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import CustomBaseEntity from '../../../common/infra/base-classes/base.entity';
import { Form } from './form.entity';
import { FormField } from './form-field.entity';
import { toLowerCaseTransformer } from '../../../common/utils/helper';

@Entity({ name: 'form_sections' })
export class FormSection extends CustomBaseEntity {
  @Column({
    type: 'text',
    unique: true,
    transformer: toLowerCaseTransformer,
    nullable: false,
  })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', default: 0 })
  order: number; // To define the sequence of sections

  @Column()
  formId: string;

  @ManyToOne(() => Form, form => form.sections)
  @JoinColumn({ name: 'form_id' })
  form: Form;

  @OneToMany(() => FormField, field => field.section, { eager: true })
  fields: FormField[];
}
