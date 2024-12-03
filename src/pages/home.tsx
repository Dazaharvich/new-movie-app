import { useState } from 'react';
import { MovieCard } from '../components/movie-card';

// Temporary mock data
const MOCK_MOVIES = [
  {
    id: 1,
    title: "Dune: Part Two",
    posterPath: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800",
    rating: 8.5,
    releaseDate: "2024-03-01",
  },
  {
    id: 2,
    title: "Poor Things",
    posterPath: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800",
    rating: 8.3,
    releaseDate: "2024-01-19",
  },
];

export default function Home() {
  const [movies] = useState(MOCK_MOVIES);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-4 text-2xl font-bold">Latest Releases</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              posterPath={movie.posterPath}
              rating={movie.rating}
              releaseDate={movie.releaseDate}
            />
          ))}
        </div>
      </section>
    </div>
  );
}