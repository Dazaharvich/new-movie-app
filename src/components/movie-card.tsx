import { Star, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { cn } from '@/lib/utils';

interface MovieCardProps {
  title: string;
  posterPath: string;
  rating: number;
  releaseDate: string;
  onWatchlistClick?: () => void;
  isInWatchlist?: boolean;
}

export function MovieCard({
  title,
  posterPath,
  rating,
  releaseDate,
  onWatchlistClick,
  isInWatchlist,
}: MovieCardProps) {
  return (
    <Card className="w-[200px] overflow-hidden">
      <div className="relative">
        <img
          src={posterPath}
          alt={title}
          className="h-[300px] w-full object-cover"
        />
        <button
          onClick={onWatchlistClick}
          className="absolute right-2 top-2 rounded-full bg-white p-2 shadow-md"
        >
          <Clock
            className={cn('h-5 w-5', {
              'text-primary': isInWatchlist,
              'text-gray-500': !isInWatchlist,
            })}
          />
        </button>
      </div>
      <CardHeader className="space-y-1">
        <h3 className="font-semibold leading-tight">{title}</h3>
        <div className="flex items-center space-x-1 text-sm text-gray-500">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span>{rating.toFixed(1)}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">
          {new Date(releaseDate).getFullYear()}
        </p>
      </CardContent>
    </Card>
  );
}