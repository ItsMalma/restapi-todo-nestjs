import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { AddTodoDTO } from './dtos/add-todo.dto';
import { EditTodoDTO } from './dtos/edit-todo.dto';
import { OutputTodoDTO } from './dtos/output-todo.dto';
import { ShortOutputTodoDTO } from './dtos/short-output-todo.dto';
import { TodoEntity } from './todo.entity';

@Injectable()
export class TodoService {
  public constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  public async addTodo(
    addTodoDTO: AddTodoDTO,
    userId: number,
  ): Promise<OutputTodoDTO> {
    return new OutputTodoDTO(
      await this.todoRepository.save(addTodoDTO.toEntity(userId)),
    );
  }

  public async getAllTodo(): Promise<ShortOutputTodoDTO[]> {
    return (await this.todoRepository.find()).map(
      (todo) => new ShortOutputTodoDTO(todo),
    );
  }

  public async getAllTodoFromUser(
    userId: number,
  ): Promise<ShortOutputTodoDTO[]> {
    return (await this.todoRepository.find({ where: { pemilik: userId } })).map(
      (todo) => new ShortOutputTodoDTO(todo),
    );
  }

  public async getTodoById(id: number): Promise<OutputTodoDTO> {
    try {
      return new OutputTodoDTO(
        await this.todoRepository.findOneOrFail({ where: { id } }),
      );
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundException(`todo with id ${id} not exists`);
      }
    }
  }

  public async editTodoById(
    id: number,
    editTodoDTO: EditTodoDTO,
  ): Promise<OutputTodoDTO> {
    try {
      return new OutputTodoDTO(
        await this.todoRepository.save(
          editTodoDTO.turnEntity(
            await this.todoRepository.findOneOrFail({ where: { id } }),
          ),
        ),
      );
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundException(`todo with id ${id} not exists`);
      }
    }
  }

  public async selesaikanTodoById(id: number): Promise<OutputTodoDTO> {
    try {
      const todo = await this.todoRepository.findOneOrFail({ where: { id } });
      todo.selesai = true;
      return new OutputTodoDTO(await this.todoRepository.save(todo));
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundException(`todo with id ${id} not exists`);
      }
    }
  }

  public async deleteTodoById(id: number): Promise<OutputTodoDTO> {
    try {
      return new OutputTodoDTO(
        await this.todoRepository.softRemove(
          await this.todoRepository.findOneOrFail({ where: { id } }),
        ),
      );
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundException(`todo with id ${id} not exists`);
      }
    }
  }
}
