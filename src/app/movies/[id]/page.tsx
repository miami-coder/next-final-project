import { movieService, genreService } from "@/services/api.service";
import { PosterPreview } from "@/components/posterPreview/PosterPreview";
import { MovieInfo } from "@/components/movieInfo/MovieInfo";
import { notFound } from "next/navigation";

export default async function MovieDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const [movie, genresResponse] = await Promise.all([
        movieService.getById(id),
        genreService.getAll()
    ]);

    if (!movie) {
        return notFound();
    }

    return (
        <main>
            <PosterPreview
                path={movie.backdrop_path || movie.poster_path}
                title={movie.title}
            />
            <MovieInfo
                movie={movie}
                allGenres={genresResponse.genres}
            />
        </main>
    );
}