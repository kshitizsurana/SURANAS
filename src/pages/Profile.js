import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { FiUser, FiPhone, FiMapPin, FiEdit2, FiCamera, FiShield, FiPackage, FiHeart, FiSettings, FiBell, FiLogOut, FiChevronRight } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, isAuthenticated, logout, mockMode, updateProfile } = useAuth();
    const { success, error } = useToast();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');

    const [formData, setFormData] = useState({
        name: user?.name || 'Vanya Surana',
        email: user?.email || 'vanya@suranas.com',
        phone: '+91 99887 76655',
        address: 'Villa 14, Royal Greens, Jubilee Hills, Hyderabad - 500033'
    });

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black pt-32 flex flex-col items-center justify-center px-4">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8">
                    <FiUser className="text-gray-600" size={48} />
                </div>
                <h2 className="text-4xl font-bold text-white mb-4 tracking-tighter">Boutique Access Restricted</h2>
                <p className="text-gray-400 mb-10 text-lg font-light">Please authenticate to access your private collection and profile.</p>
                <Link to="/auth" className="btn-primary px-12 py-4">
                    Sign In to Boutique
                </Link>
            </div>
        );
    }

    const handleSave = async () => {
        const result = await updateProfile({
            name: formData.name,
            phone: formData.phone,
            address: formData.address
        });

        if (result.success) {
            setIsEditing(false);
            success('Your credentials have been updated.');
        } else {
            error(result.message || 'Verification failed. Please try again.');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
        success('Successfully logged out from the boutique.');
    }

    return (
        <div className="min-h-screen bg-black pt-32 pb-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12">

                    <div className="lg:w-80 space-y-8">
                        <div className="bg-[#111] border border-white/5 rounded-3xl p-8 shadow-2xl">
                            <div className="relative mb-8 flex flex-col items-center">
                                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gold-500/30 p-1 bg-black">
                                    <img
                                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2000&auto=format&fit=crop"
                                        alt="Profile"
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>
                                <div className="absolute top-20 right-1/4 w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center cursor-pointer border-4 border-black hover:scale-110 transition-transform">
                                    <FiCamera size={14} className="text-black" />
                                </div>
                                <h3 className="text-xl font-bold text-white mt-6 mb-1">{user?.name}</h3>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-gold-500 rounded-full animate-pulse"></div>
                                    <span className="text-gold-500 text-[10px] font-bold uppercase tracking-widest">Platinum Member</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                {[
                                    { id: 'profile', icon: <FiUser />, label: 'Membership Profile' },
                                    { id: 'orders', icon: <FiPackage />, label: 'Order History', link: '/orders' },
                                    { id: 'wishlist', icon: <FiHeart />, label: 'Curated Wishlist', link: '/wishlist' },
                                    { id: 'settings', icon: <FiSettings />, label: 'Boutique Settings' },
                                    { id: 'notifications', icon: <FiBell />, label: 'Privilege Alerts' }
                                ].map((item) => (
                                    item.link ? (
                                        <Link key={item.id} to={item.link} className="w-full flex items-center justify-between p-4 rounded-2xl text-gray-400 hover:bg-white/5 hover:text-white transition-all group">
                                            <div className="flex items-center gap-4">
                                                <span className="text-lg group-hover:text-gold-500 transition-colors">{item.icon}</span>
                                                <span className="font-medium">{item.label}</span>
                                            </div>
                                            <FiChevronRight className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                        </Link>
                                    ) : (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveTab(item.id)}
                                            className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${activeTab === item.id ? 'bg-gold-500/10 text-gold-500' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className="text-lg">{item.icon}</span>
                                                <span className="font-medium">{item.label}</span>
                                            </div>
                                            <FiChevronRight className={`transition-all ${activeTab === item.id ? 'opacity-100' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                                        </button>
                                    )
                                ))}

                                <div className="pt-8 mt-8 border-t border-white/5">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all font-medium"
                                    >
                                        <FiLogOut className="text-lg" />
                                        Sign Out from Boutique
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 space-y-10">

                        {activeTab === 'profile' && (
                            <div className="animate-fade-in space-y-10">
                                <div className="bg-gradient-to-r from-gold-600/20 to-transparent border border-gold-500/20 rounded-[2.5rem] p-10 relative overflow-hidden group">
                                    <div className="relative z-10">
                                        <h2 className="text-4xl font-bold text-white mb-4 tracking-tighter">Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0]}</span>.</h2>
                                        <p className="text-gray-400 max-w-lg font-light leading-relaxed">
                                            As a Platinum Member, you have exclusive early access to our "Royal Wedding" collection and complimentary concierge support.
                                        </p>
                                    </div>
                                    <div className="absolute top-0 right-0 p-20 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="bg-[#111] border border-white/5 rounded-[2.5rem] p-10 md:p-14 shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full"></div>

                                    <div className="flex justify-between items-center mb-12 relative z-10">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-2">Member Credentials</h3>
                                            <p className="text-gray-500 text-sm font-light">Securely manage your personal identification and shipping preferences.</p>
                                        </div>
                                        <button
                                            onClick={() => setIsEditing(!isEditing)}
                                            className={`px-8 py-3 rounded-xl border transition-all flex items-center gap-2 font-medium ${isEditing ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'border-white/10 text-white hover:border-gold-500'}`}
                                        >
                                            {isEditing ? 'Cancel Change' : <><FiEdit2 size={16} /> Update Details</>}
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                                        <div className="space-y-2">
                                            <label className="text-gray-500 text-[10px] font-bold uppercase tracking-widest pl-2">Legal Identity</label>
                                            <div className="relative group">
                                                <FiUser className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 transition-colors group-hover:text-gold-500" />
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    disabled={!isEditing}
                                                    className="w-full bg-black/40 border border-white/5 rounded-2xl pl-16 pr-6 py-5 text-white focus:ring-1 focus:ring-gold-500 transition-all font-medium disabled:opacity-40"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-gray-500 text-[10px] font-bold uppercase tracking-widest pl-2">Monitored Email Address</label>
                                            <div className="relative">
                                                <FiShield className="absolute left-6 top-1/2 -translate-y-1/2 text-green-500" />
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    disabled
                                                    className="w-full bg-black/40 border border-white/5 rounded-2xl pl-16 pr-6 py-5 text-gray-500 cursor-not-allowed font-medium"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-gray-500 text-[10px] font-bold uppercase tracking-widest pl-2">Private Contact</label>
                                            <div className="relative group">
                                                <FiPhone className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-hover:text-gold-500 transition-colors" />
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    disabled={!isEditing}
                                                    className="w-full bg-black/40 border border-white/5 rounded-2xl pl-16 pr-6 py-5 text-white focus:ring-1 focus:ring-gold-500 transition-all font-medium disabled:opacity-40"
                                                />
                                            </div>
                                        </div>

                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-gray-500 text-[10px] font-bold uppercase tracking-widest pl-2">Primary Concierge Address</label>
                                            <div className="relative group">
                                                <FiMapPin className="absolute left-6 top-12 text-gray-600 group-hover:text-gold-500 transition-colors" />
                                                <textarea
                                                    rows="3"
                                                    value={formData.address}
                                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                    disabled={!isEditing}
                                                    className="w-full bg-black/40 border border-white/5 rounded-2xl pl-16 pr-6 py-8 text-white focus:ring-1 focus:ring-gold-500 transition-all font-medium disabled:opacity-40 resize-none"
                                                ></textarea>
                                            </div>
                                        </div>

                                        {isEditing && (
                                            <div className="md:col-span-2 flex justify-end pt-6">
                                                <button
                                                    onClick={handleSave}
                                                    className="btn-primary px-16 py-5 text-xl font-bold tracking-tight shadow-gold-500/20 shadow-2xl"
                                                >
                                                    Securely Save Profile
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab !== 'profile' && (
                            <div className="h-[400px] flex items-center justify-center bg-[#111] rounded-[2.5rem] border border-white/5">
                                <div className="text-center">
                                    <FiSettings className="mx-auto text-gray-700 animate-spin-slow" size={64} />
                                    <h3 className="text-2xl text-white font-bold mt-6">Section Under Encryption</h3>
                                    <p className="text-gray-500 mt-2 font-light">We are enhancing the security for this module. Available shortly.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
