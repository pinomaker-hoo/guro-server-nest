import {
  Bind,
  Controller,
  HttpStatus,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
import { multerDiskOptions } from 'src/util/multerOption'
import { FormService } from '../application/form.service'

@Controller('form')
export class FormController {
  userService: any
  constructor(private readonly formService: FormService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files', null, multerDiskOptions))
  @Bind(UploadedFiles())
  uploadFileDisk(files: File[], @Res() res: Response) {
    console.log(files)
    // res.status(HttpStatus.OK).json({
    //   success: true,
    //   data: this.userService.uploadFileDisk(files),
    // });
  }
}
