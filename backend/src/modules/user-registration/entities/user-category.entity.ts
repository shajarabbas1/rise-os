import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import CustomBaseEntity from 'src/common/infra/base-classes/base.entity';
import User from 'src/modules/user/entities/user.entity';
import Category from 'src/modules/category/entities/category.entity';

@Entity({ name: 'user_categories' })
export default class UserCategory extends CustomBaseEntity {
  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'uuid' })
  categoryId: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ default: false })
  isApproved: boolean;
}
