import { HttpException, HttpStatus } from '@nestjs/common'
import { existsSync, mkdirSync } from 'fs'
import { diskStorage, memoryStorage } from 'multer'
import { extname } from 'path'
import getRandomNumber from 'src/config/number'

export const multerDiskOptions = {
  fileFilter: (request, file, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      console.log(1)
      callback(null, true)
    } else {
      callback(
        new HttpException(
          {
            message: 1,
            error: '지원하지 않는 이미지 형식입니다.',
          },
          HttpStatus.BAD_REQUEST,
        ),
        false,
      )
    }
  },
  storage: diskStorage({
    destination: (request, file, callback) => {
      const uploadPath = 'src/source/img'
      if (!existsSync(uploadPath)) mkdirSync(uploadPath)
      callback(null, uploadPath)
    },
    filename: (request, file, callback) => {
      callback(null, `${Date.now()}${extname(file.originalname)}`)
    },
  }),
  limits: {
    fieldNameSize: 200,
    filedSize: 1024 * 1024,
    fields: 2,
    fileSize: 16777216,
    files: 10,
  },
}
