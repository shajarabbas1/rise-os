import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserCategory from '../entities/user-category.entity';
import UserService from '../../../modules/user/user.service';
import CategoryService from '../../../modules/category/services/category.service';
import CreateUserCategoryDto from '../dto/create-user-category.dto';

@Injectable()
export default class UserCategoryService {
  constructor(
    @InjectRepository(UserCategory)
    private readonly userCategoryRepository: Repository<UserCategory>,

    private userService: UserService,
    private categoryService: CategoryService,
  ) {}

  async findById(id: string, throwException = true): Promise<UserCategory> {
    const userCategory = await this.userCategoryRepository.findOne({
      where: { id },
      relations: ['user', 'category'],
    });

    if (!userCategory && throwException) {
      throw new NotFoundException('User-category not found against given Id');
    }

    return userCategory;
  }

  async createUserCategory(payload: CreateUserCategoryDto) {
    const { categoryId, userId } = payload;

    // Use Promise.all to run both validations concurrently
    await Promise.all([
      this.userService.findById(userId),
      this.categoryService.findById(categoryId),
    ]);

    // Check if the user is already associated with this category
    const existingAssociation = await this.userCategoryRepository.findOne({
      where: { userId, categoryId },
    });

    if (existingAssociation) {
      throw new BadRequestException(
        'User is already associated with this category',
      );
    }

    const newCategory = this.userCategoryRepository.create(payload);

    return await this.userCategoryRepository.save(newCategory);
  }

  async approveUserCategory(id: string) {
    const userCategory = await this.findById(id);

    userCategory.isApproved = true;

    return await this.userCategoryRepository.save(userCategory);
  }

  async delete(id: string): Promise<boolean> {
    await this.findById(id);

    await this.userCategoryRepository.softDelete(id);

    return true;
  }
}
