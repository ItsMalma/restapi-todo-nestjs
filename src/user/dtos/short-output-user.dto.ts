import { UserEntity } from '../user.entity';

export class ShortOutputUserDTO {
  id: number;
  nama: string;

  public constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.nama = userEntity.nama;
  }
}
