import { Request } from 'express'
import { User } from '../domain/user.entity'

export default interface ReqWithUser extends Request {
  user: User
}
