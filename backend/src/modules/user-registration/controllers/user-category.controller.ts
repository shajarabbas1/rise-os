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
import CreateUserCategoryDto from '../dto/create-user-category.dto';
import UserCategoryService from '../services/user-category.service';

@Controller('user-category')
@ApiTags('User Category Registration')
@ApiBearerAuth()
export default class UserCategoryController {
  constructor(private readonly userCategoryService: UserCategoryService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Find user-category by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the user-category details',
  })
  @ApiResponse({
    status: 404,
    description: 'User-category not found',
  })
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const data = await this.userCategoryService.findById(id);

    return {
      message: 'User-category details retrieved successfully',
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user-category association' })
  @ApiBody({ type: CreateUserCategoryDto })
  @ApiResponse({
    status: 201,
    description: 'The user-category association has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.',
  })
  async createUserCategory(@Body() payload: CreateUserCategoryDto) {
    const data = await this.userCategoryService.createUserCategory(payload);

    return {
      message: 'User-category association has been successfully created.',
      statusCode: HttpStatus.CREATED,
      data,
    };
  }

  @Patch(':id/approve')
  @ApiOperation({ summary: 'Approve a user-category association' })
  @ApiResponse({
    status: 200,
    description: 'User-category association successfully approved',
  })
  @ApiResponse({
    status: 404,
    description: 'User-category not found',
  })
  async approveUserCategory(@Param('id', new ParseUUIDPipe()) id: string) {
    const data = await this.userCategoryService.approveUserCategory(id);

    return {
      message: 'User-category association successfully approved',
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a user-category association',
    description:
      'Soft deletes a user-category association by its unique ID. The record is not permanently removed but marked as deleted.',
  })
  @ApiParam({
    name: 'id',
    description:
      'The unique identifier of the user-category association to delete.',
  })
  @ApiResponse({
    status: 200,
    description:
      'The user-category association has been successfully soft deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'User-category association not found with the provided ID.',
  })
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const data = await this.userCategoryService.delete(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'User-category association has been successfully deleted.',
      data,
    };
  }
}
