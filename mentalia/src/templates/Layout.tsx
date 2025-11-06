import { Outlet } from "react-router-dom"
import Header from "../component/Header"


const Layout = () => {
    return (
        <div className="w-screen h-screen overflow-hidden flex relative">
          <Header/>
            <Outlet/>
        </div>
      )
}

export default Layout