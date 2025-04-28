import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import CustomBaseEntity from '../../../common/infra/base-classes/base.entity';
import { Form } from './form.entity';
import User from '../../../modules/user/entities/user.entity';

@Entity({ name: 'form_responses' })
export class FormResponse extends CustomBaseEntity {
  @Column()
  formId: string;

  @ManyToOne(() => Form, form => form.fields)
  @JoinColumn({ name: 'form_id' })
  form: Form;

  @Column('uuid')
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('jsonb')
  response: Record<string, any>;
}
