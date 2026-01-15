import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi';

const Wishlist = () => {
    const { wishlist, addToCart, addToWishlist } = useCart();

    const handleMoveAllToCart = () => {
        wishlist.forEach(product => {
            addToCart(product, 1);
        });
        wishlist.forEach(product => {
            addToWishlist(product);
        });
    };

    if (wishlist.length === 0) {
        return (
            <div className="min-h-screen bg-black pt-32 flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <div className="relative inline-block mb-8">
                        <div className="absolute inset-0 bg-rosegold-500 rounded-full blur-3xl opacity-20"></div>
                        <FiHeart className="relative text-gray-600 mx-auto" size={100} />
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-4">Your Wishlist is Empty</h2>
                    <p className="text-gray-400 mb-8 text-lg">
                        Save your favorite pieces and never lose track of what you love
                    </p>
                    <Link to="/shop" className="btn-primary inline-block">
                        Discover Our Collection
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black pt-32 pb-20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[20%] left-[10%] w-[600px] h-[600px] bg-rosegold-500/5 rounded-full blur-[120px] animate-pulse-slow"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="mb-16">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8 border-b border-white/10 pb-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 flex items-center gap-4">
                                My <span className="font-serif italic text-gold-500">Wishlist</span>
                            </h1>
                            <p className="text-gray-400 text-lg">
                                {wishlist.length} {wishlist.length === 1 ? 'heirloom' : 'heirlooms'} you're dreaming of
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={handleMoveAllToCart}
                                className="btn-primary flex items-center gap-2 px-8"
                            >
                                <FiShoppingCart size={18} />
                                Move All to Bag
                            </button>
                        </div>
                    </div>

                    <div className="bg-[#111] border border-white/5 rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-3 gap-8 hover-3d-card">
                        <div className="text-center sm:text-left border-b sm:border-b-0 sm:border-r border-white/10 pb-4 sm:pb-0">
                            <p className="text-gray-500 text-sm uppercase tracking-widest mb-2">Total Items</p>
                            <p className="text-3xl font-bold text-white">{wishlist.length}</p>
                        </div>
                        <div className="text-center sm:text-left border-b sm:border-b-0 sm:border-r border-white/10 pb-4 sm:pb-0">
                            <p className="text-gray-500 text-sm uppercase tracking-widest mb-2">Total Value</p>
                            <p className="text-3xl font-bold gradient-text">
                                ₹{wishlist.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
                            </p>
                        </div>
                        <div className="text-center sm:text-left">
                            <p className="text-gray-500 text-sm uppercase tracking-widest mb-2">Potential Savings</p>
                            <p className="text-3xl font-bold text-green-400">
                                ₹{wishlist.reduce((sum, item) => sum + (item.originalPrice ? item.originalPrice - item.price : 0), 0).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {wishlist.map((product) => (
                        <div key={product.id} className="animate-fade-in-up group relative bg-[#111] border border-white/5 rounded-3xl overflow-hidden hover:border-gold-500/30 transition-all duration-500 flex flex-col sm:flex-row shadow-lg hover:shadow-2xl hover:shadow-gold-500/10 h-full">

                            <div className="w-full sm:w-48 lg:w-56 relative overflow-hidden flex-shrink-0">
                                <div className="absolute inset-0 bg-gray-800 animate-pulse"></div>
                                <img
                                    src={product.images && product.images[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 relative z-10"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent sm:bg-gradient-to-r z-20"></div>
                            </div>

                            <div className="p-6 flex flex-col justify-between flex-1 relative z-30">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="text-gold-500 text-xs tracking-[0.2em] uppercase font-medium">{product.collection}</p>
                                            <h3 className="text-xl font-bold text-white mt-1 group-hover:text-gold-200 transition-colors">
                                                <Link to={`/product/${product.id}`}>{product.name}</Link>
                                            </h3>
                                        </div>
                                        <button
                                            onClick={() => addToWishlist(product)}
                                            className="text-gray-500 hover:text-red-500 transition-colors p-2 -mr-2"
                                            title="Remove from Wishlist"
                                        >
                                            <FiTrash2 size={18} />
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs text-gray-400 my-4 border-y border-white/5 py-3">
                                        <div className="flex items-center gap-1">
                                            <span className="text-gray-500">Metal:</span>
                                            <span className="text-white">{product.metal}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-gray-500">Purity:</span>
                                            <span className="text-white">{product.purity}</span>
                                        </div>
                                        {product.weight && (
                                            <div className="flex items-center gap-1">
                                                <span className="text-gray-500">Weight:</span>
                                                <span className="text-white">{product.weight}</span>
                                            </div>
                                        )}
                                    </div>

                                    <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed mb-4">
                                        {product.description}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between mt-auto pt-4">
                                    <div className="flex flex-col">
                                        {product.originalPrice && (
                                            <span className="text-gray-500 text-xs line-through">₹{product.originalPrice.toLocaleString()}</span>
                                        )}
                                        <span className="text-2xl font-bold text-white">₹{product.price.toLocaleString()}</span>
                                    </div>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gold-500 transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2"
                                    >
                                        <FiShoppingCart size={16} />
                                        Add to Bag
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 relative overflow-hidden rounded-[3rem] text-center p-12 md:p-20">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#222] to-[#1a1a1a]"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-[80px]"></div>

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-serif">
                            Undecided on your <span className="text-gold-500">Choice?</span>
                        </h2>
                        <p className="text-gray-400 text-xl mb-10 leading-relaxed font-light">
                            Our jewelry consultants can provide a virtual walkthrough or schedule a private viewing at our boutique.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link to="/contact" className="btn-primary px-10 py-4">
                                Book Consultation
                            </Link>
                            <Link to="/stores" className="px-10 py-4 border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300 font-medium">
                                Find a Boutique
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
