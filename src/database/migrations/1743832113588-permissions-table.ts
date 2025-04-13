import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class PermissionsTable1743832113588 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "permissions",
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
                        name: "display_name",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "alias_name",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "type",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "version",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "status",
                        type: "boolean",
                        isNullable: false,
                        default: true
                    },
                    {
                        name: "is_enabled",
                        type: "boolean",
                        isNullable: false,
                        default: true
                    },
                    {
                        name: "release_date",
                        type: "timestamp",
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
        await queryRunner.dropTable("permissions");
    }
}
