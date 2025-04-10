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

import FormSectionService from '../services/form-section.service';
import CreateFormSectionDto from '../dto/create-form-section.dto';
import UpdateFormSectionDto from '../dto/update-form-section.dto';

@Controller('form-section')
@ApiTags('Form Section')
@ApiBearerAuth()
export default class FormSectionController {
  constructor(private readonly formSectionService: FormSectionService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Find form section by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the form section details',
  })
  @ApiResponse({
    status: 404,
    description: 'Form section not found',
  })
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const data = await this.formSectionService.findById(id);

    return {
      message: 'Form section details retrieved successfully',
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new form section',
    description:
      'This endpoint allows the creation of a new form section. Each form section must have a unique title.',
  })
  @ApiBody({
    type: CreateFormSectionDto,
    description: 'Payload containing the form  section title and description.',
  })
  @ApiResponse({
    status: 201,
    description:
      'The form section has been successfully created and stored in the database.',
  })
  @ApiResponse({
    status: 400,
    description:
      'Invalid input data. This may occur if required fields are missing or improperly formatted.',
  })
  async create(@Body() payload: CreateFormSectionDto) {
    const data = await this.formSectionService.createFormSection(payload);

    return {
      statusCode: HttpStatus.OK,
      message: 'Form section has been successfully created.',
      data,
    };
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update an existing form section',
    description:
      'Updates the title or description of a form section by its unique ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the form section to update.',
    example: '70806342-d123-41c3-9ab6-8a9e67137c87',
  })
  @ApiBody({
    type: UpdateFormSectionDto,
    description: 'Updated title and/or description of the form section.',
  })
  @ApiResponse({
    status: 200,
    description: 'The form section has been successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Form section not found with the provided ID.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.',
  })
  async update(@Param('id') id: string, @Body() payload: UpdateFormSectionDto) {
    const data = await this.formSectionService.updateFormSection(id, payload);

    return {
      statusCode: HttpStatus.OK,
      message: 'Form section has been successfully updated.',
      data,
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a form section',
    description:
      'Soft deletes a form section by its unique ID. The record is not permanently removed but marked as deleted.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the form section to delete.',
    example: '70806342-d123-41c3-9ab6-8a9e67137c87',
  })
  @ApiResponse({
    status: 200,
    description: 'The form section has been successfully soft deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Form section not found with the provided ID.',
  })
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const data = await this.formSectionService.deleteFormSection(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'Form section has been successfully deleted.',
      data,
    };
  }
}
