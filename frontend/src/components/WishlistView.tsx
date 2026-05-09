import { Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { WishlistCard } from './WishlistCard';
import { type WishlistItem } from '../hooks/useWishlist';

interface WishlistViewProps {
  wishlist: WishlistItem[];
  onRemove: (id: string) => void;
  onNavigateToSearch: () => void;
}

export const WishlistView: React.FC<WishlistViewProps> = ({
  wishlist,
  onRemove,
  onNavigateToSearch,
}) => {
  return (
    <motion.div
      key="wishlist-results"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6"
    >
      {wishlist.length > 0 ? (
        wishlist.map((item) => (
          <WishlistCard
            key={item._id}
            item={item}
            onRemove={() => onRemove(item._id)}
          />
        ))
      ) : (
        <div className="col-span-full py-20 text-center bg-white rounded-[32px] border border-slate-200 border-dashed">
          <Heart className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <h3 className="text-2xl font-serif font-bold text-slate-900">Your library is silent</h3>
          <button
            onClick={onNavigateToSearch}
            className="text-indigo-600 font-bold text-sm mt-4 hover:underline underline-offset-4"
          >
            Discover something now
          </button>
        </div>
      )}
    </motion.div>
  );
};
