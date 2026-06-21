import type { ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
//import Layout from "./templates/Layout"
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import CardDance from "./pages/CardDance2";

import PacientList from "./pages/PacientList";

import TechnologyPage from "./pages/TechnologyPage";

import CardHologramPage from "./pages/CardHologramPage";
import SpreadFxGallery from "./pages/SpreadFxGallery";
import LayoutFooter from "./templates/LayoutFooter";
import { AuthProvider, useAuth } from "./auth/AuthContext";

function ProtectedRoute({
  children,
  requiredCargoId,
}: {
  children: ReactNode;
  requiredCargoId?: number;
}) {
  const { isAuthenticated, usuario } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredCargoId && Number(usuario?.id_cargo) !== requiredCargoId) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutFooter />}>
            <Route path="/" element={<HomePage />} />

            <Route
              path="/pacient_list"
              element={
                <ProtectedRoute requiredCargoId={2}>
                  <PacientList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/what_we_do"
              element={
                <ProtectedRoute requiredCargoId={2}>
                  <PacientList />
                </ProtectedRoute>
              }
            />
            <Route path="/technology" element={<TechnologyPage />} />

            <Route path="/card_hologram" element={<CardHologramPage />} />
            <Route path="/spread_fx_gallery" element={<SpreadFxGallery />} />

            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/card_dance" element={<CardDance />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;