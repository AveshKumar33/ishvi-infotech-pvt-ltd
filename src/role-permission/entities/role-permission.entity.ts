// import { Permission } from 'src/permission/entities/permission.entity';
// import { Role } from 'src/roles/entities/role.entity';
// import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';


// @Entity()
// export class RolePermission {
//     @PrimaryGeneratedColumn('uuid') // ✅ Generates UUID in the app, not SQL
//     id: string;

//     @ManyToOne(() => Role, (role) => role.role_permissions, { onDelete: 'SET NULL' })
//     role: Role;

//     @ManyToOne(() => Permission, (permission) => permission.role_permissions, { onDelete: 'SET NULL' })
//     permission: Permission;

//     @CreateDateColumn({ type: 'timestamp' })
//     created_at: Date;

//     @UpdateDateColumn({ type: 'timestamp' })
//     updated_at: Date;

// }
