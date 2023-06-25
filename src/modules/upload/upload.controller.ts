import fs from 'fs';
import { Controller, HttpException, HttpStatus, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import dayjs from 'dayjs';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('文件上传')
@Controller('upload')
export class UploadController {
  @ApiOperation({ summary: '文件上传' })
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  uploadFile(
    @UploadedFiles()
    files: Array<Express.Multer.File>,
  ) {
    // 文件大小
    const FILE_MAX = files.find((file: Express.Multer.File) => file.size > 1024 * 1024 * 3);
    if (FILE_MAX) {
      throw new HttpException('上传文件不能超过3M', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    // 文件类型校验
    const FILE_TYPE = files.find(
      (file: Express.Multer.File) =>
        ![
          'image/png',
          'image/jpg',
          'image/jpeg',
          'application/vnd.ms-excel',
          'application/msexcel',
          'application/x-msexcel',
          'application/x-ms-excel',
          'application/x-excel',
          'application/x-dos_ms_excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ].includes(file.mimetype),
    );
    if (FILE_TYPE) {
      throw new HttpException('上传文件类型有误', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // 保存文件
    const list: Array<{ url: string; name: string }> = [];
    files?.forEach((item) => {
      const PATH = `/upload/${dayjs().format('YYYY-MM-DD')}/${Date.now()}.${item.originalname}`;
      list.push({ url: PATH, name: item.originalname });
      fs.writeFileSync(`./public${PATH}`, item.buffer);
    });
    return list;
  }
}
