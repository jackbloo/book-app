import { useState, useEffect } from 'react';
import axiosInstance from '../lib/axios';

export interface WishlistItem {
  _id: string;
  volumeId: string;
  title: string;
  authors: string[];
  thumbnail: string;
  rating: number;
}

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await axiosInstance.get<WishlistItem[]>('/api/wishlist');
      setWishlist(response.data || []);
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
    }
  };

  const addToWishlist = async (volumeId: string, title: string, authors: string[], thumbnail: string, rating: number) => {
    if (wishlist.some(item => item.volumeId === volumeId)) return;

    try {
      const newItem = {
        volumeId,
        title,
        authors,
        thumbnail,
        rating,
      };
      const response = await axiosInstance.post('/api/wishlist', newItem);
      setWishlist(prev => [...prev, response.data]);
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
    }
  };

  const removeFromWishlist = async (id: string) => {
    try {
      await axiosInstance.delete(`/api/wishlist/${id}`);
      setWishlist(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
    }
  };

  const isBookInWishlist = (volumeId: string) => {
    return wishlist.some(item => item.volumeId === volumeId);
  };

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isBookInWishlist,
    fetchWishlist,
  };
};
