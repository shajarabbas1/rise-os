import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import CustomBaseEntity from 'src/common/infra/base-classes/base.entity';
import { toLowerCaseTransformer } from 'src/common/utils/helper';
import { Form } from './form.entity';
import { FormSection } from './form-section.entity';

@Entity({ name: 'form_fields' })
export class FormField extends CustomBaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    transformer: toLowerCaseTransformer,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    transformer: toLowerCaseTransformer,
  })
  label: string;

  @Column()
  type: string; // e.g., "text", "email", "password"

  @Column({ nullable: true, default: null })
  placeholder: string;

  @Column({ default: false })
  isRequired: boolean;

  @Column({ type: 'jsonb', nullable: true })
  validationRules: Record<string, any>; // Validation rules (e.g. { required: "This field is required" })

  @Column('text', { array: true, nullable: true, default: null })
  options: string[]; // Options for dropdown/radio fields

  @Column({ type: 'int', default: 1 })
  rowNumber: number; // Row number within the section for layout ordering

  @Column({ type: 'int', nullable: true })
  order: number; // Position of the field within the row

  @Column()
  formId: string;

  @ManyToOne(() => Form, form => form.fields)
  @JoinColumn({ name: 'form_id' })
  form: Form;

  @Column({ nullable: true })
  sectionId: string;

  @ManyToOne(() => FormSection, section => section.fields)
  @JoinColumn({ name: 'section_id' })
  section: FormSection;
}
