import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Category from './entities/category.entity';
import SubCategory from './entities/sub-category.entity';

import SubCategoryService from './services/sub-category.service';
import CategoryService from './services/category.service';

import SubCategoryController from './controllers/sub-category.controller';
import CategoryController from './controllers/category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Category, SubCategory])],
  controllers: [CategoryController, SubCategoryController],
  providers: [SubCategoryService, CategoryService],
  exports: [SubCategoryService, CategoryService],
})
export default class CategoryModule {}
