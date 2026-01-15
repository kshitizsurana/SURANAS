import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiChevronRight, FiLock, FiShield, FiTruck } from 'react-icons/fi';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
    const navigate = useNavigate();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-black pt-32 flex items-center justify-center px-4 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="text-center relative z-10 animate-fade-in-up">
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/5">
                        <FiShoppingBag className="text-gray-600" size={48} />
                    </div>
                    <h2 className="text-5xl font-bold text-white mb-4 tracking-tighter">Boutique Bag Empty</h2>
                    <p className="text-gray-500 mb-12 max-w-sm mx-auto font-light lg:text-lg italic">
                        The finest jewelry awaits your selection. Start curating your personal heritage collection.
                    </p>
                    <Link to="/shop" className="btn-primary px-12 py-4 shadow-2xl shadow-gold-500/20">
                        Explore Masterpieces
                    </Link>
                </div>
            </div>
        );
    }

    const shippingCost = cartTotal > 50000 ? 0 : 500;
    const tax = cartTotal * 0.03;
    const total = cartTotal + shippingCost + tax;

    return (
        <div className="min-h-screen bg-black pt-32 pb-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-[150px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="mb-16 animate-fade-in">
                    <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-4">Masterpiece <span className="gradient-text italic font-serif">Bag</span></h1>
                    <div className="flex items-center gap-4">
                        <span className="text-gold-500 font-bold uppercase tracking-widest text-xs">{cartItems.length} SELECTIONS</span>
                        <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
                        <span className="text-gray-500 text-xs font-medium uppercase tracking-widest">Complimentary Insurance Included</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8 space-y-10 animate-fade-in-up">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="group relative flex flex-col md:flex-row gap-10 items-center bg-[#111] p-8 md:p-10 rounded-[2.5rem] border border-white/5 hover:border-gold-500/20 transition-all duration-700 shadow-2xl"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <Link to={`/product/${item.id}`} className="w-full md:w-56 h-56 rounded-[2rem] overflow-hidden bg-black border border-white/5 shadow-inner">
                                    <img
                                        src={item.images?.[0]}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-125"
                                    />
                                </Link>

                                <div className="flex-1 flex flex-col justify-between w-full">
                                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                                        <div className="space-y-2">
                                            <span className="text-gold-500 text-[10px] font-bold uppercase tracking-[0.3em] italic font-serif">{item.collection}</span>
                                            <Link to={`/product/${item.id}`} className="text-3xl font-bold text-white block hover:text-gold-500 transition-colors tracking-tight">
                                                {item.name}
                                            </Link>
                                            <p className="text-gray-500 text-sm font-light mt-1 uppercase tracking-widest">{item.category} • {item.metal} ({item.purity})</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-3xl font-bold text-white tracking-tighter">₹{(item.price * item.quantity).toLocaleString()}</p>
                                            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-1">Acquisition Price</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 mt-10 pt-10 border-t border-white/5">
                                        <div className="flex items-center bg-black/50 border border-white/10 rounded-2xl p-1 shadow-inner">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-gold-500 transition-colors"
                                            >
                                                <FiMinus size={18} />
                                            </button>
                                            <span className="w-12 text-center text-white font-bold text-lg">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-gold-500 transition-colors"
                                            >
                                                <FiPlus size={18} />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="flex items-center gap-2 text-gray-600 hover:text-rose-500 transition-all text-[10px] font-bold uppercase tracking-widest group/btn"
                                        >
                                            <div className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center group-hover/btn:border-rose-500 transition-colors">
                                                <FiTrash2 size={16} />
                                            </div>
                                            Remove from Selection
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                        <div className="bg-[#111] border border-white/10 rounded-[3rem] p-10 md:p-12 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 blur-3xl rounded-full opacity-50"></div>

                            <h2 className="text-2xl font-bold text-white mb-10 tracking-tight relative z-10">Consolidated Summary</h2>

                            <div className="space-y-6 mb-10 relative z-10">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Base Value</span>
                                    <span className="text-white font-medium text-lg">₹{cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Logistics Passage</span>
                                        {shippingCost === 0 && <span className="text-[10px] text-gold-500 font-bold tracking-widest uppercase mt-1">Privilege Access</span>}
                                    </div>
                                    <span className="text-white font-medium text-lg">
                                        {shippingCost === 0 ? 'Complimentary' : `₹${shippingCost.toLocaleString()}`}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center pb-8 border-b border-white/5">
                                    <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Regulatory GST (3%)</span>
                                    <span className="text-white font-medium text-lg">₹{tax.toLocaleString()}</span>
                                </div>

                                <div className="pt-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-gray-400 text-sm font-bold uppercase tracking-widest">Total Investment</span>
                                        <div className="text-right">
                                            <span className="text-5xl font-bold text-gold-500 tracking-tighter shadow-gold-500/50">₹{total.toLocaleString()}</span>
                                            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-1 italic">Inclusive of all taxes</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 relative z-10">
                                <button
                                    onClick={() => navigate('/checkout')}
                                    className="w-full btn-primary py-6 text-xl font-bold tracking-tighter shadow-2xl shadow-gold-500/20 transform hover:scale-[1.02] flex items-center justify-center gap-3 transition-all"
                                >
                                    Proceed to Checkout <FiChevronRight />
                                </button>
                                <Link to="/shop" className="block w-full text-center text-gray-500 hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest py-3 hover:tracking-[0.2em]">
                                    Refine Your Collection
                                </Link>
                            </div>

                            <div className="mt-12 pt-8 border-t border-white/5 space-y-6">
                                <div className="flex items-center gap-4 text-gray-500 group/item">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold-500 group-hover/item:bg-gold-500 group-hover/item:text-black transition-all">
                                        <FiLock size={16} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-white uppercase tracking-widest">Vault Shield</p>
                                        <p className="text-[8px] uppercase tracking-widest font-medium">Boutique Standard Encryption</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-gray-500 group/item">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold-500 group-hover/item:bg-gold-500 group-hover/item:text-black transition-all">
                                        <FiShield size={16} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-white uppercase tracking-widest">Authenticity Trust</p>
                                        <p className="text-[8px] uppercase tracking-widest font-medium">Verified by Suranas Heritage</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
