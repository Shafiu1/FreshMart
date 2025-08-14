import React from "react";
import { useCart } from "../context/CartContext";

export default function Cart() {
    const { cartItems, removeFromCart, clearCart } = useCart();

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
                                    <p>Quantity: {item.quantity}</p>
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

                    <button
                        onClick={clearCart}
                        className="mt-6 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded"
                    >
                        Clear Cart
                    </button>
                </>
            )}
        </div>
    );
}
