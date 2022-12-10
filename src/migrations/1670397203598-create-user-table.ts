import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1670397203598 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isGenerated: true,
            generatedIdentity: 'ALWAYS',
            generationStrategy: 'increment',
            isPrimary: true,
            primaryKeyConstraintName: 'user_pk_id',
            isNullable: false,
          },
          {
            name: 'nama',
            type: 'varchar',
            length: '128',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '256',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true,
            default: 'NULL',
          },
        ],
        indices: [
          {
            name: 'user_unique_email',
            isUnique: true,
            columnNames: ['email'],
            where: '"deletedAt" IS NULL',
          },
        ],
      }),
      true,
      true,
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user', true, true, true);
  }
}
