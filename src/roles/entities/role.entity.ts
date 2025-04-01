import { User } from '../../users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
// import { RolePermission } from 'src/role-permission/entities/role-permission.entity';

@Entity()
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @OneToMany(() => User, (user) => user.role, { cascade: true, nullable: true })
    users: User[];

    // @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role, { cascade: true, nullable: true })
    // role_permissions: RolePermission[];
}
