import CustomBaseEntity from '../../../common/infra/base-classes/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'email_templates' })
export default class EmailTemplate extends CustomBaseEntity {
  @Column({
    type: 'text',
    nullable: false,
    unique: true,
  })
  subject: string;

  // etc acocunt creation, form submission, etc
  @Column({ nullable: true, default: null })
  group?: string;

  // email content
  @Column({
    type: 'text',
    nullable: false,
    unique: true,
  })
  htmlContent: string;

  // description - when and why we're sending this email
  @Column({ nullable: true, default: null })
  metaData?: string;

  // text body - without html or css - some viewers only support text only or in case our html broke
  @Column({
    type: 'text',
    nullable: true,
    default: null,
    unique: true,
  })
  textContent: string;

  // like we have disable / not using this template anymore
  @Column({ type: 'boolean', default: false })
  archived?: boolean;

  // To prevent accidental edits to core templates.
  @Column({ type: 'boolean', default: false })
  isSystemDefault: boolean;
}
