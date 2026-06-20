import { Link } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import Logo from "../asset/logoMentalia.jpg";
import { useAuth } from "../auth/AuthContext";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="text-white z-20 h-20 flex items-center justify-between px-12 absolute top-0 left-0 w-full">
      <img src={Logo} className="h-16 w-auto" />
      <div className="flex items-center gap-8">
        <Link to="/">Home</Link>
        <Link to="/card_dance">Card Dance</Link>
        <Link to="/pacient_list">Products</Link>
        <Link to="/technology">Tecnología</Link>
        <Link to="/contact">Contact</Link>

        {isAuthenticated ? (
          <button
            type="button"
            onClick={logout}
            className="flex items-center justify-center w-7 h-7 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
            title="Cerrar sesión"
          >
            <LogOut size={16} />
          </button>
        ) : (
          <Link
            to="/login"
            className="flex items-center justify-center w-7 h-7 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
            title="Iniciar sesión"
          >
            <User size={16} />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
