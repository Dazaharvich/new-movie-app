import { useState } from 'react';
import { Star } from 'lucide-react';
import { useReviewsStore } from '@/store/reviews';

interface ReviewFormProps {
  movieId: number;
  onSubmit?: () => void;
}

export function ReviewForm({ movieId, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const addReview = useReviewsStore(state => state.addReview);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addReview(movieId, rating, content);
    setRating(0);
    setContent('');
    onSubmit?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Rating</label>
        <div className="mt-1 flex space-x-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              className="p-1"
            >
              <Star
                className={`h-6 w-6 ${
                  value <= rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Review</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          required
        />
      </div>

      <button
        type="submit"
        className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
        disabled={rating === 0 || !content.trim()}
      >
        Submit Review
      </button>
    </form>
  );
}