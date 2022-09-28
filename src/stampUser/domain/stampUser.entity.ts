import { User } from 'src/auth/domain/user.entity'
import { BaseTimeEntity } from 'src/common/baseTime.entity'
import { Stamp } from 'src/stamp/domain/stamp.entity'
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'tbl_stampUser' })
export class StampUser extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @ManyToOne((type) => User)
  user: User

  @ManyToOne((type) => Stamp)
  stamp: Stamp
}
