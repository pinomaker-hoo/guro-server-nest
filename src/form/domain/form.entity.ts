import { ApiProperty } from '@nestjs/swagger'
import { User } from 'src/auth/domain/user.entity'
import { BaseTimeEntity } from 'src/common/baseTime.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'tbl_form' })
export class Form extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @Column()
  @ApiProperty({ description: '이미지 경로' })
  image: string

  @Column()
  @ApiProperty({ description: '전화번호' })
  number: string

  @ManyToOne((type) => User, (user) => user.form)
  user: User
}
