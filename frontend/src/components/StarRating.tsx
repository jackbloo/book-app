import { Star } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface StarRatingProps {
  rating: number;
  max?: number;
  className?: string;
  size?: number;
}

export function StarRating({ rating, max = 5, className, size = 16 }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          size={size}
          className="fill-amber-400 text-amber-400"
        />
      ))}
      {hasHalfStar && (
        <div className="relative">
          <Star size={size} className="text-amber-400" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star size={size} className="fill-amber-400 text-amber-400" />
          </div>
        </div>
      )}
      {[...Array(Math.max(0, emptyStars))].map((_, i) => (
        <Star
          key={`empty-${i}`}
          size={size}
          className="text-gray-300"
        />
      ))}
      {rating > 0 && (
        <span className="ml-2 text-xs font-medium text-gray-500">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
