import { Task } from 'src/tasks/entities/task.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProjectUser } from './project_user.entity';
import { Stepper } from './stepper.entity';

export enum ProjectStatus {
  PLANNED = 'planned',
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  ON_HOLD = 'on_hold',
  REVIEW = 'review',
  TESTING = 'testing',
  IN_READY = 'in_ready',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}
@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.NOT_STARTED,
  })
  status: ProjectStatus;

  @OneToMany(() => ProjectUser, (pu) => pu.project)
  projectUsers: ProjectUser[];

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];

  @OneToMany(() => Stepper, (stepper) => stepper.project)
  steppers: Stepper[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
