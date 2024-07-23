import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './userModel';
import { Film } from './film';

@Entity()
export class WatchedFilm {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.watchedFilms)
    user: User;

    @ManyToOne(() => Film, film => film.watchedFilms)
    film: Film;

    @Column()
    watchedAt: Date;
}
