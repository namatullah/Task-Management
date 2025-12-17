import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from './project.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('project_user')
export class ProjectUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project) => project.projectUsers, {
    onDelete: 'CASCADE',
  })
  project: Project;

  @ManyToOne(() => User, (user) => user.projectUsers, {
    onDelete: 'CASCADE',
  })
  user: User;

  @Column({ default: false })
  isAdmin: boolean;
}
