import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import FormService from '../services/form.service';
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
import CreateFormDto from '../dto/create-form.dto';
import UpdateFormDto from '../dto/update-form.dto';

@Controller('form')
@ApiTags('Form')
@ApiBearerAuth()
export default class FormController {
  constructor(private readonly formService: FormService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Find form by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the form details',
  })
  @ApiResponse({
    status: 404,
    description: 'Form not found',
  })
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    const data = await this.formService.findById(id);

    return {
      message: 'Form details retrieved successfully',
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new form',
    description:
      'This endpoint allows the creation of a new form. Each form must have a unique name.',
  })
  @ApiBody({
    type: CreateFormDto,
    description: 'Payload containing the form name and description.',
  })
  @ApiResponse({
    status: 201,
    description:
      'The form has been successfully created and stored in the database.',
  })
  @ApiResponse({
    status: 400,
    description:
      'Invalid input data. This may occur if required fields are missing or improperly formatted.',
  })
  async create(@Body() payload: CreateFormDto) {
    const data = await this.formService.createForm(payload);

    return {
      statusCode: HttpStatus.OK,
      message: 'Form has been successfully created.',
      data,
    };
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update an existing form',
    description: 'Updates the name or description of a form by its unique ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the form to update.',
    example: '34c86666-afc2-4f71-8363-7da6f123c534',
  })
  @ApiBody({
    type: UpdateFormDto,
    description: 'Updated name and/or description of the form.',
  })
  @ApiResponse({
    status: 200,
    description: 'The form has been successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Form not found with the provided ID.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.',
  })
  async update(@Param('id') id: string, @Body() payload: UpdateFormDto) {
    const data = await this.formService.updateForm(id, payload);

    return {
      statusCode: HttpStatus.OK,
      message: 'Form has been successfully updated.',
      data,
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a form',
    description:
      'Soft deletes a form by its unique ID. The record is not permanently removed but marked as deleted.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the form to delete.',
    example: '34c86666-afc2-4f71-8363-7da6f123c534',
  })
  @ApiResponse({
    status: 200,
    description: 'The form has been successfully soft deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Form not found with the provided ID.',
  })
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const data = await this.formService.deleteForm(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'Form has been successfully deleted.',
      data,
    };
  }
}
