import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
} from '@nestjs/common';

import FormFieldService from '../services/form-field.service';

import { CreateFormFieldDto } from '../dto/create-form-field.dto';
import UpdateFormFieldDto from '../dto/update-form-field.dto';

@Controller('form-field')
@ApiTags('Form Field')
@ApiBearerAuth()
export default class FormFieldController {
  constructor(private readonly formFieldService: FormFieldService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Find form field by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the form field details',
  })
  @ApiResponse({
    status: 404,
    description: 'Form field not found',
  })
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const data = await this.formFieldService.findById(id);

    return {
      message: 'Form field details retrieved successfully',
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new form field',
    description:
      'This endpoint allows the creation of a new form field. Each form field must have a unique name.',
  })
  @ApiBody({
    type: CreateFormFieldDto,
    description: 'Payload containing the form field name and description.',
  })
  @ApiResponse({
    status: 201,
    description:
      'The form field has been successfully created and stored in the database.',
  })
  @ApiResponse({
    status: 400,
    description:
      'Invalid input data. This may occur if required fields are missing or improperly formatted.',
  })
  async create(@Body() payload: CreateFormFieldDto) {
    const data = await this.formFieldService.createFormField(payload);

    return {
      statusCode: HttpStatus.OK,
      message: 'Form field has been successfully created.',
      data,
    };
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update an existing form field',
    description:
      'Updates the title or description of a form field by its unique ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the form field to update.',
    example: 'fdde77bb-3c40-4b63-b87a-cbcdc88b7a4e',
  })
  @ApiBody({
    type: UpdateFormFieldDto,
    description: 'Updated name and/or order of the form field.',
  })
  @ApiResponse({
    status: 200,
    description: 'The form field has been successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Form field not found with the provided ID.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.',
  })
  async update(@Param('id') id: string, @Body() payload: UpdateFormFieldDto) {
    const data = await this.formFieldService.updateFormField(id, payload);

    return {
      statusCode: HttpStatus.OK,
      message: 'Form field has been successfully updated.',
      data,
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a form field',
    description:
      'Soft deletes a form field by its unique ID. The record is not permanently removed but marked as deleted.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the form field to delete.',
    example: 'fdde77bb-3c40-4b63-b87a-cbcdc88b7a4e',
  })
  @ApiResponse({
    status: 200,
    description: 'The form field has been successfully soft deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Form field not found with the provided ID.',
  })
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const data = await this.formFieldService.deleteFormField(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'Form field has been successfully deleted.',
      data,
    };
  }
}
