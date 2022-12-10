import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { TodoService } from 'src/todo/todo.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TodoOwnerGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly todoService: TodoService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user, params } = context.switchToHttp().getRequest();
    const todo = await this.todoService.getTodoById(params.id);
    if (todo.pemilik !== user.id) {
      throw new UnauthorizedException(
        'tidak memiliki akses untuk memodifikasi todo',
      );
    }
    return true;
  }
}
