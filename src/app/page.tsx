import { movieService, genreService } from "@/services/api.service";
import { MovieList } from "@/components/movieList/MovieList";
import { PosterPreview } from "@/components/posterPreview/PosterPreview";
import Link from "next/link";
import s from "./page.module.css";

export default async function HomePage() {
    const [popular, genresResponse] = await Promise.all([
        movieService.getAll("1"),
        genreService.getAll(),
    ]);

    const heroMovie = popular.results[0];
    const trendingMovies = popular.results.slice(1, 7);

    return (
        <main className={s.main}>
            {heroMovie && (
                <section className={s.heroContainer}>
                    <PosterPreview
                        path={heroMovie.backdrop_path || heroMovie.poster_path}
                        title={heroMovie.title}
                    />
                    <div className={s.heroContent}>
                        <h1 className={s.heroTitle}>UNLIMITED MOVIES</h1>
                        <p className={s.heroSubtitle}>
                            Explore thousands of movies, from blockbusters to indie gems.
                            Find your next favorite story today.
                        </p>
                        <Link href="/movies" className={s.heroBtn}>
                            GO TO CATALOGUE
                        </Link>
                    </div>
                </section>
            )}
            <section className={s.sectionWrapper}>
                <div className={s.sectionHeader}>
                    <h2 className={s.sectionTitle}>Trending Now</h2>
                    <Link href="/movies" className={s.seeAll}>See All →</Link>
                </div>
                <MovieList movies={trendingMovies} genres={genresResponse.genres} />
            </section>
            <section className={s.sectionWrapper}>
                <h2 className={s.sectionTitle}>Browse by Genre</h2>
                <div className={s.genreGrid}>
                    {genresResponse.genres.slice(0, 10).map(genre => (
                        <Link
                            key={genre.id}
                            href={`/movies?with_genres=${genre.id}`}
                            className={s.genreLink}
                        >
                            {genre.name}
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}