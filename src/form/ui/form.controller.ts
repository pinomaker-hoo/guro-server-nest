import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { JwtGuard } from 'src/auth/passport/auth.jwt.guard'
import { multerDiskOptions } from 'src/util/multerOption'
import { FormService } from '../application/form.service'

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
    console.log(path, number, user)
    return await this.formService.saveForm(user, path, number)
  }
}
