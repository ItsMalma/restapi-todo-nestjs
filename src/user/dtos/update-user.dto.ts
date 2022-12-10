import { hashSync } from 'bcrypt';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { UserEntity } from '../user.entity';

export class UpdateUserDTO {
  @IsOptional()
  @IsString({ message: 'nama harus string' })
  @Length(1, 128, { message: 'nama harus memiliki panjang 1 - 128' })
  nama?: string;

  public turnEntity(userEntity: UserEntity): UserEntity {
    if (this.nama !== undefined) userEntity.nama = this.nama;
    return userEntity;
  }
}
