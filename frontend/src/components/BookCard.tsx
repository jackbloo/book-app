import { Heart, Book as BookIcon } from 'lucide-react';
import { StarRating } from './StarRating';
import { cn } from '../lib/utils';
import { type BookVolume } from '../services/googleBooks';

interface BookCardProps {
  book: BookVolume;
  isFeatured: boolean;
  isInWishlist: boolean;
  onAddToWishlist: () => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  isFeatured,
  isInWishlist,
  onAddToWishlist,
}) => {
  return (
    <div
      className={cn(
        "bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col gap-4 relative overflow-hidden transition-all hover:shadow-md",
        isFeatured && "sm:col-span-2 sm:flex-row"
      )}
    >
      <div
        className={cn(
          "relative shrink-0 bg-slate-200 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform",
          isFeatured ? "w-32 h-44 sm:w-40 sm:h-56" : "w-full aspect-[3/4]"
        )}
      >
        {book.volumeInfo.imageLinks?.thumbnail ? (
          <img
            src={book.volumeInfo.imageLinks.thumbnail.replace('http:', 'https:')}
            alt={book.volumeInfo.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            <BookIcon className="w-12 h-12" />
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between py-1 flex-1 overflow-hidden">
        <div>
          <div className="flex items-center gap-2 mb-2">
            {isFeatured && (
              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded-full uppercase tracking-wider">Featured</span>
            )}
            <StarRating rating={book.volumeInfo.averageRating || 0} size={14} className="text-amber-400" />
          </div>
          <h2 className={cn("font-serif font-bold text-slate-900 leading-tight mb-1 truncate", isFeatured ? "text-2xl" : "text-lg")}>
            {book.volumeInfo.title}
          </h2>
          <p className="text-slate-500 font-medium text-sm truncate">
            {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
          </p>
          {isFeatured && (
            <p className="text-slate-400 text-sm mt-3 line-clamp-3 leading-relaxed">
              {book.volumeInfo.description}
            </p>
          )}
        </div>
        <button
          onClick={onAddToWishlist}
          disabled={isInWishlist}
          className={cn(
            "flex items-center justify-center gap-2 w-full mt-4 py-2.5 font-bold rounded-xl transition-all shadow-sm active:scale-[0.98] uppercase text-xs tracking-widest",
            isInWishlist
              ? "bg-slate-100 text-slate-400 cursor-default"
              : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100"
          )}
        >
          <Heart className={cn("w-4 h-4", isInWishlist && "fill-current")} />
          {isInWishlist ? 'Locked In' : 'Add to Wishlist'}
        </button>
      </div>
      {isFeatured && <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-50 rounded-full opacity-50 -z-10"></div>}
    </div>
  );
};
