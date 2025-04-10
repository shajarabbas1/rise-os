import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import CategoryService from '../services/category.service';
import CreateCategoryDto from '../dto/create-category.dto';
import UpdateCategoryDto from '../dto/update-category.dto';
import FilterCategoryDto from '../dto/filter-category.dto';
import OffsetPaginationArgs from 'src/common/infra/offset-pagination/offset-pagination.args';

@Controller('category')
@ApiTags('Category')
@ApiBearerAuth()
export default class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':categoryId')
  @ApiOperation({ summary: 'Find category by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the category details',
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found',
  })
  async findById(@Param('categoryId', new ParseUUIDPipe()) categoryId: string) {
    const data = await this.categoryService.findById(categoryId);

    return {
      message: 'Category details retrieved successfully',
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @Get()
  @ApiOperation({
    summary: 'Get a paginated list of categories with optional filters',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
    description: 'Filter by category name',
  })
  @ApiQuery({
    name: 'description',
    required: false,
    type: String,
    description: 'Filter by category description',
  })
  @ApiQuery({
    name: 'createdFrom',
    required: false,
    type: String,
    description: 'Filter by creation date range',
  })
  @ApiQuery({
    name: 'createdTo',
    required: false,
    type: String,
    description: 'Filter by creation date range',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of results to return',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Number of results to skip',
  })
  async findAll(
    @Query() paginationArgs: OffsetPaginationArgs,
    @Query() filterCategoryDto: FilterCategoryDto,
  ) {
    const data = await this.categoryService.findAll(
      paginationArgs,
      filterCategoryDto,
    );

    return {
      message: 'Category list fetched successfully',
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new category',
    description:
      'This endpoint allows the creation of a new service category. Each category must have a unique name and a description.',
  })
  @ApiBody({
    type: CreateCategoryDto,
    description: 'Payload containing the category name and description.',
  })
  @ApiResponse({
    status: 201,
    description:
      'The category has been successfully created and stored in the database.',
  })
  @ApiResponse({
    status: 400,
    description:
      'Invalid input data. This may occur if required fields are missing or improperly formatted.',
  })
  async createCategory(@Body() payload: CreateCategoryDto) {
    const data = await this.categoryService.createCategory(payload);

    return {
      statusCode: HttpStatus.OK,
      message: 'Category has been successfully created.',
      data,
    };
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update an existing category',
    description:
      'Updates the name or description of a category by its unique ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the category to update.',
  })
  @ApiBody({
    type: UpdateCategoryDto,
    description: 'Updated name and/or description of the category.',
  })
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found with the provided ID.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.',
  })
  async updateCategory(
    @Param('id') id: string,
    @Body() payload: UpdateCategoryDto,
  ) {
    const data = await this.categoryService.updateCategory(id, payload);

    return {
      statusCode: HttpStatus.OK,
      message: 'Category has been successfully updated.',
      data,
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a category',
    description:
      'Soft deletes a category by its unique ID. The record is not permanently removed but marked as deleted.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the category to delete.',
  })
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully soft deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found with the provided ID.',
  })
  async deleteCategory(@Param('id', new ParseUUIDPipe()) id: string) {
    const data = await this.categoryService.deleteCategory(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'Category has been successfully deleted.',
      data,
    };
  }
}
