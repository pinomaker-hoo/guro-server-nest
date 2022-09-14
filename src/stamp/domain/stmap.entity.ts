import { ApiProperty } from '@nestjs/swagger'
import { User } from '../../auth/domain/user.entity'
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'

@Entity({ name: 'tbl_stamp' })
@Unique(['user'])
export class Stamp extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'stamp_idx' })
  idx: number

  @Column()
  @ApiProperty({ description: 'stamp_one' })
  stampOne: boolean

  @Column()
  @ApiProperty({ description: 'stamp_two' })
  stampTwo: boolean

  @Column()
  @ApiProperty({ description: 'stamp_three' })
  stampThree: boolean

  @Column()
  @ApiProperty({ description: 'stamp_four' })
  stampFour: boolean

  @Column()
  @ApiProperty({ description: 'stamp_five' })
  stampFive: boolean

  @Column()
  @ApiProperty({ description: 'stamp_six' })
  stampSix: boolean

  @ManyToOne((type) => User, (user) => user.stamp)
  user: User
}
