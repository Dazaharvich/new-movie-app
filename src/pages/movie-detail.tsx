import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getMovieDetails, getMovieVideos, getPosterUrl } from '@/lib/tmdb';
import { useAuthStore } from '@/store/auth';
import { useMoviesStore } from '@/store/movies';
import { useReviewsStore } from '@/store/reviews';
import { ReviewForm } from '@/components/review-form';
import { ReviewList } from '@/components/review-list';

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const user = useAuthStore(state => state.user);
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useMoviesStore();
  const { reviews, fetchReviews, hasUserReviewed } = useReviewsStore();

  const { data: movie } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieDetails(id!),
    enabled: !!id,
  });

  const { data: videos } = useQuery({
    queryKey: ['movie-videos', id],
    queryFn: () => getMovieVideos(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (id) {
      fetchReviews(Number(id));
    }
  }, [id, fetchReviews]);

  if (!movie) return null;

  const trailer = videos?.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  const handleWatchlistClick = async () => {
    if (!user) return;
    
    if (isInWatchlist(movie.id)) {
      await removeFromWatchlist(movie.id);
    } else {
      await addToWatchlist(movie.id);
    }
  };

  return (
    <div className="space-y-8">
      {/* Movie Header */}
      <div className="grid gap-8 md:grid-cols-[300px,1fr]">
        <div>
          <img
            src={getPosterUrl(movie.poster_path)}
            alt={movie.title}
            className="w-full rounded-lg"
          />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="text-lg font-semibold">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
            {user && (
              <button
                onClick={handleWatchlistClick}
                className="flex items-center space-x-2 rounded-full bg-primary px-4 py-2 text-white"
              >
                <Clock className="h-5 w-5" />
                <span>
                  {isInWatchlist(movie.id)
                    ? 'Remove from Watchlist'
                    : 'Add to Watchlist'}
                </span>
              </button>
            )}
          </div>
          
          <div>
            <h2 className="text-xl font-semibold">Overview</h2>
            <p className="mt-2 text-gray-600">{movie.overview}</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold">Genres</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Section */}
      {trailer && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Trailer</h2>
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="Movie Trailer"
              className="h-full w-full rounded-lg"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Reviews</h2>
          {user && !hasUserReviewed(movie.id) && !showReviewForm && (
            <button
              onClick={() => setShowReviewForm(true)}
              className="rounded-md bg-primary px-4 py-2 text-white"
            >
              Write a Review
            </button>
          )}
        </div>

        {showReviewForm && (
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <ReviewForm
              movieId={movie.id}
              onSubmit={() => setShowReviewForm(false)}
            />
          </div>
        )}

        {reviews.length > 0 ? (
          <ReviewList reviews={reviews} />
        ) : (
          <p className="text-center text-gray-500">No reviews yet</p>
        )}
      </div>
    </div>
  );
}