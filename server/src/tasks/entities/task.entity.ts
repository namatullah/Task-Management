import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUUM = 'medium',
  HIGH = 'high',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'timestamp', nullable: true })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING })
  status: TaskStatus;

  @Column({ type: 'enum', enum: TaskPriority, default: TaskPriority.MEDIUUM })
  priority: TaskPriority;

  @Column({ type: 'float', default: 0 })
  progress: number;

  @Column({ default: false })
  isArchived: boolean;

  @ManyToOne(() => User, (user) => user.tasks, {
    eager: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'userId' })
  user: User;
  @Column({ type: 'uuid', nullable: true })
  userId: string;

  @ManyToOne(() => Project, (project) => project.tasks, {
    eager: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'projectId' })
  project: Project;
  @Column({ type: 'int', nullable: true })
  projectId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
