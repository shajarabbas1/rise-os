import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import CustomBaseEntity from '../../../common/infra/base-classes/base.entity';
import { FormField } from './form-field.entity';
import { FormSection } from './form-section.entity';
import Category from '../../../modules/category/entities/category.entity';

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

  @Column({ nullable: true, default: null })
  categoryId: string;

  @ManyToOne(() => Category, category => category.categoryForms, {
    nullable: true,
  })
  @JoinColumn()
  category: Category;

  @OneToMany(() => FormField, field => field.form, {})
  fields: FormField[];

  @OneToMany(() => FormSection, section => section.form, {
    cascade: true,
    eager: true,
  })
  sections: FormSection[];
}
