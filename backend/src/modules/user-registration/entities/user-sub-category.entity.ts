import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import CustomBaseEntity from 'src/common/infra/base-classes/base.entity';
import User from 'src/modules/user/entities/user.entity';
import SubCategory from 'src/modules/category/entities/sub-category.entity';

@Entity({ name: 'user_sub_categories' })
export default class UserSubCategory extends CustomBaseEntity {
  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'uuid' })
  subCategoryId: string;

  @ManyToOne(() => SubCategory)
  @JoinColumn({ name: 'sub_category_id' })
  subCategory: SubCategory;

  @Column({ default: false })
  isApproved: boolean;
}
