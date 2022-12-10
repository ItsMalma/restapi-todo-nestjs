import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTodoTable1670518409711 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'todo',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isGenerated: true,
            generatedIdentity: 'ALWAYS',
            generationStrategy: 'increment',
            isPrimary: true,
            primaryKeyConstraintName: 'todo_pk_id',
            isNullable: false,
          },
          {
            name: 'nama',
            type: 'varchar',
            length: '128',
            isNullable: false,
          },
          {
            name: 'deskripsi',
            type: 'varchar',
            length: '512',
            isNullable: false,
          },
          {
            name: 'selesai',
            type: 'boolean',
            isNullable: false,
            default: 'FALSE',
          },
          {
            name: 'pemilik',
            type: 'bigint',
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
        foreignKeys: [
          {
            name: 'todo_fk_pemilik',
            columnNames: ['pemilik'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
      true,
      true,
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('todo', true, true, true);
  }
}
