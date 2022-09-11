import { ApiProperty } from '@nestjs/swagger'
import { BaseTimeEntity } from 'src/common/baseTime.entity'
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity({ name: 'tbl_user' })
@Unique(['naverId'])
export class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'user_idx' })
  idx: number

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({ description: 'user_name' })
  name: string

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({ description: 'user_number' })
  nummber: string

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({ description: 'user_naverId' })
  naverId: string
}
