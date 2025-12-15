import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { PaginatedResponseDto, PaginationDto } from 'src/dto/pagination.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRespository: Repository<Project>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const newProject = this.projectRespository.create(createProjectDto);
    return await this.projectRespository.save(newProject);
  }

  async findAll() {
    const res = await this.projectRespository.find({
      order: { createdAt: 'DESC' },
    });
    return res;
  }

  async findOne(id: number) {
    return await this.projectRespository.findOne({where:{id}});
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
  async getMemberOfProject(id: number) {
    const project = await this.projectRespository.findOne({
      where: { id },
      relations: ['users'],
    });
    if (!project) throw new NotFoundException('Project not found');
    return project.users;
  }
  async addMemberToProject(id: number, userId: string) {
    const project = await this.projectRespository.findOne({
      where: { id },
      relations: ['users'],
    });

    if (!project) {
      throw new NotFoundException(`Project with the ID ${id} not found`);
    }

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with the ID ${userId} not found`);
    }

    if (project.users.some((u) => u.id === user.id)) {
      throw new NotFoundException('This user is already a member of board');
    } else {
      project.users.push(user);
      await this.projectRespository.save(project);
    }

    return project;
  }
}
