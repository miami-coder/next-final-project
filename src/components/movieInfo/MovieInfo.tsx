import { GenreBadge } from "../genreBadge/GenreBadge";
import s from "./MovieInfo.module.css";
import type { IMovie } from "@/models/IMovie";
import type { IGenre } from "@/models/IGenre";
import type { FC } from "react";
import {StarsRating} from "@/components/starsRating/StarsRating";

interface IProps {
    movie: IMovie;
    allGenres: IGenre[];
}

export const MovieInfo: FC<IProps> = ({ movie, allGenres }) => {

    const getGenreName = (id: number): string => {
        const genre = allGenres.find(g => g.id === id);
        return genre ? genre.name : 'Movie';
    };

    return (
        <div className={s.infoWrapper}>
            <h1 className={s.label}>{movie.title}</h1>

            <div className={s.ratingRow}>
                <StarsRating rating={movie.vote_average} />
                <span className={s.date}>{movie.release_date}</span>
            </div>

            <div className={s.badges}>
                {movie.genre_ids?.map(id => (
                    <GenreBadge
                        key={id}
                        id={id}
                        name={getGenreName(id)}
                    />
                ))}
            </div>

            <div className={s.description}>
                <h3>Description:</h3>
                <p>{movie.overview}</p>
            </div>
        </div>
    );
};