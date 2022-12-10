import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { CreateUserTable1670397203598 } from './migrations/1670397203598-create-user-table';
import { CreateTodoTable1670518409711 } from './migrations/1670518409711-create-todo-table';
import { TodoEntity } from './todo/todo.entity';
import { UserEntity } from './user/user.entity';

config();

export const TypeOrmDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PWD,
  database: process.env.PG_NAME,
  entities: [UserEntity, TodoEntity],
  migrations: [CreateUserTable1670397203598, CreateTodoTable1670518409711],
});
