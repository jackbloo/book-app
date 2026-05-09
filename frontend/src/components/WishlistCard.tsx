import { X, Book as BookIcon } from 'lucide-react';
import { StarRating } from './StarRating';
import { type WishlistItem } from '../hooks/useWishlist';

interface WishlistCardProps {
  item: WishlistItem;
  onRemove: () => void;
}

export const WishlistCard: React.FC<WishlistCardProps> = ({ item, onRemove }) => {
  return (
    <div className="bg-white rounded-[32px] p-5 border border-slate-200 shadow-sm flex flex-col group relative transition-all hover:shadow-md">
      <div className="relative aspect-[3/4] bg-slate-100 rounded-2xl overflow-hidden mb-4 shadow-md">
        {item.thumbnail ? (
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            <BookIcon className="w-12 h-12" />
          </div>
        )}
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur rounded-full text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 shadow-sm overflow-hidden"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <h3 className="font-bold text-slate-900 leading-tight mb-1 truncate">{item.title}</h3>
      <p className="text-slate-500 text-xs truncate mb-2">{item.authors?.join(', ') || 'Unknown Author'}</p>
      <div className="mt-auto flex items-center justify-between">
        <StarRating rating={item.rating} size={12} />
        <span className="px-2 py-0.5 bg-slate-50 text-slate-400 text-[10px] uppercase font-bold rounded-md tracking-tighter">Verified</span>
      </div>
    </div>
  );
};
