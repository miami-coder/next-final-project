import { movieService, genreService } from "@/services/api.service";
import { MovieList } from "@/components/movieList/MovieList";
import { Pagination } from "@/components/pagination/Pagination";
import { PosterPreview } from "@/components/posterPreview/PosterPreview";
import Link from "next/link";
import s from "./MoviesPage.module.css";

interface SearchParams {
    query?: string;
    with_genres?: string;
    page?: string;
}

export default async function MoviesPage({
                                             searchParams,
                                         }: {
    searchParams: Promise<SearchParams>;
}) {
    const params = await searchParams;
    const currentPage = params.page || "1";
    const query = params.query || "";
    const genreId = params.with_genres || "";

    const [moviesResponse, genresResponse] = await Promise.all([
        query
            ? movieService.search(query, currentPage)
            : genreId
                ? movieService.getByGenre(genreId, currentPage)
                : movieService.getAll(currentPage),
        genreService.getAll(),
    ]);

    const hasMovies = moviesResponse.results && moviesResponse.results.length > 0;

    const heroMovie = hasMovies ? moviesResponse.results[0] : null;

    const displayMovies = heroMovie ? moviesResponse.results.slice(1) : moviesResponse.results;

    const getPageTitle = () => {
        if (query) return `Search results for: "${query}"`;
        if (genreId) {
            const genre = genresResponse.genres.find(g => g.id.toString() === genreId);
            return genre ? `Genre: ${genre.name}` : "Movies by Genre";
        }
        return `Popular Movies - Page ${currentPage}`;
    };

    return (
        <main className={s.main}>
            {hasMovies ? (
                <>
                    {heroMovie && (
                        <div className={s.heroContainer}>
                            <PosterPreview
                                path={heroMovie.backdrop_path || heroMovie.poster_path}
                                title={heroMovie.title}
                            />
                            <div className={s.heroContent}>
                                <div className={s.heroTextWrapper}>
                                    <h2 className={s.heroTitle}>{heroMovie.title}</h2>
                                    <p className={s.heroOverview}>{heroMovie.overview}</p>
                                    <Link href={`/movies/${heroMovie.id}`} className={s.heroBtn}>
                                        <span style={{ marginRight: '12px' }}>▶</span> Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={s.contentWrapper} style={{ marginTop: heroMovie ? '-20px' : '0' }}>
                        <h1 className={s.pageTitle}>{getPageTitle()}</h1>
                        <MovieList movies={displayMovies} genres={genresResponse.genres} />

                        {moviesResponse.total_pages > 1 && (
                            <div style={{ marginTop: '40px' }}>
                                <Pagination totalPages={moviesResponse.total_pages} />
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div className={s.emptyState}>
                    <h2 className={s.emptyTitle}>Don&apos;t push the horses!</h2>
                    <p style={{ color: '#888', marginBottom: '30px' }}>
                        We couldn&apos;t find any movies matching your request.
                    </p>
                    <Link href="/movies" className={s.backBtn}>
                        Back to Home
                    </Link>
                </div>
            )}
        </main>
    );
}