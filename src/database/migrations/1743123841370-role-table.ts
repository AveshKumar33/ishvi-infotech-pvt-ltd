import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class RoleTable1743123841370 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "roles",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        length: "36",
                        isPrimary: true,
                        isUnique: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "255",
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: "description",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("roles");
    }
}
