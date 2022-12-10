import { hashSync } from 'bcrypt';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { UserEntity } from '../user.entity';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'nama tidak boleh kosong' })
  @IsString({ message: 'nama harus string' })
  @Length(1, 128, { message: 'nama harus memiliki panjang 1 - 128' })
  nama: string;

  @IsNotEmpty({ message: 'email tidak boleh kosong' })
  @IsString({ message: 'email harus string' })
  @Length(1, 256, { message: 'email harus memiliki panjang 1 - 256' })
  @IsEmail({}, { message: 'email harus valid' })
  email: string;

  @IsNotEmpty({ message: 'password tidak boleh kosong' })
  @IsString({ message: 'password harus string' })
  @MinLength(8, { message: 'password harus memiliki panjang minimal 8' })
  password: string;

  public toEntity(): Partial<UserEntity> {
    return {
      nama: this.nama,
      email: this.email,
      password: hashSync(this.password, 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
