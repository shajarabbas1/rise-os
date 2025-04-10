import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export default abstract class CustomBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** time entity was created */
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  /** time entity was updated */
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;

  @Column({ type: 'uuid', nullable: true, select: false })
  createdById: string;

  @Column({ type: 'uuid', nullable: true, select: false })
  updatedById: string;
}
