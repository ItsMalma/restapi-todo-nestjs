import { BigintColumnTransformer } from 'src/shared/transformer';
import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'todo' })
export class TodoEntity {
  @Column({
    name: 'id',
    type: 'bigint',
    generated: 'increment',
    generatedIdentity: 'ALWAYS',
    primary: true,
    primaryKeyConstraintName: 'todo_pk_id',
    nullable: false,
    transformer: new BigintColumnTransformer(),
  })
  id: number;

  @Column({
    name: 'nama',
    type: 'varchar',
    length: '128',
    nullable: false,
  })
  nama: string;

  @Column({
    name: 'deskripsi',
    type: 'varchar',
    length: '512',
    nullable: false,
  })
  deskripsi: string;

  @Column({
    name: 'selesai',
    type: 'boolean',
    nullable: false,
    default: 'FALSE',
  })
  selesai: boolean;

  @Column({
    name: 'pemilik',
    type: 'bigint',
    nullable: false,
    transformer: new BigintColumnTransformer(),
  })
  pemilik: number;

  @ManyToOne(() => UserEntity, (user) => user.todos)
  @JoinColumn({
    name: 'pemilik',
    foreignKeyConstraintName: 'todo_fk_pemilik',
    referencedColumnName: 'id',
  })
  pemilikAsUser: UserEntity;

  @CreateDateColumn({
    name: 'createdAt',
    type: 'timestamp',
    nullable: false,
    default: 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updatedAt',
    type: 'timestamp',
    nullable: false,
    default: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deletedAt',
    type: 'timestamp',
    nullable: true,
    default: 'NULL',
  })
  deletedAt: Date;
}
