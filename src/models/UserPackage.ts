import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './userModel';
import { Package } from './package';

@Entity('user_packages')
export class UserPackage {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne(() => Package)
    @JoinColumn({ name: 'package_id' })
    package!: Package;
}
