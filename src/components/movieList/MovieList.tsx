import s from "./MovieList.module.css";
import type { IMovie } from "@/models/IMovie";
import type { IGenre } from "@/models/IGenre";
import type { FC } from "react";
import {MovieListCard} from "@/components/movieListCard/MovieListCard";

interface IProps {
    movies: IMovie[];
    genres: IGenre[];
}

export const MovieList: FC<IProps> = ({ movies, genres }) => (
    <div className={s.listGrid}>
        {movies.map(movie => (
            <MovieListCard key={movie.id} movie={movie} allGenres={genres} />
        ))}
    </div>
);