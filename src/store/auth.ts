import { create } from 'zustand';
import { auth } from '@/lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null; // Nuevo estado para manejar errores
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null, // Inicializar el error como null
  signIn: async (email, password) => {
    set({ loading: true, error: null }); // Iniciar carga y limpiar errores anteriores
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      set({ error: 'Error al iniciar sesión. Revisa tus credenciales.' });
    } finally {
      set({ loading: false });
    }
  },
  signUp: async (email, password) => {
    set({ loading: true, error: null }); // Iniciar carga y limpiar errores anteriores
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      set({ error: 'Error al crear cuenta. Revisa los datos ingresados.' });
    } finally {
      set({ loading: false });
    }
  },
  signOut: async () => {
    set({ loading: true, error: null }); // Iniciar carga y limpiar errores anteriores
    try {
      await firebaseSignOut(auth);
      set({ user: null });
    } catch (error) {
      set({ error: 'Error al cerrar sesión.' });
    } finally {
      set({ loading: false });
    }
  },
}));

// Setup auth state listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    useAuthStore.setState({ user, loading: false, error: null }); // Si hay un usuario, limpiamos el error
  } else {
    useAuthStore.setState({ user: null, loading: false });
  }
});