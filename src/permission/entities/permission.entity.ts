import { RolePermission } from 'src/role-permission/entities/role-permission.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity('permissions')
export class Permission {
    @PrimaryGeneratedColumn('uuid') // ✅ Generates UUID in the app, not SQL
    id: string;

    @Column({ unique: true })
    name: string;

    @Column()
    display_name: string

    @Column({ type: "text" })
    alias_name: string

    @Column()
    type: string

    @Column()
    description: string

    @Column()
    version: string

    @Column({ default: true })
    status: boolean

    @Column({ default: true })
    is_enabled: boolean

    @Column()
    release_date: Date


    @OneToMany(() => RolePermission, (rolePermission) => rolePermission.permission, { cascade: true, })
    role_permissions: RolePermission[];

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

}






