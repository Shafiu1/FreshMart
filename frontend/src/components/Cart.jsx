import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

export default function Cart() {
    const { cartItems, setCartItems, removeFromCart, clearCart } = useCart();
    const [subtotal, setSubtotal] = useState(0);

    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setSubtotal(total);
    }, [cartItems]);

    const updateQuantity = async (itemId, newQty) => {
        if (newQty < 1) return;

        try {
            const token = localStorage.getItem("token");
            const res = await axios.put(
                `http://localhost:3001/api/cart/${itemId}`,
                { quantity: newQty },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCartItems(res.data.items);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">🛒 My Cart</h2>

            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    <ul className="space-y-4">
                        {cartItems.map((item) => (
                            <li
                                key={item._id}
                                className="flex justify-between items-center bg-white shadow p-3 rounded"
                            >
                                <div>
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p>Price: ${item.price}</p>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                            className="px-2 py-1 bg-gray-300 rounded"
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                            className="px-2 py-1 bg-gray-300 rounded"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item._id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Order Summary */}
                    <div className="mt-6 p-4 bg-gray-100 rounded shadow">
                        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                        <p>Subtotal: ${subtotal.toFixed(2)}</p>
                        <p>Tax (10%): ${(subtotal * 0.1).toFixed(2)}</p>
                        <p className="font-bold text-lg">
                            Total: ${(subtotal * 1.1).toFixed(2)}
                        </p>
                    </div>

                    <div className="flex justify-between mt-6">
                        <button
                            onClick={clearCart}
                            className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded"
                        >
                            Clear Cart
                        </button>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
