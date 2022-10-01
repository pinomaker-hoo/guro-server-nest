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
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from 'src/auth/passport/auth.jwt.guard'
import { ApiResponse } from 'src/common/response'
import { multerDiskOptions } from 'src/util/multerOption'
import { FormService } from '../application/form.service'
import { Form } from '../domain/form.entity'

@Controller('form')
@ApiTags('Form API')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: 'Form 생성 API',
    description: '이미지 파일과 전화번호를 Form Data로 받는다.',
  })
  @ApiCreatedResponse({ description: '폼을 생성한다.', type: Form })
  @UseInterceptors(FilesInterceptor('files', null, multerDiskOptions))
  async saveForm(@UploadedFiles() files, @Body() body, @Req() req) {
    const { path } = files[0]
    const { number } = body
    const { user } = req
    // console.log(path, number, user)
    const form: Form = await this.formService.saveForm(user, path, number)
    return ApiResponse.of({
      data: form,
      message: 'success find all most likes workbooks',
      statusCode: 200,
    })
  }
}
