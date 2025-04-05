
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class RoleTable1743831712328 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'roles',
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        length: "36",
                        isPrimary: true,
                        isUnique: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        length: '255',
                        isUnique: true,
                        isNullable: false,
                    },

                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
                    },
                ],
            }),
            true,
        );


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('roles');
    }
}

