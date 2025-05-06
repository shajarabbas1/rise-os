import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
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
import FormResponseService from '../services/form-response.service';
import { CreateFormResponseDto } from '../dto/create-form-response.dto';

@Controller('form-response')
@ApiTags('Form Response')
@ApiBearerAuth()
export default class FormResponseController {
  constructor(private readonly formResponseService: FormResponseService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Find form response by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the form response details',
  })
  @ApiResponse({
    status: 404,
    description: 'Form response not found',
  })
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const data = await this.formResponseService.findById(id);

    return {
      message: 'Form response details retrieved successfully',
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new form response',
    description: 'This endpoint allows the creation of a new form response.',
  })
  @ApiBody({
    type: CreateFormResponseDto,
    description: 'Payload containing the form response.',
  })
  @ApiResponse({
    status: 201,
    description:
      'The form response has been successfully created and stored in the database.',
  })
  @ApiResponse({
    status: 400,
    description:
      'Invalid input data. This may occur if required fields are missing or improperly formatted.',
  })
  async create(@Body() payload: CreateFormResponseDto) {
    const data = await this.formResponseService.create(payload);

    return {
      statusCode: HttpStatus.OK,
      message: 'Form field has been successfully created.',
      data,
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a form response',
    description:
      'Soft deletes a form response by its unique ID. The record is not permanently removed but marked as deleted.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the form response to delete.',
    example: '9c3fd429-0014-480a-b7f4-4ed02a536b21',
  })
  @ApiResponse({
    status: 200,
    description: 'The form response has been successfully soft deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Form response not found with the provided ID.',
  })
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const data = await this.formResponseService.delete(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'Form response has been successfully deleted.',
      data,
    };
  }
}
