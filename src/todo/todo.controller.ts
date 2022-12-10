import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/shared/guards/jwt.guard';
import { TodoOwnerGuard } from 'src/shared/guards/todo-owner.guard';
import { Payload } from 'src/shared/payload';
import { AddTodoDTO } from './dtos/add-todo.dto';
import { EditTodoDTO } from './dtos/edit-todo.dto';
import { TodoService } from './todo.service';

@Controller({ path: 'todos' })
export class TodoController {
  public constructor(private readonly todoService: TodoService) {}

  @UseGuards(JwtGuard)
  @Post()
  async add(@Req() req: any, @Body() addTodoDTO: AddTodoDTO) {
    return new Payload(
      HttpStatus.CREATED,
      await this.todoService.addTodo(addTodoDTO, req.user.id),
    );
  }

  @UseGuards(JwtGuard)
  @Get()
  async getAll(@Req() req: any) {
    return new Payload(
      HttpStatus.OK,
      await this.todoService.getAllTodoFromUser(req.user.id),
    );
  }

  @UseGuards(JwtGuard, TodoOwnerGuard)
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return new Payload(HttpStatus.OK, await this.todoService.getTodoById(id));
  }

  @UseGuards(JwtGuard, TodoOwnerGuard)
  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() editTodoDTO: EditTodoDTO,
  ) {
    return new Payload(
      HttpStatus.OK,
      await this.todoService.editTodoById(id, editTodoDTO),
    );
  }

  @UseGuards(JwtGuard, TodoOwnerGuard)
  @Patch(':id/selesai')
  async selesaikanById(@Param('id', ParseIntPipe) id: number) {
    return new Payload(
      HttpStatus.OK,
      await this.todoService.selesaikanTodoById(id),
    );
  }

  @UseGuards(JwtGuard, TodoOwnerGuard)
  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return new Payload(
      HttpStatus.OK,
      await this.todoService.deleteTodoById(id),
    );
  }
}
