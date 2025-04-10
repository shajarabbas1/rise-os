import { Entity, Column, OneToMany } from 'typeorm';
import CustomBaseEntity from '../../../common/infra/base-classes/base.entity';
import SubCategory from './sub-category.entity';
import { toLowerCaseTransformer } from 'src/common/utils/helper';

@Entity({ name: 'categories' })
export default class Category extends CustomBaseEntity {
  @Column({
    unique: true,
    transformer: toLowerCaseTransformer,
    nullable: false,
  })
  name: string;

  @Column('text', { nullable: true, default: null })
  description: string;

  @OneToMany(() => SubCategory, subCategory => subCategory.category)
  subCategories: SubCategory[]; // Relationship with SubCategory entity
}
