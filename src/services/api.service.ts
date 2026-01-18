import { IMovie, IMovieResponse } from "@/models/IMovie";
import { IGenreResponse } from "@/models/IGenre";

const BASE_URL = process.env.NEXT_PUBLIC_TMDB_API_URL;
const TOKEN = process.env.TMDB_ACCESS_TOKEN;

export const movieApi = async <T>(endpoint: string, params: Record<string, string> = {}): Promise<T> => {
    const url = new URL(`${BASE_URL}${endpoint}`);

    Object.entries(params).forEach(([key, value]) => {
        if (value) url.searchParams.append(key, value);
    });

    const res = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TOKEN}`
        },
        next: { revalidate: 86400 }
    });

    if (!res.ok) {
        throw new Error(`Помилка запиту: ${res.status}`);
    }

    return res.json();
};

export const movieService = {
    getAll: (page: string): Promise<IMovieResponse> =>
        movieApi<IMovieResponse>('/discover/movie', { page }),

    getById: (id: string): Promise<IMovie> =>
        movieApi<IMovie>(`/movie/${id}`),

    search: (query: string, page: string): Promise<IMovieResponse> =>
        movieApi<IMovieResponse>('/search/movie', { query, page }),

    getByGenre: (genreId: string, page: string): Promise<IMovieResponse> =>
        movieApi<IMovieResponse>('/discover/movie', { with_genres: genreId, page }),
};

export const genreService = {
    getAll: (): Promise<IGenreResponse> =>
        movieApi<IGenreResponse>('/genre/movie/list')
};