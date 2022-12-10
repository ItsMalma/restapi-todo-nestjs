import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/shared/guards/jwt.guard';
import { Payload } from 'src/shared/payload';
import { DetailOutputUserDTO } from './dtos/detail-output-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UserService } from './user.service';

@Controller({
  path: 'users',
})
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@Req() req: any) {
    return new Payload(HttpStatus.OK, new DetailOutputUserDTO(req.user));
  }

  @Get(':id')
  async getById(@Param(':id', ParseIntPipe) id: number) {
    return new Payload(HttpStatus.OK, await this.userService.getUserById(id));
  }

  @UseGuards(JwtGuard)
  @Get('me/todos')
  async getAllMyTodo(@Req() req: any) {
    return new Payload(
      HttpStatus.OK,
      await this.userService.getAllTodoById(req.user.id),
    );
  }

  @Get(':id/todos')
  async getAllUserTodo(@Param(':id', ParseIntPipe) id: number) {
    return new Payload(
      HttpStatus.OK,
      await this.userService.getAllTodoById(id),
    );
  }

  @UseGuards(JwtGuard)
  @Patch('me')
  async updateMe(@Req() req: any, @Body() updateUserDTO: UpdateUserDTO) {
    return new Payload(
      HttpStatus.OK,
      await this.userService.updateUserById(req.user.id, updateUserDTO),
    );
  }

  @UseGuards(JwtGuard)
  @Delete('me')
  async deleteMe(@Req() req: any) {
    return new Payload(
      HttpStatus.OK,
      await this.userService.deleteUserById(req.user.id),
    );
  }
}
