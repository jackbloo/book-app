import { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { useWishlist } from './hooks/useWishlist';
import { useSearch } from './hooks/useSearch';
import { Header } from './components/Header';
import { MobileMenu } from './components/MobileMenu';
import { SearchResults } from './components/SearchResults';
import { WishlistView } from './components/WishlistView';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { BookVolume } from './services/googleBooks';

export default function App() {
  const [activeTab, setActiveTab] = useState<'search' | 'wishlist'>('search');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { wishlist, addToWishlist, removeFromWishlist, isBookInWishlist } = useWishlist();
  const { searchQuery, setSearchQuery, results, isLoading, clearSearch } = useSearch(300);
  const handleAddToWishlist = async (book: BookVolume) => {
    await addToWishlist(
      book.id,
      book.volumeInfo.title,
      book.volumeInfo.authors || [],
      (book.volumeInfo.imageLinks?.thumbnail || '').replace('http:', 'https:'),
      book.volumeInfo.averageRating || 0,
    );
  };

  return (
    <div className="min-h-screen font-sans flex flex-col bg-[#F1F3F6]">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        wishlistCount={wishlist.length}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onClearSearch={clearSearch}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onClose={() => setIsMobileMenuOpen(false)}
        wishlistCount={wishlist.length}
      />

      <main
        className={cn(
          "flex-1 p-6 grid gap-6 max-w-[1600px] mx-auto w-full transition-all duration-500",
          activeTab === 'search' ? "grid-cols-1 lg:grid-cols-12" : "grid-cols-1"
        )}
      >
        <div
          className={cn(
            "transition-all duration-500 order-2 lg:order-1",
            activeTab === 'search' ? "lg:col-span-8" : "lg:col-span-12"
          )}
        >
          <AnimatePresence mode="wait">
            {activeTab === 'search' ? (
              <SearchResults
                isLoading={isLoading}
                results={results}
                isBookInWishlist={isBookInWishlist}
                onAddToWishlist={handleAddToWishlist}
              />
            ) : (
              <WishlistView
                wishlist={wishlist}
                onRemove={removeFromWishlist}
                onNavigateToSearch={() => setActiveTab('search')}
              />
            )}
          </AnimatePresence>
        </div>

        {activeTab === 'search' && (
          <Sidebar
            wishlist={wishlist}
            onEnterLibrary={() => setActiveTab('wishlist')}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
