export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 flex flex-col lg:flex-row items-center">
                    {/* Left Content */}
                    <div className="lg:w-1/2 space-y-6">
                        <h1 className="text-5xl font-extrabold leading-tight">
                            Shop the Latest Trends
                        </h1>
                        <p className="text-lg text-gray-200">
                            Discover top-quality products at unbeatable prices. Fashion,
                            gadgets, and more delivered to your door.
                        </p>
                        <div className="flex space-x-4">
                            <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl shadow hover:bg-gray-100 transition">
                                Shop Now
                            </button>
                            <button className="px-6 py-3 border border-white text-white font-semibold rounded-xl hover:bg-white hover:text-indigo-600 transition">
                                Learn More
                            </button>
                        </div>
                    </div>

                    {/* Right Content - Hero Image */}
                    <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
                        <img
                            src="https://images.unsplash.com/photo-1612817159949-195b9c0eb5df?auto=format&fit=crop&w=800&q=80"
                            alt="Ecommerce products"
                            className="rounded-2xl shadow-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Featured Categories */}
            <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    Featured Categories
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { name: "Fashion", img: "https://source.unsplash.com/400x400/?fashion" },
                        { name: "Electronics", img: "https://source.unsplash.com/400x400/?electronics" },
                        { name: "Home Decor", img: "https://source.unsplash.com/400x400/?furniture" },
                        { name: "Sports", img: "https://source.unsplash.com/400x400/?sports" },
                    ].map((cat, idx) => (
                        <div
                            key={idx}
                            className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
                        >
                            <img
                                src={cat.img}
                                alt={cat.name}
                                className="w-full h-56 object-cover transform group-hover:scale-110 transition duration-500"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                <span className="text-white text-xl font-semibold">{cat.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-indigo-600 text-white py-16">
                <div className="max-w-7xl mx-auto text-center space-y-6">
                    <h2 className="text-4xl font-extrabold">Join Our Shopping Community</h2>
                    <p className="text-lg text-gray-200">
                        Sign up today and get exclusive discounts, offers, and early access to sales.
                    </p>
                    <button className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl shadow hover:bg-gray-200 transition">
                        Get Started
                    </button>
                </div>
            </section>
        </div>
    );
}
