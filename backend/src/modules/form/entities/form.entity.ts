import { Entity, Column, OneToMany } from 'typeorm';
import CustomBaseEntity from 'src/common/infra/base-classes/base.entity';
import { FormField } from './form-field.entity';
import { FormSection } from './form-section.entity';

@Entity({ name: 'forms' })
export class Form extends CustomBaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name: string;

  @Column({ nullable: true, default: '' })
  description: string;

  @OneToMany(() => FormField, field => field.form, {})
  fields: FormField[];

  @OneToMany(() => FormSection, section => section.form, {
    cascade: true,
    eager: true,
  })
  sections: FormSection[];
}
