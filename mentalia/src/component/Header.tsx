import { Link, NavLink } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import Logo from "../asset/logoMentalia.jpg";
import { useAuth } from "../auth/AuthContext";

const Header = () => {
  const { isAuthenticated, logout, usuario } = useAuth();
  const canViewPacientList = Number(usuario?.id_cargo) === 2;
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `pb-1 transition-colors duration-200 ${
      isActive
        ? "text-cyan-300 underline underline-offset-8 decoration-2 decoration-cyan-300"
        : "text-white hover:text-cyan-200"
    }`;

  return (
    <header className="text-white z-20 h-20 flex items-center justify-between px-12 absolute top-0 left-0 w-full">
      <img src={Logo} className="h-16 w-auto" />
      <nav className="flex items-center gap-8" aria-label="Navegacion principal">
        <NavLink to="/" end className={navLinkClass}>
          Inicio
        </NavLink>
        <NavLink to="/card_dance" className={navLinkClass}>
          Salud Mental
        </NavLink>
        {canViewPacientList && (
          <NavLink to="/pacient_list" className={navLinkClass}>
            Listado de pacientes
          </NavLink>
        )}
        <NavLink to="/technology" className={navLinkClass}>
          Tecnologia
        </NavLink>
        <NavLink to="/contact" className={navLinkClass}>
          Contacto
        </NavLink>

        {isAuthenticated ? (
          <button
            type="button"
            onClick={logout}
            className="flex items-center justify-center w-6 h-6 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
            title="Cerrar sesion"
          >
            <LogOut size={14} />
          </button>
        ) : (
          <Link
            to="/login"
            className="flex items-center justify-center w-6 h-6 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
            title="Iniciar sesion"
          >
            <User size={14} />
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;