import { useState, useEffect, useRef } from 'react';
import { searchBooks, type BookVolume } from '../services/googleBooks';

export const useSearch = (debounceDelay = 500) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<BookVolume[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (!searchQuery.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    debounceTimerRef.current = setTimeout(async () => {
      try {
        const books = await searchBooks(searchQuery);
        setResults(books);
      } catch (error) {
        console.error(error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, debounceDelay);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery, debounceDelay]);

  const clearSearch = () => {
    setSearchQuery('');
    setResults([]);
  };

  return {
    searchQuery,
    setSearchQuery,
    results,
    isLoading,
    clearSearch,
  };
};
