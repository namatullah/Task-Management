import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from './project.entity';

export enum Status {
  ACTIVE = 'active',
  DONE = 'done',
}
@Entity()
export class Stepper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  index: number;

  @Column({
    nullable: true,
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  @ManyToOne(() => Project, (project) => project.steppers, {
    eager: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'projectId' })
  project: Project;
  @Column({ type: 'int', nullable: true })
  projectId: number;
}
