import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import OffsetPaginationArgs from 'src/common/infra/offset-pagination/offset-pagination.args';
import UserService from './user.service';
import FilterUserDto from './dto/filter-user.dto';
import UpdateUserDto from './dto/update-user.dto';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  @ApiOperation({ summary: 'Find user by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the user details',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async findById(@Param('userId', new ParseUUIDPipe()) userId: string) {
    const data = await this.userService.findById(userId);

    return {
      message: 'User details retrieved successfully',
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @Get()
  @ApiOperation({
    summary: 'Get a paginated list of users  with optional filters',
  })
  @ApiQuery({
    name: 'email',
    required: false,
    type: String,
    description: 'Filter by user email',
  })
  @ApiQuery({
    name: 'fullName',
    required: false,
    type: String,
    description: 'Filter by user full name',
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
    @Query() filterUserDto: FilterUserDto,
  ) {
    const data = await this.userService.findAll(paginationArgs, filterUserDto);

    return {
      message: 'Users fetched successfully',
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user by its ID' })
  @ApiParam({
    name: 'id',
    description: 'Enter the Id of user to Update',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'user details updated successful.',
  })
  async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const data = await this.userService.update(id, updateUserDto);

    return {
      message: 'user data updated successfully',
      statusCode: 200,
      data,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', description: 'ID of the user to delete' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  async delete(@Param('id') id: string): Promise<any> {
    const data = await this.userService.delete(id);

    return {
      message: 'The user has been successfully deleted.',
      statusCode: HttpStatus.OK,
      data,
    };
  }
}
