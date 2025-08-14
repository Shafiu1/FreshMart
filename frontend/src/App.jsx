import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductList from "./components/ProductList";
import CreateProduct from "./components/CreateProduct";
import Cart from "./components/Cart";

function App() {
  const [user, setUser] = useState(() => {
    // Try to get user from localStorage when app loads
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      return null;
    }
  });

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/" element={<h1>Welcome {user ? user.name : "Guest"}</h1>} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
