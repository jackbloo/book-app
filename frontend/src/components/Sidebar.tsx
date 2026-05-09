import { Heart } from 'lucide-react';
import { type WishlistItem } from '../hooks/useWishlist';
import { StarRating } from './StarRating';

interface SidebarProps {
  wishlist: WishlistItem[];
  onEnterLibrary: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ wishlist, onEnterLibrary }) => {
  return (
    <aside className="order-1 lg:order-2 lg:col-span-4 flex flex-col gap-6 h-fit lg:sticky lg:top-28">
      <div className="bg-white rounded-[32px] border border-slate-200 shadow-xl flex flex-col overflow-hidden min-h-[300px] lg:min-h-[400px]">
        <div className="p-6 pb-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-black tracking-tight flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              LATEST SAVES
            </h2>
            <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-[10px] font-black rounded-lg">
              {wishlist.length} VOL(S)
            </span>
          </div>

          <div className="space-y-4 max-h-[200px] lg:max-h-[350px] overflow-y-auto no-scrollbar">
            {wishlist.slice(0, 5).map((item) => (
                <div key={item._id} className="flex gap-4 items-center p-3 rounded-2xl hover:bg-slate-50 transition-colors group cursor-default">
                  <div className="w-12 h-16 shrink-0 bg-slate-100 rounded-lg overflow-hidden shadow-sm">
                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h4 className="font-bold text-sm text-slate-900 truncate leading-none mb-1">{item.title}</h4>
                    <p className="text-[11px] text-slate-400 truncate mb-1.5">{item.authors?.join(', ')}</p>
                    <StarRating rating={item.rating} size={10} className="text-amber-400" />
                  </div>
                </div>
              ))}
            {wishlist.length === 0 && (
              <div className="py-8 text-center">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-2 text-slate-200">
                  <Heart size={24} />
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Library empty</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-auto p-4 bg-slate-50 border-t border-slate-100">
          <button
            onClick={onEnterLibrary}
            className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-lg active:scale-[0.98] text-xs uppercase tracking-widest"
          >
            Enter Library
          </button>
        </div>
      </div>
    </aside>
  );
};
