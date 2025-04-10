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
import SubCategoryService from '../services/sub-category.service';
import CreateSubCategoryDto from '../dto/create-sub-category.dto';
import UpdateSubCategoryDto from '../dto/update-sub-category.dto';
import OffsetPaginationArgs from 'src/common/infra/offset-pagination/offset-pagination.args';
import FilterSubCategoryDto from '../dto/filter-sub-category.dto';

@Controller('sub-category')
@ApiTags('Sub Category')
@ApiBearerAuth()
export default class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Get(':subCategoryId')
  @ApiOperation({ summary: 'Find sub category by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the sub category details',
  })
  @ApiResponse({
    status: 404,
    description: 'Sub category not found',
  })
  async findById(
    @Param('subCategoryId', new ParseUUIDPipe()) subCategoryId: string,
  ) {
    const data = await this.subCategoryService.findById(subCategoryId);

    return {
      message: 'Sub category details retrieved successfully',
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @Get()
  @ApiOperation({
    summary: 'Get a paginated list of sub categories with optional filters',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
    description: 'Filter by sub category name',
  })
  @ApiQuery({
    name: 'description',
    required: false,
    type: String,
    description: 'Filter by sub category description',
  })
  @ApiQuery({
    name: 'categoryId',
    required: false,
    type: String,
    description: 'Filter by categoryId',
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
    @Query() filterSubCategoryDto: FilterSubCategoryDto,
  ) {
    const data = await this.subCategoryService.findAll(
      paginationArgs,
      filterSubCategoryDto,
    );

    return {
      message: 'Sub category list fetched successfully',
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new sub category',
    description:
      'This endpoint allows the creation of a new sub category. Each sub category must have a unique name and a description.',
  })
  @ApiBody({
    type: CreateSubCategoryDto,
    description: 'Payload containing the sub category name and description.',
  })
  @ApiResponse({
    status: 201,
    description:
      'The Sub category has been successfully created and stored in the database.',
  })
  @ApiResponse({
    status: 400,
    description:
      'Invalid input data. This may occur if required fields are missing or improperly formatted.',
  })
  async createCategory(@Body() payload: CreateSubCategoryDto) {
    const data = await this.subCategoryService.createSubCategory(payload);

    return {
      statusCode: HttpStatus.OK,
      message: 'Sub category has been successfully created.',
      data,
    };
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update an existing sub category',
    description:
      'Updates the name or description of a sub category by its unique ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the sub category to update.',
  })
  @ApiBody({
    type: UpdateSubCategoryDto,
    description: 'Updated name and/or description of the sub category.',
  })
  @ApiResponse({
    status: 200,
    description: 'The sub category has been successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Sub category not found with the provided ID.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.',
  })
  async updateCategory(
    @Param('id') id: string,
    @Body() payload: UpdateSubCategoryDto,
  ) {
    const data = await this.subCategoryService.updateSubCategory(id, payload);

    return {
      statusCode: HttpStatus.OK,
      message: 'Sub category has been successfully updated.',
      data,
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a sub category',
    description:
      'Soft deletes a sub category by its unique ID. The record is not permanently removed but marked as deleted.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the sub category to delete.',
  })
  @ApiResponse({
    status: 200,
    description: 'The sub category has been successfully soft deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Sub category not found with the provided ID.',
  })
  async deleteSubCategory(@Param('id', new ParseUUIDPipe()) id: string) {
    const data = await this.subCategoryService.deleteSubCategory(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'Sub category has been successfully deleted.',
      data,
    };
  }
}
