import { Search, Loader2, Book as BookIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { BookCard } from './BookCard';
import { type BookVolume } from '../services/googleBooks';

interface SearchResultsProps {
  isLoading: boolean;
  results: BookVolume[];
  isBookInWishlist: (volumeId: string) => boolean;
  onAddToWishlist: (book: BookVolume) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  isLoading,
  results,
  isBookInWishlist,
  onAddToWishlist,
}) => {
  return (
    <motion.div
      key="search-results"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="space-y-6"
    >
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[32px] border border-slate-200">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mb-4" />
          <p className="text-slate-500 font-medium font-serif italic text-lg">Curating your next great read...</p>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {results.map((book, idx) => {
            const isFeatured = idx === 0;
            return (
              <BookCard
                key={book.id}
                book={book}
                isFeatured={isFeatured}
                isInWishlist={isBookInWishlist(book.id)}
                onAddToWishlist={() => onAddToWishlist(book)}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[32px] border border-slate-200">
          <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6 shadow-inner text-indigo-300">
            <Search size={40} />
          </div>
          <h2 className="text-3xl text-center font-serif font-bold text-slate-900 mb-2">
            Discover Your Next Favorite Book
          </h2>
          <p className="text-slate-500 max-w-sm text-center sm:w-fit">
            Explore thousands of books and build your personal reading wishlist.
          </p>
        </div>
      )}
    </motion.div>
  );
};
