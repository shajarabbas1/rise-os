import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import UserSubCategoryService from '../services/user-sub-category.service';
import CreateUserSubCategoryDto from '../dto/create-user-sub-category.dto';

@Controller('user-sub-category')
@ApiTags('User Sub Category Registration')
@ApiBearerAuth()
export default class UserSubCategoryController {
  constructor(
    private readonly userSubCategoryService: UserSubCategoryService,
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'Find user-sub-category by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the user-sub-category details',
  })
  @ApiResponse({
    status: 404,
    description: 'User-sub-category not found',
  })
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const data = await this.userSubCategoryService.findById(id);

    return {
      message: 'User-sub-category details retrieved successfully',
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user-sub-category association' })
  @ApiBody({ type: CreateUserSubCategoryDto })
  @ApiResponse({
    status: 201,
    description:
      'The user-sub-category association has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.',
  })
  async createUserSubCategory(@Body() payload: CreateUserSubCategoryDto) {
    const data =
      await this.userSubCategoryService.createUserSubCategory(payload);

    return {
      message: 'User-sub-category association has been successfully created.',
      statusCode: HttpStatus.CREATED,
      data,
    };
  }

  @Patch(':id/approve')
  @ApiOperation({ summary: 'Approve a user-sub-category association' })
  @ApiResponse({
    status: 200,
    description: 'User-sub-category association successfully approved',
  })
  @ApiResponse({
    status: 404,
    description: 'User-sub-category not found',
  })
  async approveUserSubCategory(@Param('id', new ParseUUIDPipe()) id: string) {
    const data = await this.userSubCategoryService.approveUserSubCategory(id);

    return {
      message: 'User-sub-category association successfully approved',
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a user-sub-category association',
    description:
      'Soft deletes a user-sub-category association by its unique ID. The record is not permanently removed but marked as deleted.',
  })
  @ApiParam({
    name: 'id',
    description:
      'The unique identifier of the user-sub-category association to delete.',
  })
  @ApiResponse({
    status: 200,
    description:
      'The user-sub-category association has been successfully soft deleted.',
  })
  @ApiResponse({
    status: 404,
    description:
      'User-sub-category association not found with the provided ID.',
  })
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const data = await this.userSubCategoryService.delete(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'User-sub-category association has been successfully deleted.',
      data,
    };
  }
}
