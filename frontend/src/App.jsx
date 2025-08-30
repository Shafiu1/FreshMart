import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductList from "./components/ProductList";
import CreateProduct from "./components/CreateProduct";
import Cart from "./components/Cart";
import Home from "./components/Home"; // new landing page

function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage when app starts
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
    }
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Protected route wrapper
  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/products" element={<ProductList />} />

        {/* Protected Routes */}
        <Route
          path="/create-product"
          element={
            <PrivateRoute>
              <CreateProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
