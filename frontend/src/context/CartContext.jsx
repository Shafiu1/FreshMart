import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Load cart from backend on first render
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return; // user not logged in

                const res = await axios.get("http://localhost:3001/api/cart", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCartItems(res.data.items || []);
            } catch (err) {
                console.error("Error fetching cart:", err);
            }
        };

        fetchCart();
    }, []);

    // Add item to cart
    const addToCart = async (product) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(
                "http://localhost:3001/api/cart",
                {
                    product: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCartItems(res.data.items);
        } catch (err) {
            console.error("Error adding to cart:", err);
        }
    };

    // Remove product from cart
    const removeFromCart = async (itemId) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.delete(`http://localhost:3001/api/cart/${itemId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCartItems(res.data.items);
        } catch (err) {
            console.error("Error removing from cart:", err);
        }
    };

    // Clear entire cart
    const clearCart = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.delete("http://localhost:3001/api/cart", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCartItems(res.data.items);
        } catch (err) {
            console.error("Error clearing cart:", err);
        }
    };

    // Update quantity of an item
    const updateQuantity = async (itemId, newQty) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.put(
                `http://localhost:3001/api/cart/${itemId}`,
                { quantity: newQty },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCartItems(res.data.items);
        } catch (err) {
            console.error("Error updating quantity:", err);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                setCartItems,
                addToCart,
                removeFromCart,
                clearCart,
                updateQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
