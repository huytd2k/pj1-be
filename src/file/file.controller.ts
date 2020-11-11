import {
  Controller,
  Get,
  Param,

  Res
} from '@nestjs/common';
import {
  Response
} from 'express'
import * as path from 'path';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(
    private readonly fileService : FileService
  ) {}1

  @Get(':id')
  async upload(@Param('id') id, @Res() res: Response) {
    const foundFile = await this.fileService.findById(id);
    res.download(path.join(__dirname, '..', '..', foundFile.serverLink))
  }
}
