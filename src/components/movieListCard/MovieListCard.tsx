import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { IMovie } from "@/models/IMovie";
import { IGenre } from "@/models/IGenre";
import s from "./MovieListCard.module.css";
import { GenreBadge } from "@/components/genreBadge/GenreBadge";
import { StarsRating } from "@/components/starsRating/StarsRating";

interface IProps {
    movie: IMovie;
    allGenres: IGenre[];
}

export const MovieListCard: FC<IProps> = ({ movie, allGenres }) => {
    if (!movie) return null;

    const getGenreName = (id: number): string => {
        const genre = allGenres.find(g => g.id === id);
        return genre ? genre.name : 'Movie';
    };

    return (
        <div className={s.card}>
            <Link href={`/movies/${movie.id}`} className={s.posterWrapper}>
                {movie.poster_path ? (
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        width={500}
                        height={750}
                        className={s.posterImage}
                        loading="lazy"
                    />
                ) : (
                    <div className={s.noPoster}>
                        <span>No Image Available</span>
                    </div>
                )}
                <div className={s.rating}>
                    ⭐ {movie.vote_average.toFixed(1)}
                </div>
                <div className={s.playOverlay}>
                    <span>▶</span>
                </div>
            </Link>

            <div className={s.info}>
                <h4 className={s.title}>{movie.title}</h4>
                <div className={s.extraInfo}>
                    <StarsRating rating={movie.vote_average} />
                </div>
                <div className={s.genres}>
                    {movie.genre_ids?.slice(0, 2).map(id => (
                        <GenreBadge
                            key={id}
                            id={id}
                            name={getGenreName(id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};