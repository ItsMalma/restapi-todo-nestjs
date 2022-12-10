import { TodoEntity } from '../todo.entity';

export class OutputTodoDTO {
  id: number;

  nama: string;

  deskripsi: string;

  selesai: boolean;

  pemilik: number;

  createdAt: Date;

  updatedAt: Date;

  public constructor(todoEntity: TodoEntity) {
    this.id = todoEntity.id;
    this.nama = todoEntity.nama;
    this.deskripsi = todoEntity.deskripsi;
    this.selesai = todoEntity.selesai;
    this.pemilik = todoEntity.pemilik;
    this.createdAt = todoEntity.createdAt;
    this.updatedAt = todoEntity.updatedAt;
  }
}
