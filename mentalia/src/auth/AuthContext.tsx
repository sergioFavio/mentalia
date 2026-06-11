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

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const storedUsuario = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!storedUsuario) return;

    try {
      setUsuario(JSON.parse(storedUsuario) as Usuario);
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      usuario,
      isAuthenticated: Boolean(usuario),
      login: (usuarioLogueado) => {
        const { clave: _clave, ...usuarioSeguro } = usuarioLogueado as Usuario & {
          clave?: string;
        };

        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(usuarioSeguro));
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
