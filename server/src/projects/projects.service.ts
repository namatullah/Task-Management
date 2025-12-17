import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { ProjectUser } from './entities/project_user.entity';
import { CreateProjectUserDto } from './dto/project_user/create-projectUser.dto';
import { UpdateProjectUserDto } from './dto/project_user/update-projectUser.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRespository: Repository<Project>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(ProjectUser)
    private readonly projectUserRepository: Repository<ProjectUser>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const newProject = this.projectRespository.create(createProjectDto);
    return await this.projectRespository.save(newProject);
  }

  async findAll() {
    const res = await this.projectRespository.find({
      order: { createdAt: 'DESC' },
      relations: { projectUsers: true },
    });
    return res;
  }

  async findOne(id: number) {
    return await this.projectRespository.findOne({ where: { id } });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRespository.findOne({ where: { id } });
    if (!project) throw new NotFoundException('Project not found');
    project.status = updateProjectDto.status;
    return await this.projectRespository.save(project);
  }

  remove(id: number) {}

  async getMemberOfProject(id: number) {
    const project = await this.projectRespository.findOne({
      where: { id: id },
      relations: {
        projectUsers: {
          user: true,
          project: true,
        },
      },
    });
    if (!project) throw new NotFoundException('Project not found');
    return project.projectUsers;
  }

  async addMemberToProject(
    id: number,
    createProjectUserDto: CreateProjectUserDto,
  ) {
    const project = await this.projectRespository.findOne({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException(`Project with the ID ${id} not found`);
    }

    const user = await this.userRepository.findOne({
      where: { id: createProjectUserDto.userId },
    });

    if (!user) {
      throw new NotFoundException(
        `User with the ID ${createProjectUserDto.userId} not found`,
      );
    }

    const exists = await this.projectUserRepository.findOne({
      where: {
        project: { id: id },
        user: { id: createProjectUserDto.userId },
      },
    });
    if (exists) {
      throw new BadRequestException('this user already is in the project');
    }

    const projectUser = this.projectUserRepository.create({
      project,
      user,
      isAdmin: createProjectUserDto.isAdmin,
    });

    await this.projectUserRepository.save(projectUser);

    return projectUser;
  }
  async removeMember(memberId: number) {
    const member = await this.projectUserRepository.findOne({
      where: { id: memberId },
    });
    if (!member) throw new NotFoundException('Member in the project not found');

    return await this.projectUserRepository.remove(member);
  }

  async updateMember(id: number, updateProjectUserDto: UpdateProjectUserDto) {
    const projectUser = await this.projectUserRepository.findOne({
      where: { id: id },
    });
    if (!projectUser) {
      throw new NotFoundException('The member is not found in board');
    }
    projectUser.isAdmin = updateProjectUserDto.isAdmin;
    return await this.projectUserRepository.save(projectUser);
  }
}
