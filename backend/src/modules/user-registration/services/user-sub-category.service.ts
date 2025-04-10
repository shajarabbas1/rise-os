import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserService from 'src/modules/user/user.service';

import UserSubCategory from '../entities/user-sub-category.entity';
import CreateUserSubCategoryDto from '../dto/create-user-sub-category.dto';
import SubCategoryService from 'src/modules/category/services/sub-category.service';

@Injectable()
export default class UserSubCategoryService {
  constructor(
    @InjectRepository(UserSubCategory)
    private readonly userSubCategoryRepository: Repository<UserSubCategory>,

    private userService: UserService,
    private subCategoryService: SubCategoryService,
  ) {}

  async findById(id: string, throwException = true): Promise<UserSubCategory> {
    const data = await this.userSubCategoryRepository.findOne({
      where: { id },
      relations: ['user', 'subCategory'],
    });

    if (!data && throwException) {
      throw new NotFoundException(
        'User-sub-category not found against given Id',
      );
    }

    return data;
  }

  async createUserSubCategory(payload: CreateUserSubCategoryDto) {
    const { subCategoryId, userId } = payload;

    // Use Promise.all to run both validations concurrently
    await Promise.all([
      this.userService.findById(userId),
      this.subCategoryService.findById(subCategoryId),
    ]);

    // Check if the user is already associated with this category
    const existingAssociation = await this.userSubCategoryRepository.findOne({
      where: { userId, subCategoryId },
    });

    if (existingAssociation) {
      throw new BadRequestException(
        'User is already associated with this category',
      );
    }

    const newSubCategory = this.userSubCategoryRepository.create(payload);

    return await this.userSubCategoryRepository.save(newSubCategory);
  }

  async approveUserSubCategory(id: string) {
    const userCategory = await this.findById(id);

    userCategory.isApproved = true;

    return await this.userSubCategoryRepository.save(userCategory);
  }

  async delete(id: string): Promise<boolean> {
    await this.findById(id);

    await this.userSubCategoryRepository.softDelete(id);

    return true;
  }
}
