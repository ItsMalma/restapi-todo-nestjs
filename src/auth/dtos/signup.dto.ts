import { hashSync } from 'bcrypt';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { CreateUserDTO } from 'src/user/dtos/create-user.dto';

export class SignupDTO extends CreateUserDTO {}
