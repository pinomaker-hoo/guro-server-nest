import { User } from 'src/auth/domain/user.entity'
import { BaseTimeEntity } from 'src/common/baseTime.entity'
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'tbl_form' })
export class Form extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @Column()
  imgPath: string

  @Column()
  number: string

  @OneToOne((type) => User, (user) => user.form)
  user: User
}
