import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LuxuryHero from '../components/LuxuryHero';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { useToast } from '../context/ToastContext';
import heroNecklace from '../assets/images/hero-necklace.png';

import diamondImg from '../assets/images/collections/diamond.png';
import platinumImg from '../assets/images/collections/platinum.png';
import goldImg from '../assets/images/collections/gold.png';
import weddingImg from '../assets/images/collections/wedding.png';
import earringsImg from '../assets/images/collections/earrings-new.jpg';

const Home = () => {
    const { success } = useToast();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const featuredProducts = products.filter(p => p.featured).slice(0, 4);

    const categories = [
        { name: 'Necklaces', image: diamondImg, link: '/shop?category=Necklaces', description: 'Elegant & Timeless' },
        { name: 'Rings', image: platinumImg, link: '/shop?category=Rings', description: 'Symbols of Love' },
        { name: 'Earrings', image: earringsImg, link: '/shop?category=Earrings', description: 'Grace & Beauty' },
        { name: 'Bangles', image: goldImg, link: '/shop?category=Bangles', description: 'Traditional Charm' }
    ];

    return (
        <div className="bg-black text-white min-h-screen">
            <LuxuryHero
                title="Suranas Jewellers"
                subtitle="Exquisite handcrafted jewelry for every occasion"
                ctaText="Shop Now"
                ctaLink="/shop"
            />

            <section className="py-32 px-6 md:px-12 bg-zinc-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black"></div>
                <div className="max-w-[1600px] mx-auto relative z-10">
                    <div className="text-center mb-20">
                        <span className="text-gold-500 tracking-[0.3em] font-semibold uppercase text-xs mb-6 block">Collections</span>
                        <h2 className="text-6xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tight italic">Shop by Category</h2>
                        <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">Explore our exquisite range of handcrafted jewelry collections</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {categories.map((cat, idx) => (
                            <Link
                                to={cat.link}
                                key={idx}
                                className="group relative h-[550px] overflow-hidden rounded-3xl cursor-pointer shadow-2xl border border-white/5 hover:border-gold-500/30 transition-all duration-700"
                            >
                                <div className="absolute inset-0">
                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="w-full h-full object-cover transition-all duration-[1.5s] ease-out group-hover:scale-110 group-hover:brightness-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-700" />
                                </div>
                                <div className="absolute inset-0 flex flex-col justify-end p-8">
                                    <p className="text-gold-400 font-medium uppercase tracking-[0.2em] text-xs mb-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">{cat.description}</p>
                                    <h3 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 tracking-tight italic">{cat.name}</h3>
                                    <div className="h-[3px] w-0 group-hover:w-24 bg-gradient-to-r from-gold-500 to-gold-300 transition-all duration-700 rounded-full"></div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={weddingImg}
                        alt="Wedding Collection"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>

                <div className="relative z-10 text-center max-w-4xl px-6">
                    <span className="text-gold-500 tracking-[0.3em] font-semibold uppercase text-xs mb-6 block">Special Collection</span>
                    <h2 className="text-6xl md:text-8xl font-serif font-bold text-white mb-6 tracking-tight leading-tight">
                        Wedding <span className="gradient-text italic">Collection</span>
                    </h2>
                    <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                        Celebrate your special day with our exclusive bridal jewelry collection
                    </p>
                    <Link to="/shop?collection=Wedding" className="btn-primary text-lg px-12 py-4">
                        View Collection
                    </Link>
                </div>
            </section>

            <section className="py-20 px-6 md:px-12 bg-black">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-16">
                        <div>
                            <span className="text-gold-500 tracking-[0.3em] font-semibold uppercase text-xs mb-4 block">Featured</span>
                            <h2 className="text-5xl md:text-6xl font-serif font-bold text-white tracking-tight italic">Our Best Sellers</h2>
                        </div>
                        <Link to="/shop" className="text-gold-500 hover:text-gold-400 transition-colors font-semibold mt-4 md:mt-0">
                            View All Products →
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 md:px-12 bg-zinc-950">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 tracking-tight italic">Stay Updated</h2>
                    <p className="text-lg text-gray-400 mb-10">
                        Subscribe to our newsletter for exclusive offers and new arrivals
                    </p>
                    <form
                        className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
                        onSubmit={(e) => {
                            e.preventDefault();
                            const email = e.target.email.value;
                            if (email) {
                                success('Thank you for subscribing!');
                                e.target.reset();
                            }
                        }}
                    >
                        <input
                            name="email"
                            required
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-6 py-4 text-white focus:outline-none focus:border-gold-500 transition-all placeholder-gray-500"
                        />
                        <button type="submit" className="btn-primary px-8 py-4">
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Home;
