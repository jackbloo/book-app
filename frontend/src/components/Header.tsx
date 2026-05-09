import { Search, Heart, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeTab: 'search' | 'wishlist';
  onTabChange: (tab: 'search' | 'wishlist') => void;
  wishlistCount: number;
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
  onClearSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  activeTab,
  onTabChange,
  wishlistCount,
  isMobileMenuOpen,
  onMobileMenuToggle,
  onClearSearch,
}) => {
  return (
    <header className="h-20 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between shadow-sm sticky top-0 z-50 shrink-0">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl italic shadow-md">B</div>
        <span className="text-xl font-bold tracking-tight text-slate-900 hidden sm:inline">
          Book<span className="text-indigo-600 underline decoration-2 underline-offset-4">App</span>
        </span>
      </div>

      <div className="flex-1 max-w-2xl px-4 md:px-12">
        <div className="relative flex items-center group">
          <Search className="absolute left-4 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search books..."
            className="w-full bg-slate-100 border-none rounded-2xl py-2.5 pl-11 pr-10 text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none text-sm md:text-base shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={onClearSearch}
              className="absolute right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="hidden md:flex gap-4 items-center text-sm font-medium">
        <button
          onClick={() => onTabChange('search')}
          className={cn("px-4 py-2 rounded-xl transition-all", activeTab === 'search' ? "bg-indigo-600 text-white" : "text-slate-500 hover:bg-slate-100")}
        >
          Discover
        </button>
        <button
          onClick={() => onTabChange('wishlist')}
          className={cn("px-4 py-2 rounded-xl transition-all relative", activeTab === 'wishlist' ? "bg-indigo-600 text-white" : "text-slate-500 hover:bg-slate-100")}
        >
          Wishlist
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
              {wishlistCount}
            </span>
          )}
        </button>
      </div>

      <button
        className="md:hidden p-2 text-slate-500"
        onClick={onMobileMenuToggle}
      >
        <Menu />
      </button>
    </header>
  );
};
