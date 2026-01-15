import React, { useState, useEffect, useRef } from 'react';
import { FiShoppingBag, FiSearch, FiMenu, FiX, FiHeart, FiUser, FiLogOut, FiPhone, FiMapPin, FiCamera, FiLoader } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const LiveRate = ({ label, price }) => {
    const prevPriceRef = useRef(price);
    const [trend, setTrend] = useState('neutral');

    useEffect(() => {
        if (price > prevPriceRef.current) {
            setTrend('up');
        } else if (price < prevPriceRef.current) {
            setTrend('down');
        }
        prevPriceRef.current = price;
    }, [price]);

    return (
        <span className="flex items-center gap-2 transition-all duration-500">
            <span className={`w-1.5 h-1.5 rounded-full ${trend === 'up' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></span>
            <span className="text-gray-400">{label}:</span>
            <span className={`font-medium min-w-[60px] ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                ₹{price.toLocaleString(undefined, { maximumFractionDigits: 0 })}/g
            </span>
        </span>
    );
};

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { cartCount, wishlist } = useCart();
    const { user, isAuthenticated, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [scanning, setScanning] = useState(false);
    const [scannedImage, setScannedImage] = useState(null);

    const [marketData, setMarketData] = useState({ gold: 12500, silver: 245 });

    useEffect(() => {
        const socket = io('http://127.0.0.1:5005');

        socket.on('marketUpdate', (data) => {
            setMarketData(data);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleImageSearchTrigger = () => {
        fileInputRef.current?.click();
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setScannedImage(reader.result);
                setScanning(true);
                setTimeout(() => {
                    setScanning(false);
                    setSearchOpen(false);
                    navigate('/shop', {
                        state: {
                            visualSearch: true,
                            image: reader.result
                        }
                    });
                }, 3500);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Store', path: '/' },
        { name: 'Collections', path: '/collections' },
        { name: 'Rings', path: '/shop?category=Rings' },
        { name: 'Necklaces', path: '/shop?category=Necklaces' },
        { name: 'Earrings', path: '/shop?category=Earrings' },
        { name: 'Bangles', path: '/shop?category=Bangles' },
        { name: 'About', path: '/about' },
    ];

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path) || location.search.includes(path.split('?')[1]);
    };

    const handleLogout = () => {
        logout();
        setUserMenuOpen(false);
        navigate('/');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/shop?search=${searchQuery}`);
            setSearchOpen(false);
            setSearchQuery('');
        }
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out`}>
            <div className={`bg-[#1d1d1f] text-gray-400 py-2 px-6 text-[11px] tracking-wide border-b border-gray-800 transition-all duration-500 ${scrolled ? 'h-0 opacity-0 overflow-hidden py-0' : 'h-auto opacity-100'}`}>
                <div className="max-w-[1400px] mx-auto flex justify-between items-center">
                    <div className="flex gap-6 items-center">
                        <LiveRate label="Gold (22K)" price={marketData.gold} />
                        <span className="hidden sm:inline opacity-20">|</span>
                        <LiveRate label="Silver" price={marketData.silver} />
                    </div>
                    <div className="flex gap-6">
                        <Link to="/stores" className="hover:text-white transition-colors flex items-center gap-1">
                            <FiMapPin size={11} /> Find a Store
                        </Link>
                        <Link to="/contact" className="hover:text-white transition-colors flex items-center gap-1">
                            <FiPhone size={11} /> Contact Us
                        </Link>
                    </div>
                </div>
            </div>

            <nav className={`w-full transition-all duration-500 ${scrolled
                ? 'bg-black/80 backdrop-blur-xl py-3 border-b border-white/10'
                : 'bg-black/40 backdrop-blur-sm py-5'
                }`}>
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="flex items-center justify-between">
                        <div className="flex-shrink-0 mr-12">
                            <Link to="/" className="text-3xl font-suranas text-white hover:opacity-80 transition-opacity">
                                SURANAS
                            </Link>
                        </div>

                        <div className="hidden lg:flex items-center justify-center flex-1 space-x-10">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`text-[13px] tracking-widest uppercase transition-all duration-300 relative group ${isActive(item.path)
                                        ? 'text-white font-semibold'
                                        : 'text-gray-300 hover:text-white'
                                        }`}
                                >
                                    {item.name}
                                    <span className={`absolute -bottom-2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ${isActive(item.path) ? 'scale-x-100' : ''}`}></span>
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center space-x-8">
                            <button
                                className="text-gray-300 hover:text-white transition-colors"
                                onClick={() => setSearchOpen(!searchOpen)}
                            >
                                <FiSearch size={18} />
                            </button>

                            <Link
                                to="/wishlist"
                                className="text-gray-300 hover:text-white transition-colors relative"
                            >
                                <FiHeart size={18} />
                                {wishlist.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-white text-black text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                                        {wishlist.length}
                                    </span>
                                )}
                            </Link>

                            <Link
                                to="/cart"
                                className="text-gray-300 hover:text-white transition-colors relative"
                            >
                                <FiShoppingBag size={18} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-gold-400 to-gold-600 text-black text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            {isAuthenticated ? (
                                <div className="hidden md:block relative group">
                                    <button
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                        className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                                    >
                                        <FiUser size={18} />
                                    </button>

                                    <div className="absolute right-0 top-full pt-4 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        <div className="bg-[#1d1d1f] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
                                            <div className="px-6 py-4 border-b border-gray-800">
                                                <p className="text-sm text-white font-medium">Hello, {user?.name}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">{user?.email}</p>
                                            </div>
                                            <Link to="/profile" className="block px-6 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                                                Profile
                                            </Link>
                                            <Link to="/orders" className="block px-6 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                                                Orders
                                            </Link>
                                            <div className="border-t border-gray-800"></div>
                                            <button onClick={handleLogout} className="w-full text-left px-6 py-3 text-sm text-red-500 hover:bg-gray-800 transition-colors">
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    to="/auth"
                                    className="hidden md:block text-gray-300 hover:text-white transition-colors"
                                >
                                    <FiUser size={18} />
                                </Link>
                            )}

                            <button
                                className="lg:hidden text-white transition-colors"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                            </button>
                        </div>
                    </div>

                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${searchOpen ? 'max-h-24 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
                            <FiSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search 'Diamond Rings' or 'Gold Necklaces'..."
                                className="w-full pl-14 pr-24 py-4 bg-[#1d1d1f] border border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-all shadow-2xl text-lg"
                                autoFocus={searchOpen}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />

                            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex items-center gap-3">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                />
                                <button
                                    type="button"
                                    onClick={handleImageSearchTrigger}
                                    className="text-gold-500 hover:text-white transition-colors tooltip relative group"
                                    title="Search with a photo"
                                >
                                    <FiCamera size={22} />
                                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-medium pointer-events-none">
                                        Visual Search
                                    </span>
                                </button>
                                <div className="w-px h-6 bg-gray-700"></div>
                                <button
                                    type="button"
                                    onClick={() => setSearchOpen(false)}
                                    className="text-gray-500 hover:text-white transition-colors"
                                >
                                    <FiX size={20} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {mobileMenuOpen && (
                    <div className="lg:hidden fixed inset-0 top-[70px] bg-black bg-opacity-95 backdrop-blur-xl z-40 overflow-y-auto animate-fade-in">
                        <div className="px-6 py-8 space-y-6">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className="block text-2xl font-light text-white hover:text-gold-400 border-b border-gray-800 pb-4"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            <div className="pt-8">
                                {isAuthenticated ? (
                                    <>
                                        <div className="text-gray-500 text-sm mb-4 uppercase tracking-wider">Account</div>
                                        <Link to="/profile" className="block text-lg text-gray-300 py-2" onClick={() => setMobileMenuOpen(false)}>My Profile</Link>
                                        <Link to="/orders" className="block text-lg text-gray-300 py-2" onClick={() => setMobileMenuOpen(false)}>My Orders</Link>
                                        <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="block text-lg text-red-500 py-2 mt-4">Log Out</button>
                                    </>
                                ) : (
                                    <Link to="/auth" className="btn-primary w-full text-center block" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {scanning && (
                <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center">
                    <div className="relative w-64 h-64 mb-8">
                        <div className="absolute inset-0 z-20 border-b-2 border-gold-500 animate-scan pointer-events-none box-content h-full"></div>

                        <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-white/20 relative">
                            <img src={scannedImage} alt="Scanning" className="w-full h-full object-cover opacity-50" />
                            <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
                                {[...Array(16)].map((_, i) => (
                                    <div key={i} className="border border-white/10"></div>
                                ))}
                            </div>
                        </div>

                        <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-gold-500 rounded-tl-lg"></div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-gold-500 rounded-tr-lg"></div>
                        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-gold-500 rounded-bl-lg"></div>
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-gold-500 rounded-br-lg"></div>
                    </div>

                    <div className="text-center space-y-4">
                        <h3 className="text-2xl font-bold text-white tracking-widest uppercase">Analyzing Jewelry</h3>
                        <div className="flex items-center justify-center gap-3">
                            <FiLoader className="animate-spin text-gold-500" />
                            <p className="text-gray-400 font-mono text-sm">Identifying patterns &amp; gemstones...</p>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
