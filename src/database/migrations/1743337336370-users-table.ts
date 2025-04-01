import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class UsersTable1743337336370 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const databaseName = await queryRunner.getCurrentDatabase();

        // Get collation for `roleId`
        const roleCollation = (
            await queryRunner.query(`
                SELECT COLLATION_NAME 
                FROM information_schema.columns
                WHERE TABLE_NAME = 'roles'
                AND COLUMN_NAME = 'id'
                AND TABLE_SCHEMA = '${databaseName}'
            `)
        )[0]?.COLLATION_NAME || 'utf8mb4_unicode_ci'; // Fallback collation

        // Create users table
        await queryRunner.createTable(
            new Table({
                name: "users",
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
                        isNullable: false,
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "255",
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: "password",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "profile_picture",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "roleId",
                        type: "varchar",
                        length: "36",
                        isNullable: true,
                        collation: roleCollation,
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
            })
        );

        // Create foreign key constraint
        await queryRunner.createForeignKey(
            "users",
            new TableForeignKey({
                columnNames: ["roleId"],
                referencedColumnNames: ["id"],
                referencedTableName: "roles",
                onDelete: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }
}
