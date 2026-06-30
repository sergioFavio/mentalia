import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface Usuario {
  id_usuario: number;
  nombre_completo: string;
  apellido_completo: string;
  correo: string;
  sexo: string;
  fecha_nacimiento: string;
  id_cargo: number;
  run: string;
}

interface AuthContextValue {
  usuario: Usuario | null;
  isAuthenticated: boolean;
  login: (usuario: Usuario) => void;
  logout: () => void;
}

const AUTH_STORAGE_KEY = "mentalia_usuario";
const AUTH_TTL_MS = 8 * 60 * 60 * 1000;

interface StoredAuth {
  usuario: Usuario;
  expiresAt: number;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function sanitizeUsuario(usuario: Usuario & { clave?: string }) {
  const { clave: _clave, ...usuarioSeguro } = usuario;
  return usuarioSeguro;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const storedUsuario = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!storedUsuario) return;

    try {
      const storedAuth = JSON.parse(storedUsuario) as StoredAuth | Usuario;

      if ("expiresAt" in storedAuth) {
        if (Date.now() > storedAuth.expiresAt) {
          localStorage.removeItem(AUTH_STORAGE_KEY);
          return;
        }

        setUsuario(storedAuth.usuario);
        return;
      }

      setUsuario(storedAuth as Usuario);
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      usuario,
      isAuthenticated: Boolean(usuario),
      login: (usuarioLogueado) => {
        const usuarioSeguro = sanitizeUsuario(usuarioLogueado);
        const storedAuth: StoredAuth = {
          usuario: usuarioSeguro,
          expiresAt: Date.now() + AUTH_TTL_MS,
        };

        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(storedAuth));
        setUsuario(usuarioSeguro);
      },
      logout: () => {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        setUsuario(null);
      },
    }),
    [usuario]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return context;
}
