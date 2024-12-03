import { create } from 'zustand';
import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  query, 
  where, 
  getDocs,
  doc 
} from 'firebase/firestore';
import { useAuthStore } from './auth';

interface WatchlistMovie {
  id: string;
  movieId: number;
  userId: string;
  addedAt: Date;
}

interface MoviesState {
  watchlist: WatchlistMovie[];
  addToWatchlist: (movieId: number) => Promise<void>;
  removeFromWatchlist: (movieId: number) => Promise<void>;
  fetchWatchlist: () => Promise<void>;
  isInWatchlist: (movieId: number) => boolean;
}

export const useMoviesStore = create<MoviesState>((set, get) => ({
  watchlist: [],
  addToWatchlist: async (movieId) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    const watchlistRef = collection(db, 'watchlist');
    await addDoc(watchlistRef, {
      movieId,
      userId: user.uid,
      addedAt: new Date(),
    });
    
    await get().fetchWatchlist();
  },
  removeFromWatchlist: async (movieId) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    const watchlistRef = collection(db, 'watchlist');
    const q = query(
      watchlistRef,
      where('userId', '==', user.uid),
      where('movieId', '==', movieId)
    );
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (document) => {
      await deleteDoc(doc(db, 'watchlist', document.id));
    });
    
    await get().fetchWatchlist();
  },
  fetchWatchlist: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    const watchlistRef = collection(db, 'watchlist');
    const q = query(watchlistRef, where('userId', '==', user.uid));
    const querySnapshot = await getDocs(q);
    
    const watchlist = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      addedAt: doc.data().addedAt.toDate(),
    })) as WatchlistMovie[];
    
    set({ watchlist });
  },
  isInWatchlist: (movieId) => {
    return get().watchlist.some(item => item.movieId === movieId);
  },
}));