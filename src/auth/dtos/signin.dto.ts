import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class SigninDTO {
  @IsNotEmpty({ message: 'email tidak boleh kosong' })
  @IsString({ message: 'email harus string' })
  @Length(1, 256, { message: 'email harus memiliki panjang 1 - 256' })
  @IsEmail({}, { message: 'email harus valid' })
  email: string;

  @IsNotEmpty({ message: 'password tidak boleh kosong' })
  @IsString({ message: 'password harus string' })
  @MinLength(8, { message: 'password harus memiliki panjang minimal 8' })
  password: string;
}
