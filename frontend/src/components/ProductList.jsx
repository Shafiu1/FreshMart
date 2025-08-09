import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/products")
            .then((res) => setProducts(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 bg-gray-50 min-h-30">
            {products.map((product) => (
                <div
                    key={product._id}
                    className="bg-white rounded-md shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
                    style={{ maxWidth: "220px" }} // control card width
                >
                    <img
                        src={
                            product.image?.startsWith("http")
                                ? product.image
                                : "/images/" + product.image // corrected relative path
                        }
                        alt={product.name}
                        className="w-full h-full object-cover" // smaller fixed height image
                    />
                    <div className="p-3 flex flex-col flex-grow">
                        <h3 className="text-md font-semibold mb-1 text-gray-900">{product.name}</h3>
                        <p className="text-xs text-gray-600 mb-1 italic">
                            Category: {product.category || "No category"}
                        </p>
                        <p className="text-sm text-gray-700 flex-grow truncate">{product.description}</p>
                        <p className="mt-3 font-bold text-blue-600 text-lg">${product.price}</p>
                        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 rounded transition text-sm">
                            Add to Cart
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductList;
