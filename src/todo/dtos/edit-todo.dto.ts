import { IsOptional, IsString, Length, MaxLength } from 'class-validator';
import { TodoEntity } from '../todo.entity';

export class EditTodoDTO {
  @IsOptional()
  @IsString({ message: 'nama harus string' })
  @Length(1, 128, { message: 'nama harus memiliki panjang 1 - 128' })
  nama?: string;

  @IsOptional()
  @IsString({ message: 'deskripsi harus string' })
  @MaxLength(512, { message: 'deskripsi harus memiliki panjang di bawah 512' })
  deskripsi?: string;

  public turnEntity(todo: TodoEntity): TodoEntity {
    if (this.nama !== undefined) todo.nama = this.nama;
    if (this.deskripsi !== undefined) todo.deskripsi = this.deskripsi;
    return todo;
  }
}
