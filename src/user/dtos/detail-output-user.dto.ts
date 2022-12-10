import { UserEntity } from '../user.entity';

export class DetailOutputUserDTO {
  id: number;

  nama: string;

  email: string;

  createdAt: Date;

  updatedAt: Date;

  public constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.nama = userEntity.nama;
    this.email = userEntity.email;
    this.createdAt = userEntity.createdAt;
    this.updatedAt = userEntity.updatedAt;
  }
}
