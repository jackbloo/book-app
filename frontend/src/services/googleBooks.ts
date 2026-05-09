import axios from 'axios';

const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
export interface BookVolume {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    averageRating?: number;
    ratingsCount?: number;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    previewLink?: string;
  };
}

export interface SearchResponse {
  items?: BookVolume[];
  totalItems: number;
}

export async function searchBooks(query: string): Promise<BookVolume[]> {
  if (!query) return [];
  const response = await axios.get<SearchResponse>(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${API_KEY}`);
  return response.data.items || [];
}
