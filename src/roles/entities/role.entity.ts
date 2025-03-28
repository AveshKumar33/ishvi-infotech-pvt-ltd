import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn('uuid') // ✅ Generates UUID in the app, not SQL
    id: string;

    @Column({ unique: true })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
