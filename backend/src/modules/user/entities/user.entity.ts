import { Entity, Column, OneToMany } from 'typeorm';
import CustomBaseEntity from '../../../common/infra/base-classes/base.entity';
import { toLowerCaseTransformer } from '../../../common/utils/helper';
import UserCategory from '../../../modules/user-registration/entities/user-category.entity';
import UserSubCategory from '../../../modules/user-registration/entities/user-sub-category.entity';

export enum UserRoleEnum {
  SUPER_ADMIN = 'SUPER_ADMIN',
  USER = 'USER',
  AUDITOR = 'AUDITOR',
}

@Entity({ name: 'users' })
export default class User extends CustomBaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    default: null,
    transformer: toLowerCaseTransformer,
  })
  fullName: string;

  @Column({
    unique: true,
    type: 'varchar',
    length: 255,
    nullable: true,
    default: null,
    transformer: toLowerCaseTransformer,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    default: null,
    select: false,
  })
  password: string;

  @Column({ default: false, nullable: false })
  isRegistrationComplete: boolean;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    nullable: false,
    default: UserRoleEnum.USER,
  })
  role: UserRoleEnum;

  // on signup send this otpcode on email for email verification
  @Column({ type: 'text', default: null, select: false })
  emailOTP: string;

  @Column({ default: false, nullable: false })
  emailVerified: boolean;

  // on forgot password send this JWT token with frontend url on email for password reset
  @Column({ type: 'text', default: null })
  forgetPasswordToken: string;

  // ✅ relationship for user and category regstration
  @OneToMany(() => UserCategory, userCategory => userCategory.user)
  userCategories: UserCategory[];

  // ✅ relationship for user and sub-category regstration
  @OneToMany(() => UserSubCategory, userCategory => userCategory.user)
  userSubCategories: UserSubCategory[];
}
