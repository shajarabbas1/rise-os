import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserCategoryController from './controllers/user-category.controller';
import UserCategory from './entities/user-category.entity';
import UserModule from '../user/user.module';
import CategoryModule from '../category/category.module';
import UserCategoryService from './services/user-category.service';
import UserSubCategory from './entities/user-sub-category.entity';
import UserSubCategoryService from './services/user-sub-category.service';
import UserSubCategoryController from './controllers/user-sub-category.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserCategory, UserSubCategory]),
    UserModule,
    CategoryModule,
  ],

  controllers: [UserCategoryController, UserSubCategoryController],
  providers: [UserCategoryService, UserSubCategoryService],
  exports: [UserCategoryService, UserSubCategoryService],
})
export default class UserRegistrationModule {}
