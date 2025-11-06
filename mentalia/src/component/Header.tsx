import { Link } from "react-router-dom"
import Logo from "../asset/logoMentalia.jpg"

const Header = () => {
  return (
    <header className="text-white z-20 h-20 flex items-center justify-between px-12 absolute top-0 left-0 w-full">
        <img src={Logo} className="h-16 w-auto"/>
        <div className="flex items-center gap-8">
            <Link to="/">Home</Link>
            <Link to="/card_dance">Card Dance</Link>
            <Link to="/pacient_list">Products</Link>
            <Link to="/technology">Tecnología</Link>
            <Link to="/contact">Contact</Link>
            
            {/* Ícono de usuario para inicio/cierre de sesión */}
            <Link 
              to="/login" 
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
              title="Iniciar sesión / Mi cuenta"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-6 h-6"
              >
                <path 
                  fillRule="evenodd" 
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437.695z" 
                  clipRule="evenodd" 
                />
              </svg>
            </Link>
        </div>
    </header>
  )
}

export default Header