// src/pages/ProductList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get("http://localhost:3001/api/products");
                setProducts(data);
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch products");
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Product List</h1>
            {products.length === 0 ? (
                <p>No products found</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded"
                            />
                            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
                            <p className="text-gray-600">{product.description}</p>
                            <p className="text-green-600 font-bold mt-1">${product.price}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;
