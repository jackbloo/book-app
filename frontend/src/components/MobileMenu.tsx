import { Search, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  activeTab: 'search' | 'wishlist';
  onTabChange: (tab: 'search' | 'wishlist') => void;
  onClose: () => void;
  wishlistCount: number;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  activeTab,
  onTabChange,
  onClose,
  wishlistCount,
}) => {
  const handleTabChange = (tab: 'search' | 'wishlist') => {
    onTabChange(tab);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white border-b border-slate-200 px-4 py-4 flex flex-col gap-2 z-40 sticky top-20 shadow-lg"
        >
          <button
            onClick={() => handleTabChange('search')}
            className={cn("flex items-center gap-3 p-3 rounded-xl", activeTab === 'search' ? "bg-indigo-50 text-indigo-600" : "text-slate-600")}
          >
            <Search size={18} /> Discover
          </button>
          <button
            onClick={() => handleTabChange('wishlist')}
            className={cn("flex items-center justify-between p-3 rounded-xl", activeTab === 'wishlist' ? "bg-indigo-50 text-indigo-600" : "text-slate-600")}
          >
            <div className="flex items-center gap-3"><Heart size={18} /> Wishlist</div>
            {wishlistCount > 0 && <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs">{wishlistCount}</span>}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
