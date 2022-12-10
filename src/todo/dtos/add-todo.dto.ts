import { IsNotEmpty, IsString, Length, MaxLength } from 'class-validator';
import { TodoEntity } from '../todo.entity';

export class AddTodoDTO {
  @IsNotEmpty({ message: 'nama tidak boleh kosong' })
  @IsString({ message: 'nama harus string' })
  @Length(1, 128, { message: 'nama harus memiliki panjang 1 - 128' })
  nama: string;

  @IsString({ message: 'deskripsi harus string' })
  @MaxLength(512, { message: 'deskripsi harus memiliki panjang di bawah 512' })
  deskripsi: string = '';

  public toEntity(pemilik: number): Partial<TodoEntity> {
    console.log(pemilik);
    return {
      nama: this.nama,
      deskripsi: this.deskripsi,
      selesai: false,
      pemilik,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
