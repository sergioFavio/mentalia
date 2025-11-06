import { BrowserRouter, Route, Routes } from "react-router-dom"
//import Layout from "./templates/Layout"
import HomePage from "./pages/HomePage"
import ContactPage from "./pages/ContactPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

import CardDance from "./pages/CardDance2"


import PacientList from "./pages/PacientList"


import TechnologyPage from "./pages/TechnologyPage"

import CardHologramPage from "./pages/CardHologramPage"
import SpreadFxGallery from "./pages/SpreadFxGallery"
import LayoutFooter from "./templates/LayoutFooter"



function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutFooter/>}>
        <Route path="/" element={<HomePage/>}/>

        <Route path="/pacient_list" element={<PacientList/>}/>
        <Route path="/what_we_do" element={<PacientList/>}/>
        <Route path="/technology" element={<TechnologyPage/>}/>

        <Route path="/card_hologram" element={<CardHologramPage/>}/>
        <Route path="/spread_fx_gallery" element={<SpreadFxGallery/>}/>

        <Route path="/contact" element={<ContactPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>

        <Route path="/card_dance" element={<CardDance/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
