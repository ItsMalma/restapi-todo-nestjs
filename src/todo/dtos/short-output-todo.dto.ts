import { TodoEntity } from '../todo.entity';

export class ShortOutputTodoDTO {
  id: number;

  nama: string;

  selesai: boolean;

  public constructor(todoEntity: TodoEntity) {
    this.id = todoEntity.id;
    this.nama = todoEntity.nama;
    this.selesai = todoEntity.selesai;
  }
}
