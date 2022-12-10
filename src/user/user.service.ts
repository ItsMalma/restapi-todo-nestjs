import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseError } from 'pg';
import { ShortOutputTodoDTO } from 'src/todo/dtos/short-output-todo.dto';
import { TodoService } from 'src/todo/todo.service';
import { EntityNotFoundError, QueryFailedError, Repository } from 'typeorm';
import { CreateUserDTO } from './dtos/create-user.dto';
import { DetailOutputUserDTO } from './dtos/detail-output-user.dto';
import { OutputUserDTO } from './dtos/output-user.dto';
import { ShortOutputUserDTO } from './dtos/short-output-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly todoService: TodoService,
  ) {}

  public async createUser(
    createUserDTO: CreateUserDTO,
  ): Promise<DetailOutputUserDTO> {
    try {
      return new DetailOutputUserDTO(
        await this.userRepository.save(createUserDTO.toEntity()),
      );
    } catch (err) {
      if (err instanceof QueryFailedError) {
        const driverErr = err.driverError as DatabaseError;
        switch (driverErr.code) {
          case '23505':
            throw new ConflictException(
              `user with email ${createUserDTO.email} already exists`,
            );
        }
      }
    }
  }

  public async getAllUser(): Promise<ShortOutputUserDTO[]> {
    return (await this.userRepository.find()).map(
      (user) => new ShortOutputUserDTO(user),
    );
  }

  public async getUserById(id: number): Promise<OutputUserDTO> {
    try {
      return new OutputUserDTO(
        await this.userRepository.findOneOrFail({ where: { id } }),
      );
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundException(`user with id ${id} not exists`);
      }
    }
  }

  public async getUserByEmail(email: string): Promise<OutputUserDTO> {
    try {
      return new OutputUserDTO(
        await this.userRepository.findOneOrFail({ where: { email } }),
      );
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundException(`user with email ${email} not exists`);
      }
    }
  }

  public async getAllTodoById(id: number): Promise<ShortOutputTodoDTO[]> {
    return await this.todoService.getAllTodoFromUser(id);
  }

  public async updateUserById(
    id: number,
    updateUserDTO: UpdateUserDTO,
  ): Promise<OutputUserDTO> {
    try {
      return new OutputUserDTO(
        await this.userRepository.save(
          updateUserDTO.turnEntity(
            await this.userRepository.findOneOrFail({ where: { id } }),
          ),
        ),
      );
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundException(`user with id ${id} not exists`);
      }
    }
  }

  public async updateUserByEmail(
    email: string,
    updateUserDTO: UpdateUserDTO,
  ): Promise<OutputUserDTO> {
    try {
      return new OutputUserDTO(
        await this.userRepository.save(
          updateUserDTO.turnEntity(
            await this.userRepository.findOneOrFail({ where: { email } }),
          ),
        ),
      );
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundException(`user with email ${email} not exists`);
      }
    }
  }

  public async deleteUserById(id: number): Promise<OutputUserDTO> {
    try {
      return new OutputUserDTO(
        await this.userRepository.softRemove(
          await this.userRepository.findOneOrFail({ where: { id } }),
        ),
      );
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundException(`user with id ${id} not exists`);
      }
    }
  }

  public async deleteUserByEmail(email: string): Promise<OutputUserDTO> {
    try {
      return new OutputUserDTO(
        await this.userRepository.softRemove(
          await this.userRepository.findOneOrFail({ where: { email } }),
        ),
      );
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundException(`user with email ${email} not exists`);
      }
    }
  }
}
