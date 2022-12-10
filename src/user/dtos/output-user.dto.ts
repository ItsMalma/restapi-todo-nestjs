import { UserEntity } from '../user.entity';

export class OutputUserDTO {
  id: number;

  nama: string;

  createdAt: Date;

  updatedAt: Date;

  public constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.nama = userEntity.nama;
    this.createdAt = userEntity.createdAt;
    this.updatedAt = userEntity.updatedAt;
  }
}
