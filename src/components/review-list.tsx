import { Star } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface Review {
  id: string;
  userName: string;
  rating: number;
  content: string;
  createdAt: Date;
}

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{review.userName}</span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <span className="text-sm text-gray-500">
              {formatDate(review.createdAt.toISOString())}
            </span>
          </div>
          <p className="text-gray-700">{review.content}</p>
        </div>
      ))}
    </div>
  );
}