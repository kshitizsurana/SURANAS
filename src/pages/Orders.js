import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FiPackage, FiClock, FiCheckCircle, FiTruck, FiBox, FiChevronRight, FiChevronLeft, FiDownload, FiStar } from 'react-icons/fi';
import { orderAPI } from '../services/api';

const Orders = () => {
    const { user, isAuthenticated, mockMode } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const mockOrders = [
        {
            _id: 'ORD-7782-SURANA-001',
            createdAt: '2024-12-01T10:30:00Z',
            totalPrice: 154999,
            orderStatus: 'Delivered',
            orderItems: [
                {
                    name: 'Royal Kundan Heritage Set',
                    image: 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=2574&auto=format&fit=crop',
                    price: 149999,
                    quantity: 1
                }
            ],
            shippingAddress: {
                address: 'Villa 14, Royal Greens',
                city: 'Hyderabad',
                postalCode: '500033'
            }
        },
        {
            _id: 'ORD-9921-SURANA-002',
            createdAt: '2024-11-15T14:20:00Z',
            totalPrice: 89999,
            orderStatus: 'Processing',
            orderItems: [
                {
                    name: 'Diamond Solitaire Majesty',
                    image: 'https://images.unsplash.com/photo-1605100804763-ebea24b87297?q=80&w=2651&auto=format&fit=crop',
                    price: 89999,
                    quantity: 1
                }
            ],
            shippingAddress: {
                address: 'Villa 14, Royal Greens',
                city: 'Hyderabad',
                postalCode: '500033'
            }
        }
    ];

    useEffect(() => {
        const fetchOrders = async () => {
            if (!isAuthenticated) return setLoading(false);

            setTimeout(() => {
                setOrders(mockOrders);
                setLoading(false);
            }, 800);
        };
        fetchOrders();
    }, [isAuthenticated]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    const getStatusStyle = (status) => {
        const styles = {
            'Processing': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
            'Shipped': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
            'Delivered': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
            'Cancelled': 'bg-rose-500/10 text-rose-500 border-rose-500/20'
        };
        return styles[status] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black pt-32 flex flex-col items-center justify-center px-4">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8">
                    <FiPackage className="text-gray-600" size={48} />
                </div>
                <h2 className="text-4xl font-bold text-white mb-4 tracking-tighter">Your Archives are Private</h2>
                <p className="text-gray-400 mb-10 text-lg font-light text-center">Please sign in to access your acquisition history and tracking details.</p>
                <Link to="/auth" className="btn-primary px-12 py-4">Sign In</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black pt-32 pb-20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 animate-fade-in">
                    <div>
                        <h1 className="text-6xl font-bold text-white tracking-tighter mb-4">Acquisition <span className="gradient-text italic font-serif">History</span></h1>
                        <p className="text-gray-500 text-lg font-light">A timeline of your curated heritage collection.</p>
                    </div>
                    {mockMode && (
                        <div className="bg-gold-500/10 border border-gold-500/30 rounded-full px-6 py-2">
                            <span className="text-gold-500 text-[10px] font-bold uppercase tracking-widest">Privilege Mode Active</span>
                        </div>
                    )}
                </div>

                {loading ? (
                    <div className="py-32 flex flex-col items-center">
                        <div className="w-12 h-12 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-600 font-bold text-[10px] uppercase tracking-[0.5em]">Synchronizing Archives</p>
                    </div>
                ) : (
                    <div className="space-y-12 animate-fade-in-up">
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <div key={order._id} className="bg-[#111] border border-white/5 rounded-[2.5rem] overflow-hidden group hover:border-gold-500/20 transition-all duration-700 shadow-2xl">
                                    <div className="bg-white/[0.02] px-10 py-8 border-b border-white/5">
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                            <div>
                                                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Acquisition Date</p>
                                                <p className="text-white font-medium">{formatDate(order.createdAt)}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Treasury Value</p>
                                                <p className="text-gold-500 font-bold text-lg">₹{order.totalPrice.toLocaleString()}</p>
                                            </div>
                                            <div className="hidden md:block">
                                                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Catalog Reference</p>
                                                <p className="text-white font-mono text-xs">{order._id}</p>
                                            </div>
                                            <div className="flex justify-end items-center gap-4">
                                                <button className="text-gray-400 hover:text-white transition-colors" title="Download Certification">
                                                    <FiDownload size={20} />
                                                </button>
                                                <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${getStatusStyle(order.orderStatus)}`}>
                                                    {order.orderStatus}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-10 space-y-8">
                                        {order.orderItems.map((item, idx) => (
                                            <div key={idx} className="flex flex-col md:flex-row gap-8 items-center group/item">
                                                <div className="w-32 h-32 rounded-[1.5rem] overflow-hidden bg-black border border-white/5 shadow-inner flex-shrink-0">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-700" />
                                                </div>
                                                <div className="flex-1 text-center md:text-left">
                                                    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight italic font-serif group-hover/item:text-gold-500 transition-colors">{item.name}</h3>
                                                    <div className="flex items-center justify-center md:justify-start gap-4">
                                                        <span className="text-gray-500 text-sm font-light uppercase tracking-widest">Qty: {item.quantity}</span>
                                                        <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
                                                        <span className="text-gray-500 text-sm font-light uppercase tracking-widest">₹{item.price.toLocaleString()} per unit</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col md:items-end gap-3">
                                                    <button className="px-8 py-3 rounded-xl border border-white/5 text-white hover:bg-white hover:text-black transition-all text-[10px] font-bold uppercase tracking-widest">
                                                        Request Maintenance
                                                    </button>
                                                    <Link to={`/product/${item._id}`} className="text-gold-500 hover:text-gold-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                                                        Re-acquire Masterpiece <FiChevronRight />
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}

                                        <div className="mt-12 pt-10 border-t border-white/5">
                                            <div className="flex justify-between items-center mb-8">
                                                <h4 className="text-white text-xs font-bold uppercase tracking-widest">Transit Progress</h4>
                                                <span className="text-gold-500 text-[10px] font-bold uppercase tracking-[0.2em]">{order.orderStatus === 'Delivered' ? 'Secured at Residence' : 'In Global Transit'}</span>
                                            </div>
                                            <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <div className={`absolute top-0 left-0 h-full bg-gold-500 transition-all duration-[2s] ${order.orderStatus === 'Delivered' ? 'w-full' : 'w-2/3'}`}></div>
                                            </div>
                                            <div className="grid grid-cols-4 gap-4 mt-4">
                                                {['Secured', 'Crafted', 'In Transit', 'Handed Over'].map((step, i) => (
                                                    <div key={i} className={`text-center space-y-2`}>
                                                        <div className={`w-2 h-2 rounded-full mx-auto ${order.orderStatus === 'Delivered' || i < 2 ? 'bg-gold-500 shadow-[0_0_8px_rgba(212,175,55,0.6)]' : 'bg-gray-800'}`}></div>
                                                        <p className={`text-[8px] uppercase font-bold tracking-[0.2em] ${order.orderStatus === 'Delivered' || i < 2 ? 'text-white' : 'text-gray-800'}`}>{step}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-32 bg-[#111] border border-white/5 rounded-[3rem]">
                                <FiBox className="mx-auto text-gray-700 mb-8" size={80} />
                                <h3 className="text-3xl text-white font-bold mb-4 italic font-serif">Vault Empty</h3>
                                <p className="text-gray-500 mb-12 max-w-sm mx-auto font-light">Your legacy collection awaits its first acquisition. Discover our masterpieces today.</p>
                                <Link to="/shop" className="btn-primary py-4 px-12">Enter Boutique</Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
