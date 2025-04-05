import { RolePermission } from 'src/role-permission/entities/role-permission.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Permission {
    @PrimaryGeneratedColumn('uuid') // ✅ Generates UUID in the app, not SQL
    id: string;

    @Column({ unique: true })
    name: string;

    @OneToMany(() => RolePermission, (rolePermission) => rolePermission.permission, { cascade: true, })
    role_permissions: RolePermission[];


    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

}
