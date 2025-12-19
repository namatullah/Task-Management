import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class Stepper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  step: string;

  @Column({ nullable: true })
  index: number;

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
