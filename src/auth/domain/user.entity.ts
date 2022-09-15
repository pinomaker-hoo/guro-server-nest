import { ApiProperty } from '@nestjs/swagger'
import { BaseTimeEntity } from 'src/common/baseTime.entity'
import { Stamp } from '../../stamp/domain/stmap.entity'
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'
import { Form } from 'src/form/domainn/form.entity'

@Entity({ name: 'tbl_user' })
@Unique(['kakaoId', 'email'])
export class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'user_idx' })
  idx: number

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({ description: 'user_name' })
  name: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiProperty({ description: 'user_number' })
  number: string

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({ description: 'user_kakaoId' })
  kakaoId: string

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({ description: 'user_email' })
  email: string

  @OneToMany((type) => Stamp, (stamp) => stamp.user)
  stamp: Stamp[]

  @OneToOne((type) => Form, (form) => form.user)
  form: Form
}
