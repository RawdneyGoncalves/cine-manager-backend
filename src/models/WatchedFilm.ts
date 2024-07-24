import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from './userModel';
import { Film } from './film';

@Entity()
export class WatchedFilm {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.watchedFilms)
    user!: User;

    @ManyToOne(() => Film, film => film.watchedFilms)
    film!: Film;

    @Column()
    watchedAt!: Date;

    constructor(user: User, film: Film) {
        this.user = user;
        this.film = film;
        this.watchedAt = new Date();
    }
}
