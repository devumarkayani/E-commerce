import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./Components/Navbar";
import ErrorBoundary from "./Components/ErrorBoundary";
import Login from "./Login";
import Home from "./Home";
import Product from "./Productcopy";
import About from "./About";
import Contact from "./Contact";
import Cart from "./Cart";
import Register from "./Register";
import Checkout from "./Components/Checkout";
import Admin from "./Components/Admin";
import Chatbot from "./Components/chatbot";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getRole, isLoggedIn } from "./utils/storage";

function App() {
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [role, setRole] = useState(getRole());

  useEffect(() => {
    setLoggedIn(isLoggedIn());
    setRole(getRole());
  }, [location.pathname]);

  return (
    <ErrorBoundary>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        theme="colored"
      />

      {loggedIn && location.pathname !== "/login" && (
        <Navbar role={role} />
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
        >
          <Routes location={location}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/"
              element={
                <Navigate to={loggedIn ? "/home" : "/login"} replace />
              }
            />

            <Route
              path="/home"
              element={
                loggedIn ? <Home /> : <Navigate to="/login" replace />
              }
            />

            <Route
              path="/product"
              element={
                loggedIn ? <Product /> : <Navigate to="/login" replace />
              }
            />

            <Route
              path="/about"
              element={
                loggedIn ? <About /> : <Navigate to="/login" replace />
              }
            />

            <Route
              path="/contact"
              element={
                loggedIn ? <Contact /> : <Navigate to="/login" replace />
              }
            />

            <Route
              path="/cart"
              element={
                loggedIn ? <Cart /> : <Navigate to="/login" replace />
              }
            />

            <Route
              path="/checkout"
              element={
                loggedIn ? <Checkout /> : <Navigate to="/login" replace />
              }
            />

            <Route
              path="/admin"
              element={
                loggedIn && role === "admin" ? (
                  <Admin />
                ) : (
                  <Navigate to="/home" replace />
                )
              }
            />

            <Route
              path="*"
              element={
                <Navigate to={loggedIn ? "/home" : "/login"} replace />
              }
            />
          </Routes>
        </motion.div>
      </AnimatePresence>

      {loggedIn && <Chatbot />}
    </ErrorBoundary>
  );
}

export default App;
