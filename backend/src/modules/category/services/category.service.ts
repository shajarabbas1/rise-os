import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import Category from '../entities/category.entity';
import CreateCategoryDto from '../dto/create-category.dto';
import UpdateCategoryDto from '../dto/update-category.dto';
import OffsetPaginationArgs from 'src/common/infra/offset-pagination/offset-pagination.args';
import offsetPaginate from 'src/common/infra/offset-pagination/offset-paginate';
import FilterCategoryDto from '../dto/filter-category.dto';

@Injectable()
export default class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryrepository: Repository<Category>,
  ) {}

  async findById(id: string, throwException = true): Promise<Category> {
    const data = await this.categoryrepository.findOne({ where: { id } });

    if (!data && throwException) {
      throw new NotFoundException('Category not found against given Id');
    }

    return data;
  }

  async createCategory(payload: CreateCategoryDto) {
    const { name } = payload;

    const existingRecord = await this.categoryrepository.findOne({
      where: { name: name.toLowerCase() },
    });

    if (existingRecord && existingRecord.deletedAt) {
      await this.categoryrepository.delete(existingRecord.id); // Permanently delete the record
    }

    if (existingRecord && !existingRecord.deletedAt) {
      throw new ConflictException('Category already exists with this name');
    }

    const newCategory = this.categoryrepository.create(payload);

    return await this.categoryrepository.save(newCategory);
  }

  async updateCategory(id: string, payload: UpdateCategoryDto) {
    const updateData = await this.categoryrepository.update(id, payload);

    if (updateData.affected === 0) {
      throw new NotFoundException('Category not found against given Id');
    }

    return await this.findById(id);
  }

  async deleteCategory(id: string): Promise<boolean> {
    await this.findById(id);

    await this.categoryrepository.softDelete(id);

    return true;
  }

  async saveCategory(category: Category) {
    return await this.categoryrepository.save(category);
  }

  async findAll(
    paginationArgs: OffsetPaginationArgs,
    filterCategoryInput: FilterCategoryDto,
  ) {
    const { name, description, tags, createdAt, updatedAt, ...otherFilters } =
      filterCategoryInput;

    // Prepare filterOptions
    const filterOptions: FindManyOptions<Category> = {
      where: {
        deletedAt: null,
        ...(name ? { name: Like(`%${name.toLowerCase()}%`) } : {}),
        ...(description ? { description: Like(`%${description}%`) } : {}),
        ...otherFilters,
      },

      order: { createdAt: 'DESC' },
    };

    const result = await offsetPaginate(
      this.categoryrepository,
      paginationArgs,
      filterOptions,
    );

    return result;
  }
}
