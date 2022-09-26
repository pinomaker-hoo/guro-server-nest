import { BaseTimeEntity } from 'src/common/baseTime.entity'
import { StampUser } from 'src/stampUser/domain/stampUser.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { StampKind } from '../dto/stamp.kind.dto'

@Entity({ name: 'tbl_stamp' })
export class Stamp extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @Column({ type: 'enum', name: 'stamp_kind', enum: StampKind })
  stampKind: StampKind

  @OneToMany((type) => StampUser, (stampUser) => stampUser.stamp)
  stampUser: StampUser[]
}
