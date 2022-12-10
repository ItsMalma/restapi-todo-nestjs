import { BigintColumnTransformer } from 'src/shared/transformer';
import { TodoEntity } from 'src/todo/todo.entity';
import {
  Entity,
  Column,
  Unique,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'user' })
@Unique(['email'])
export class UserEntity {
  @Column({
    name: 'id',
    type: 'bigint',
    generated: 'increment',
    generatedIdentity: 'ALWAYS',
    primary: true,
    primaryKeyConstraintName: 'user_pk_id',
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
    name: 'email',
    type: 'varchar',
    length: '256',
    nullable: false,
  })
  email: string;

  @Column({
    name: 'password',
    type: 'text',
    nullable: false,
  })
  password: string;

  @OneToMany(() => TodoEntity, (todo) => todo.pemilikAsUser)
  todos: TodoEntity[];

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
  deletedAt: Date | null;
}
