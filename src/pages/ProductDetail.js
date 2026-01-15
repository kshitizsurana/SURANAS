import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import ProductCard from '../components/ProductCard';
import { FiHeart, FiShoppingBag, FiCheck, FiTruck, FiShield, FiRefreshCw, FiStar, FiChevronRight, FiChevronLeft, FiLayers, FiInfo } from 'react-icons/fi';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = products.find(p => p.id === id);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [activeTab, setActiveTab] = useState('features');
    const { addToCart, addToWishlist, isInWishlist } = useCart();
    const { success } = useToast();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!product) {
        return (
            <div className="min-h-screen bg-black pt-32 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-5xl font-bold text-white mb-6 tracking-tighter">Selection Missing</h2>
                    <p className="text-gray-500 mb-12 max-w-sm mx-auto">The piece you are looking for may have been moved to our private archives or sold.</p>
                    <Link to="/shop" className="btn-primary px-10 py-4">
                        Explore Open Collection
                    </Link>
                </div>
            </div>
        );
    }

    const relatedProducts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        success(`${quantity} × ${product.name} transitioned to your bag.`);
    };

    const handleBuyNow = () => {
        addToCart(product, quantity);
        navigate('/cart');
    };

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <div className="min-h-screen bg-black pt-32 pb-20 relative overflow-hidden">
            <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-12">
                    <Link to="/" className="hover:text-gold-500 transition-colors">Boutique</Link>
                    <FiChevronRight size={12} className="text-gray-700" />
                    <Link to="/shop" className="hover:text-gold-500 transition-colors">Collection</Link>
                    <FiChevronRight size={12} className="text-gray-700" />
                    <span className="text-gold-500">{product.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
                    <div className="lg:col-span-7 space-y-8">
                        <div className="relative group cursor-crosshair aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-[#0a0a0a] border border-white/5 shadow-2xl">
                            <img
                                src={product.images && product.images.length > 0 ? product.images[selectedImage] : 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2670&auto=format&fit=crop'}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                            />
                            {product.badge && (
                                <div className="absolute top-8 left-8 bg-gold-500 text-black text-[10px] font-bold uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-2xl">
                                    {product.badge}
                                </div>
                            )}
                        </div>

                        {product.images && product.images.length > 1 && (
                            <div className="grid grid-cols-5 gap-4">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-500 ${selectedImage === idx ? 'border-gold-500 shadow-xl shadow-gold-500/10' : 'border-white/5 opacity-50 hover:opacity-100 hover:border-gold-500/30'}`}
                                    >
                                        <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-5 space-y-12">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-gold-500 text-xs font-bold uppercase tracking-[0.3em] font-serif italic">{product.collection}</span>
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <FiStar key={i} size={14} className={i < Math.floor(product.rating) ? 'text-gold-500 fill-gold-500' : 'text-gray-800'} />
                                    ))}
                                </div>
                            </div>

                            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter leading-tight italic font-serif">
                                {product.name}
                            </h1>

                            <p className="text-gray-400 text-xl font-light leading-relaxed">
                                {product.description}
                            </p>

                            <div className="flex items-end gap-6 pt-4">
                                <span className="text-5xl font-bold text-white tracking-tighter">
                                    ₹{product.price.toLocaleString()}
                                </span>
                                {product.originalPrice && (
                                    <div className="flex flex-col mb-1">
                                        <span className="text-xl text-gray-600 line-through tracking-tighter">₹{product.originalPrice.toLocaleString()}</span>
                                        <span className="text-gold-500 text-[10px] font-bold uppercase tracking-widest mt-1">Acquire at {discount}% less</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-[#111] rounded-[2rem] p-10 space-y-8 border border-white/5 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 blur-3xl rounded-full"></div>

                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Select Quantity</span>
                                <div className="flex items-center bg-black/40 border border-white/10 rounded-2xl p-1">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-white hover:text-gold-500 transition-colors"><FiChevronLeft /></button>
                                    <span className="w-12 text-center text-white font-bold">{quantity}</span>
                                    <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="w-10 h-10 flex items-center justify-center text-white hover:text-gold-500 transition-colors"><FiChevronRight /></button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <div className="flex gap-4">
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={product.stock === 0}
                                        className="flex-[2] btn-secondary py-5 text-base font-bold flex items-center justify-center gap-3 group disabled:opacity-30"
                                    >
                                        <FiShoppingBag className="group-hover:-translate-y-1 transition-transform" />
                                        {product.stock === 0 ? 'Vault Empty' : 'Invite to Bag'}
                                    </button>
                                    <button
                                        onClick={() => addToWishlist(product)}
                                        className={`flex-1 flex items-center justify-center rounded-2xl border transition-all duration-500 ${isInWishlist(product.id) ? 'bg-gold-500 text-black border-gold-500' : 'border-white/10 text-gray-400 hover:border-gold-500 hover:text-gold-500'}`}
                                    >
                                        <FiHeart size={24} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                                    </button>
                                </div>
                                <button
                                    onClick={handleBuyNow}
                                    disabled={product.stock === 0}
                                    className="w-full btn-primary py-6 text-xl font-bold tracking-tight shadow-2xl shadow-gold-500/20 disabled:opacity-30 transform hover:scale-[1.02]"
                                >
                                    Acquire Now
                                </button>
                            </div>

                            {product.stock < 5 && product.stock > 0 && (
                                <p className="text-center text-rose-500 text-[10px] font-bold uppercase tracking-widest animate-pulse">Critical: Only {product.stock} units remain in open inventory</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/5">
                            <div className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-black transition-all">
                                    <FiTruck size={20} />
                                </div>
                                <div>
                                    <p className="text-white text-xs font-bold uppercase tracking-widest">Global Passage</p>
                                    <p className="text-gray-500 text-[10px] mt-1">Complimentary & Insured</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-black transition-all">
                                    <FiShield size={20} />
                                </div>
                                <div>
                                    <p className="text-white text-xs font-bold uppercase tracking-widest">Master Integrity</p>
                                    <p className="text-gray-500 text-[10px] mt-1">Bis Hallmark Certified</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-32">
                    <div className="flex justify-center border-b border-white/10 mb-20">
                        {['features', 'specifications', 'heritage'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-12 py-6 text-[10px] font-bold uppercase tracking-[0.3em] transition-all relative ${activeTab === tab ? 'text-white' : 'text-gray-600 hover:text-gray-400'}`}
                            >
                                {tab}
                                {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-gold-500 shadow-[0_0_15px_rgba(212,175,55,0.5)]"></div>}
                            </button>
                        ))}
                    </div>

                    <div className="max-w-4xl mx-auto animate-fade-in">
                        {activeTab === 'features' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {[
                                    { icon: <FiLayers />, title: "Precision Artisanship", desc: "Forged by artisans with over three decades of mastery in traditional smelting and setting." },
                                    { icon: <FiHeart />, title: "Ergonomic Comfort", desc: "Weighted and balanced to ensure absolute comfort throughout the grandest of celebrations." },
                                    { icon: <FiCheck />, title: "Lifetime Polish", desc: "Our commitment to you includes complimentary restoration and polishing for generations." },
                                    { icon: <FiInfo />, title: "Authentic Sourcing", desc: "Every gemstone is ethically unearthed and selected for its unique brilliance and origin." }
                                ].map((feature, i) => (
                                    <div key={i} className="flex gap-6 p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-gold-500/30 transition-all">
                                        <div className="text-gold-500 mt-1">{feature.icon}</div>
                                        <div>
                                            <h4 className="text-white font-bold mb-2">{feature.title}</h4>
                                            <p className="text-gray-500 text-sm font-light leading-relaxed">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'specifications' && (
                            <div className="bg-[#111] rounded-[2.5rem] p-12 md:p-16 border border-white/5 shadow-inner">
                                <div className="space-y-8">
                                    {[
                                        { label: "Material Composition", value: `${product.metal} (${product.purity})` },
                                        { label: "Net Weight", value: `${product.weight} Grams` },
                                        { label: "Stone Calibration", value: "Premium Selection" },
                                        { label: "Design Philosophy", value: product.collection },
                                        { label: "Certification", value: "IGI / GIA Certified Diamonds" }
                                    ].map((spec, i) => (
                                        <div key={i} className="flex justify-between items-center py-4 border-b border-white/5">
                                            <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">{spec.label}</span>
                                            <span className="text-white font-medium text-lg">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'heritage' && (
                            <div className="text-center space-y-8">
                                <div className="w-20 h-20 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto text-gold-500 mb-8 border border-gold-500/20">
                                    <FiShield size={32} />
                                </div>
                                <h3 className="text-4xl font-serif italic text-white tracking-tighter">Fifty Years of Suranas Legacy</h3>
                                <p className="text-gray-400 text-xl font-light leading-relaxed max-w-3xl mx-auto">
                                    This piece is not merely a product; it’s a fragment of our timeline. Founded in 1970, the House of Suranas has catered to royalty and connoisseurs of art. Our signatures are hidden in the intricate filigree and the specific hue of our gold—a secret passed down through generations of the Suranas family.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {relatedProducts.length > 0 && (
                    <div className="pt-32 border-t border-white/5">
                        <div className="flex items-end justify-between mb-16">
                            <div>
                                <span className="text-gold-500 text-[10px] font-bold uppercase tracking-[0.5em] mb-4 block">Refine your look</span>
                                <h2 className="text-5xl font-bold text-white tracking-tighter italic font-serif">You May Also <span className="gradient-text">Cherish</span></h2>
                            </div>
                            <Link to="/shop" className="text-white border-b border-white pb-1 hover:text-gold-500 hover:border-gold-500 transition-all font-bold text-xs uppercase tracking-widest">
                                View Entire Archive
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                            {relatedProducts.map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
