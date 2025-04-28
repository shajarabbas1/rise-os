import {
  Body,
  Controller,
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
import UploadedFileService from './uploaded-file.service';
import { CreateUploadedFileDto } from './dto/create-uploaded-file.dto';
import { UploadedFile } from './entities/uploaded-file.entity';

@Controller('uploaded-file')
@ApiTags('Uploaded File')
@ApiBearerAuth()
export default class UploadedFileController {
  constructor(private readonly uploadedFileService: UploadedFileService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new uploaded file',
    description: 'This endpoint allows the creation of a new uploaded file.',
  })
  @ApiBody({
    type: CreateUploadedFileDto,
    description: 'Payload containing the uploaded file details.',
  })
  @ApiResponse({
    status: 201,
    description:
      'The uploaded file has been successfully created and stored in the database.',
  })
  @ApiResponse({
    status: 400,
    description:
      'Invalid input data. This may occur if required fields are missing or improperly formatted.',
  })
  async create(@Body() payload: CreateUploadedFileDto) {
    const data = await this.uploadedFileService.create(payload);

    return {
      statusCode: HttpStatus.OK,
      message: 'Uploaded file has been successfully created.',
      data,
    };
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all uploaded files by user ID' })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'ID of the user whose uploaded files are to be fetched',
    example: 'c716d3b2-e1e2-400f-9f2b-75c9d6d1e519',
  })
  @ApiResponse({
    status: 200,
    description: 'List of uploaded files',
    type: [UploadedFile],
  })
  @ApiResponse({
    status: 404,
    description: 'No uploaded files found for the user',
  })
  async findByUserId(@Param('userId', new ParseUUIDPipe()) userId: string) {
    const data = await this.uploadedFileService.findByUserId(userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'Uploaded file has been successfully created.',
      data,
    };
  }
}
