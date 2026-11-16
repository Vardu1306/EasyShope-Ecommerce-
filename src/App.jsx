
import React from "react";
import { useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

import AppRoutes from "./routes/AppRoutes";

import ProductProvider from "./context/ProductContext";
import AuthProvider from "./context/AuthContext";
import ScrollToTop from "./components/ScrollToTop";
const AppContent = () => {
  const location = useLocation();

  // Authentication pages
  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-password";

  // Admin pages
  const isAdminPage = location.pathname.startsWith("/admin");

  // Customer layout
  const showCustomerLayout = !isAuthPage && !isAdminPage;

  return (
    <>
        <ScrollToTop />

      {/* Customer Navbar */}
      {showCustomerLayout && <Navbar />}

      {/* Application Routes */}
      <AppRoutes />

      {/* Customer Footer */}
      {showCustomerLayout && <Footer />}

      {/* Back To Top */}
      {showCustomerLayout && <BackToTop />}
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <AppContent />
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
