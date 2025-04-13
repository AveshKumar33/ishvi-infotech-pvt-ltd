import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class RolePermissionsTable1743832204020 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const databaseName = await queryRunner.getCurrentDatabase();

        // Ensure roles and permissions tables exist before fetching collation
        const roleTableExists = await queryRunner.query(`SHOW TABLES LIKE 'roles'`);
        const permissionTableExists = await queryRunner.query(`SHOW TABLES LIKE 'permissions'`);
        if (!roleTableExists.length || !permissionTableExists.length) {
            throw new Error("Ensure both 'roles' and 'permissions' tables exist before running this migration.");
        }

        // Get collation for roleId
        const roleCollation = (
            await queryRunner.query(`
                SELECT COLLATION_NAME 
                FROM information_schema.columns
                WHERE TABLE_NAME = 'roles'
                AND COLUMN_NAME = 'id'
                AND TABLE_SCHEMA = '${databaseName}'
            `)
        )[0]?.COLLATION_NAME || 'utf8mb4_unicode_ci';

        // Get collation for permissionId
        const permissionCollation = (
            await queryRunner.query(`
                SELECT COLLATION_NAME 
                FROM information_schema.columns
                WHERE TABLE_NAME = 'permissions'
                AND COLUMN_NAME = 'id'
                AND TABLE_SCHEMA = '${databaseName}'
            `)
        )[0]?.COLLATION_NAME || 'utf8mb4_unicode_ci';

        // Create the role_permissions table
        await queryRunner.createTable(
            new Table({
                name: "role_permissions",
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
                        name: "roleId",
                        type: "varchar",
                        length: "36",
                        isNullable: true,
                        collation: roleCollation,
                    },
                    {
                        name: "permissionId",
                        type: "varchar",
                        length: "36",
                        isNullable: true,
                        collation: permissionCollation,
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

        // Create foreign keys
        await queryRunner.createForeignKey(
            "role_permissions",
            new TableForeignKey({
                columnNames: ["roleId"],
                referencedColumnNames: ["id"],
                referencedTableName: "roles",
                onDelete: "SET NULL",
            })
        );

        await queryRunner.createForeignKey(
            "role_permissions",
            new TableForeignKey({
                columnNames: ["permissionId"],
                referencedColumnNames: ["id"],
                referencedTableName: "permissions",
                onDelete: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("role_permissions");
    }
}
