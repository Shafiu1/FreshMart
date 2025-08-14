import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

function ProductList() {
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/products")
            .then((res) => setProducts(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-4 bg-gray-50 min-h-30">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="group bg-white rounded-md shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out overflow-hidden flex flex-col"
                        style={{ maxWidth: "220px" }}
                    >
                        <img
                            src={
                                product.image?.startsWith("http")
                                    ? product.image
                                    : "/images/" + product.image
                            }
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="p-3 flex flex-col flex-grow">
                            <h3 className="text-md font-semibold mb-1 text-gray-900">
                                {product.name}
                            </h3>
                            <p className="text-xs text-gray-600 mb-1 italic">
                                Category: {product.category || "No category"}
                            </p>
                            <p className="text-sm text-gray-700 flex-grow truncate">
                                {product.description}
                            </p>
                            <p className="mt-3 font-bold text-blue-600 text-lg">
                                ${product.price}
                            </p>

                            {/* Buttons stacked */}
                            <div className="mt-3 flex flex-col gap-2">
                                {/* View Details (only visible on hover) */}
                                <button
                                    onClick={() => setSelectedProduct(product)}
                                    className="bg-gray-800 text-white text-xs py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    View Details
                                </button>

                                {/* Add to Cart */}
                                <button onClick={() => addToCart(product)}  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 rounded transition text-sm">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                            onClick={() => setSelectedProduct(null)}
                        >
                            ✕
                        </button>
                        <h2 className="text-xl font-bold mb-2">{selectedProduct.name}</h2>
                        <img
                            src={
                                selectedProduct.image?.startsWith("http")
                                    ? selectedProduct.image
                                    : "/images/" + selectedProduct.image
                            }
                            alt={selectedProduct.name}
                            className="w-full h-48 object-cover rounded mb-3"
                        />
                        <p className="text-sm text-gray-700 mb-3">
                            {selectedProduct.description}
                        </p>
                        <p className="font-bold text-blue-600 text-lg">
                            ${selectedProduct.price}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductList;
