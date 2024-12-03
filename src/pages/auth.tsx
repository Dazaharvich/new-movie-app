import { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup, // Importar signInWithPopup para Google
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null); // Para manejar errores
  const [loading, setLoading] = useState(false); // Para mostrar el estado de carga
  const navigate = useNavigate(); // Para redireccionar después de iniciar sesión


  // Función para manejar el submit
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true); // Empieza la carga
    setError(null); // Resetea el error

    // Obtener valores de los campos de email y password
    const email = (event.target as HTMLFormElement).email.value;
    const password = (event.target as HTMLFormElement).password.value;

    // Validación básica de los campos
    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // Lógica de inicio de sesión
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Lógica de registro
        await createUserWithEmailAndPassword(auth, email, password);
      }
      // Redireccionar al usuario a la página principal después de iniciar sesión o registrarse
      navigate("/home");
    } catch (err) {
      setError(
        "Error al iniciar sesión o registrarse. Revisa tus credenciales."
      );
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

    // Función para manejar el inicio de sesión con Google
    const handleGoogleSignIn = async () => {
      setLoading(true);
      setError(null);

      try {
        await signInWithPopup(auth, googleProvider);
        // Redireccionar al usuario a la página principal después de iniciar sesión con Google
        navigate("/home");
      } catch (err) {
        setError("Error al iniciar sesión con Google. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-cyan-700">
          {isLogin ? "Sign In" : "Create Account"}
        </h2>

        {/* Mensaje de error para el usuario */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}


        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            className={`w-full rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Cargando..." : isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        {/* Botón de inicio de sesión con Google */}
        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-400"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Sign in with Google"}
          </button>
        </div>


        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-primary hover:underline"
          >
            {isLogin
              ? "Need an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
