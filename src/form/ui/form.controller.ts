import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { JwtGuard } from 'src/auth/passport/auth.jwt.guard'
import { ApiResponse } from 'src/common/response'
import { multerDiskOptions } from 'src/util/multerOption'
import { FormService } from '../application/form.service'
import { Form } from '../domain/form.entity'

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post()
  @UseGuards(JwtGuard)
  @UseInterceptors(FilesInterceptor('files', null, multerDiskOptions))
  async saveForm(@UploadedFiles() files, @Body() body, @Req() req) {
    const { path } = files[0]
    const { number } = body
    const { user } = req
    const form: Form = await this.formService.saveForm(user, path, number)
    return ApiResponse.of({
      data: form,
      message: 'success find all most likes workbooks',
      statusCode: 200,
    })
  }
}
