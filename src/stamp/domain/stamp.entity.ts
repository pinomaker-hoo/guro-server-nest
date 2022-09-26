import { BaseTimeEntity } from 'src/common/baseTime.entity'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { StampKind } from '../dto/stamp.kind.dto'

@Entity({ name: 'tbl_stamp' })
export class Stamp extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  idx: number

  @Column({ type: 'enum', name: 'stamp_kind', enum: StampKind })
  stampKind: StampKind
}
