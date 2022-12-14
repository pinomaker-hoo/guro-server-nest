import { ApiProperty } from '@nestjs/swagger'
import { BaseTimeEntity } from 'src/common/baseTime.entity'
import { StampUser } from 'src/stamp-user/domain/stampUser.entity'
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'

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

  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiProperty({ description: 'user_email' })
  email: string

  @OneToMany((type) => StampUser, (stampUser) => stampUser.user)
  stampUser: StampUser[]
}
