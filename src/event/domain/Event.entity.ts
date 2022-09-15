import { User } from 'src/auth/domain/user.entity'
import { BaseTimeEntity } from 'src/common/baseTime.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'tbl_event' })
export class Event extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @Column()
  imgPath: string

  @Column()
  number: string

  @ManyToOne((type) => User, (user) => user.event)
  user: User
}
