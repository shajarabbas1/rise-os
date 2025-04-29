import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
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
import EmailTemplateService from '../services/email-template.service';
import { CreateEmailTemplateDto } from '../dto/create-email-template.dto';
import FilterEmailTemplateDto from '../dto/filter-email-template.dto';
import OffsetPaginationArgs from 'src/common/infra/offset-pagination/offset-pagination.args';

@Controller('email-template')
@ApiTags('Email Template')
@ApiBearerAuth()
export default class EmailTemplateController {
  constructor(private readonly emailTemplateService: EmailTemplateService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Find email template by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the email template to find.',
    example: '52e04009-fb84-4786-84f9-f88d3d3fe59b',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the email template details',
  })
  @ApiResponse({
    status: 404,
    description: 'Email template not found',
  })
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const data = await this.emailTemplateService.findById(id);

    return {
      message: 'Email template details retrieved successfully',
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new email template',
    description:
      'This endpoint allows the creation of a new email template. Each email template must have a unique subject.',
  })
  @ApiBody({
    type: CreateEmailTemplateDto,
    description: 'Payload containing the email template details.',
  })
  @ApiResponse({
    status: 201,
    description:
      'The email template has been successfully created and stored in the database.',
  })
  @ApiResponse({
    status: 400,
    description:
      'Invalid input data. This may occur if required fields are missing or improperly formatted.',
  })
  async create(@Body() payload: CreateEmailTemplateDto) {
    const data = await this.emailTemplateService.create(payload);

    return {
      statusCode: HttpStatus.OK,
      message: 'Email template has been successfully created.',
      data,
    };
  }

  @Get()
  @ApiOperation({
    summary: 'Get a paginated list of email templates with optional filters',
  })
  @ApiQuery({
    name: 'subject',
    required: false,
    type: String,
    description: 'Filter by email template subject',
  })
  @ApiQuery({
    name: 'group',
    required: false,
    type: String,
    description: 'Filter by email template group',
  })
  @ApiQuery({
    name: 'archived',
    required: false,
    type: Boolean,
    description: 'Filter by email template archived key',
  })
  @ApiQuery({
    name: 'isSystemDefault',
    required: false,
    type: Boolean,
    description: 'Filter by email template isSystemDefault key',
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
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number to start from',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Number of results to skip',
  })
  async findAll(
    @Query() paginationArgs: OffsetPaginationArgs,
    @Query() filterEmailTemplateDto: FilterEmailTemplateDto,
  ) {
    const data = await this.emailTemplateService.findAll(
      paginationArgs,
      filterEmailTemplateDto,
    );

    return {
      message: 'Email template list fetched successfully',
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a email template',
    description:
      'Soft deletes a email template by its unique ID. The record is not permanently removed but marked as deleted.',
  })
  @ApiParam({
    name: 'id',
    example: '52e04009-fb84-4786-84f9-f88d3d3fe59b',
    description: 'The unique identifier of the email template to delete.',
  })
  @ApiResponse({
    status: 200,
    description: 'The email template has been successfully soft deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Email template not found with the provided ID.',
  })
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const data = await this.emailTemplateService.delete(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'Email template has been successfully deleted.',
      data,
    };
  }
}
