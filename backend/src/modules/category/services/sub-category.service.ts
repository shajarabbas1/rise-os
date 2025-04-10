import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import SubCategory from '../entities/sub-category.entity';
import CreateSubCategoryDto from '../dto/create-sub-category.dto';
import UpdateSubCategoryDto from '../dto/update-sub-category.dto';
import CategoryService from './category.service';
import OffsetPaginationArgs from 'src/common/infra/offset-pagination/offset-pagination.args';
import offsetPaginate from 'src/common/infra/offset-pagination/offset-paginate';
import FilterSubCategoryDto from '../dto/filter-sub-category.dto';

@Injectable()
export default class SubCategoryService {
  constructor(
    @InjectRepository(SubCategory)
    private readonly subCategoryrepository: Repository<SubCategory>,

    private categoryService: CategoryService,
  ) {}

  async findById(id: string, throwException = true): Promise<SubCategory> {
    const data = await this.subCategoryrepository.findOne({ where: { id } });

    if (!data && throwException) {
      throw new NotFoundException('Sub category not found against given Id');
    }

    return data;
  }

  async createSubCategory(payload: CreateSubCategoryDto) {
    const { name } = payload;

    const existingRecord = await this.subCategoryrepository.findOne({
      where: { name: name.toLowerCase() },
    });

    if (existingRecord && existingRecord.deletedAt) {
      await this.subCategoryrepository.delete(existingRecord.id); // Permanently delete the record
    }

    if (existingRecord && !existingRecord.deletedAt) {
      throw new ConflictException('Sub category already exists with this name');
    }

    const newSubCategory = this.subCategoryrepository.create(payload);

    return await this.subCategoryrepository.save(newSubCategory);
  }

  async updateSubCategory(id: string, payload: UpdateSubCategoryDto) {
    const { categoryId } = payload;

    if (categoryId) {
      await this.categoryService.findById(categoryId);
    }

    const updateData = await this.subCategoryrepository.update(id, payload);

    if (updateData.affected === 0) {
      throw new NotFoundException('Sub category not found against given Id');
    }

    return await this.findById(id);
  }

  async deleteSubCategory(id: string): Promise<boolean> {
    await this.findById(id);

    await this.subCategoryrepository.softDelete(id);

    return true;
  }

  async findAll(
    paginationArgs: OffsetPaginationArgs,
    filterSubCategoryInput: FilterSubCategoryDto,
  ) {
    const { name, description, createdAt, updatedAt, ...otherFilters } =
      filterSubCategoryInput;

    // Prepare filterOptions
    const filterOptions: FindManyOptions<SubCategory> = {
      where: {
        deletedAt: null,
        ...(name ? { name: Like(`%${name.toLowerCase()}%`) } : {}),
        ...(description ? { description: Like(`%${description}%`) } : {}),
        ...otherFilters,
      },

      order: { createdAt: 'DESC' },
    };

    const result = await offsetPaginate(
      this.subCategoryrepository,
      paginationArgs,
      filterOptions,
    );

    return result;
  }
}
