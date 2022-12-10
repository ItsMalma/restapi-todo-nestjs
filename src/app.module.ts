import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TypeOrmDataSource } from './config';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(TypeOrmDataSource.options),
    AuthModule,
    UserModule,
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
