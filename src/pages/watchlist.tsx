import { MovieCard } from '../components/movie-card';

// Temporary mock data
const WATCHLIST = [
  {
    id: 1,
    title: "Dune: Part Two",
    posterPath: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800",
    rating: 8.5,
    releaseDate: "2024-03-01",
  }
];

export default function Watchlist() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Watchlist</h2>
      
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {WATCHLIST.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            posterPath={movie.posterPath}
            rating={movie.rating}
            releaseDate={movie.releaseDate}
            isInWatchlist={true}
          />
        ))}
      </div>
      
      {WATCHLIST.length === 0 && (
        <p className="text-center text-gray-500">Your watchlist is empty</p>
      )}
    </div>
  );
}