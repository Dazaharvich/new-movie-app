const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string; }[];
  runtime: number;
}

interface TMDBVideo {
  key: string;
  site: string;
  type: string;
}

export async function getMovieDetails(id: string): Promise<TMDBMovie> {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${id}`, {
      headers: {
        Authorization: `Bearer ${TMDB_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.json();
}

export async function getMovieVideos(id: string): Promise<TMDBVideo[]> {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${id}/videos`, {
      headers: {
        Authorization: `Bearer ${TMDB_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await response.json();
  return data.results;
}

export function getPosterUrl(path: string, size: 'w500' | 'original' = 'w500') {
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

export function getBackdropUrl(path: string, size: 'w1280' | 'original' = 'w1280') {
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}