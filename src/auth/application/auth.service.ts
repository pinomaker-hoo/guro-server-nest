import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateUserDto } from '../dto/user.create.dto'
import { UserRepository } from '../infrastructure/auth.repository'
import * as bcrypt from 'bcryptjs'
import { User } from '../domain/user.entity'

@Injectable()
export class AuthService {
  constructor(private readonly userRepositoy: UserRepository) {}
  async save(req: CreateUserDto): Promise<User> {
    const hash = await bcrypt.hash(req.password, 10)
    const user = this.userRepositoy.create({
      name: req.name,
      password: hash,
    })
    return await this.userRepositoy.save(user)
  }

  async login(name: string, password: string): Promise<User> {
    try {
      const user = await this.userRepositoy.findOne({ where: { name: name } })
      await this.compareBcrypt(password, user.password)
      return user
    } catch (err) {
      throw new HttpException('EROR ACCOUT', HttpStatus.BAD_REQUEST)
    }
  }

  async compareBcrypt(pw: string, hash: string) {
    const result = await bcrypt.compare(pw, hash)
    if (!result) throw new HttpException('PW ERROR', HttpStatus.BAD_REQUEST)
  }
}
