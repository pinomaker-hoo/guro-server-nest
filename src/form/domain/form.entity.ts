import { User } from 'src/auth/domain/user.entity'
import { BaseTimeEntity } from 'src/common/baseTime.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'tbl_form' })
export class Form extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @Column()
  image: string

  @Column()
  number: string

  @ManyToOne((type) => User, (user) => user.form)
  user: User
}
