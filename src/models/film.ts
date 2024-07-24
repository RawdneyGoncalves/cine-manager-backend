import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Theme } from './theme';
import { WatchedFilm } from './WatchedFilm';

@Entity('films')
export class Film {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    title!: string;

    @Column({ type: 'text' })
    description!: string;

    @ManyToOne(() => Theme, theme => theme.films, { nullable: false })
    theme!: Theme;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;

    @OneToMany(() => WatchedFilm, watchedFilm => watchedFilm.film)
    watchedFilms!: WatchedFilm[];
}
