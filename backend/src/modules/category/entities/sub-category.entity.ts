import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import CustomBaseEntity from '../../../common/infra/base-classes/base.entity';
import Category from './category.entity';
import { toLowerCaseTransformer } from 'src/common/utils/helper';

@Entity({ name: 'sub_categories' })
export default class SubCategory extends CustomBaseEntity {
  @Column({
    unique: true,
    transformer: toLowerCaseTransformer,
    nullable: false,
  })
  name: string;

  @Column('text', { nullable: false })
  description: string;

  @Column('text', { nullable: false })
  categoryId: string;

  @ManyToOne(() => Category, category => category.subCategories)
  @JoinColumn()
  category: Category; // Establishes the relationship with the Category entity
}
