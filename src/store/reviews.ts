import { create } from 'zustand';
import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs,
  orderBy 
} from 'firebase/firestore';
import { useAuthStore } from './auth';

interface Review {
  id: string;
  movieId: number;
  userId: string;
  rating: number;
  content: string;
  createdAt: Date;
  userName: string;
}

interface ReviewsState {
  reviews: Review[];
  addReview: (movieId: number, rating: number, content: string) => Promise<void>;
  fetchReviews: (movieId: number) => Promise<void>;
  hasUserReviewed: (movieId: number) => boolean;
}

export const useReviewsStore = create<ReviewsState>((set, get) => ({
  reviews: [],
  addReview: async (movieId, rating, content) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    const reviewsRef = collection(db, 'reviews');
    await addDoc(reviewsRef, {
      movieId,
      userId: user.uid,
      userName: user.email?.split('@')[0] || 'Anonymous',
      rating,
      content,
      createdAt: new Date(),
    });
    
    await get().fetchReviews(movieId);
  },
  fetchReviews: async (movieId) => {
    const reviewsRef = collection(db, 'reviews');
    const q = query(
      reviewsRef,
      where('movieId', '==', movieId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const reviews = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    })) as Review[];
    
    set({ reviews });
  },
  hasUserReviewed: (movieId) => {
    const user = useAuthStore.getState().user;
    if (!user) return false;
    
    return get().reviews.some(review => review.userId === user.uid);
  },
}));