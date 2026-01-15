import React, { useState } from 'react';
import { FiMapPin, FiPhone, FiClock, FiNavigation, FiSearch } from 'react-icons/fi';

const StoreLocator = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCity, setSelectedCity] = useState('All');

    const stores = [
        {
            id: 1,
            name: "Bangalore Heritage",
            city: "Bangalore",
            address: "123, Gold Souk, Richmond Road, Bangalore, Karnataka - 560025",
            phone: "+91 80 1234 5678",
            hours: "Mon-Sat: 10:00 AM - 7:00 PM",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
            location: "Flagship Store"
        },
        {
            id: 2,
            name: "Mumbai Luxury",
            city: "Mumbai",
            address: "456, Zaveri Bazaar, Kalbadevi, Mumbai, Maharashtra - 400002",
            phone: "+91 22 2345 6789",
            hours: "Mon-Sat: 10:00 AM - 7:00 PM",
            image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1200&auto=format&fit=crop",
            location: "Premium Store"
        },
        {
            id: 3,
            name: "Delhi Elegance",
            city: "Delhi",
            address: "789, Chandni Chowk, Dariba Kalan, New Delhi, Delhi - 110006",
            phone: "+91 11 3456 7890",
            hours: "Mon-Sat: 10:00 AM - 7:00 PM",
            image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1200&auto=format&fit=crop",
            location: "Luxury Store"
        },
        {
            id: 4,
            name: "Hyderabad Royal",
            city: "Hyderabad",
            address: "321, Abids Road, Koti, Hyderabad, Telangana - 500001",
            phone: "+91 40 4567 8901",
            hours: "Mon-Sat: 10:00 AM - 7:00 PM",
            image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=1200&auto=format&fit=crop",
            location: "Heritage Store"
        },
        {
            id: 5,
            name: "Chennai Classic",
            city: "Chennai",
            address: "654, T. Nagar, Usman Road, Chennai, Tamil Nadu - 600017",
            phone: "+91 44 5678 9012",
            hours: "Mon-Sat: 10:00 AM - 7:00 PM",
            image: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=1200&auto=format&fit=crop",
            location: "Traditional Store"
        },
        {
            id: 6,
            name: "Kolkata Heritage",
            city: "Kolkata",
            address: "987, Bowbazar Street, Central Kolkata, Kolkata, West Bengal - 700012",
            phone: "+91 33 6789 0123",
            hours: "Mon-Sat: 10:00 AM - 7:00 PM",
            image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop",
            location: "Classic Store"
        }
    ];

    const cities = ['All', ...new Set(stores.map(store => store.city))];

    const filteredStores = stores.filter(store => {
        const matchesCity = selectedCity === 'All' || store.city === selectedCity;
        const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
            store.city.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCity && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-black pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-gold-500 tracking-[0.3em] uppercase font-semibold text-xs mb-4 block">Visit Us</span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tight">
                        Find a <span className="gradient-text italic">Store</span>
                    </h1>
                    <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
                        Experience luxury in person at our exclusive boutiques across India. Each showroom is designed to provide a premium jewelry shopping experience.
                    </p>
                </div>

                <div className="bg-zinc-900 border border-white/5 rounded-2xl p-8 mb-16">
                    <div className="flex flex-col lg:flex-row gap-6 items-center">
                        <div className="relative flex-1 w-full">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                            <input
                                type="text"
                                placeholder="Search by city, area, or boutique name..."
                                className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all placeholder-gray-600"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-3 flex-wrap justify-center lg:justify-start">
                            {cities.map(city => (
                                <button
                                    key={city}
                                    onClick={() => setSelectedCity(city)}
                                    className={`px-6 py-3 rounded-xl border-2 whitespace-nowrap transition-all duration-300 text-sm font-semibold ${selectedCity === city
                                        ? 'bg-gold-500 text-black border-gold-500'
                                        : 'border-white/10 text-gray-400 hover:border-gold-500/30 hover:text-white'
                                        }`}
                                >
                                    {city}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {filteredStores.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredStores.map((store) => (
                                <div
                                    key={store.id}
                                    className="group bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 hover:border-gold-500/30 transition-all duration-500"
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={store.image}
                                            alt={store.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h3 className="text-2xl font-serif font-bold text-white mb-1">{store.name}</h3>
                                            <p className="text-gold-500 text-sm font-semibold uppercase tracking-wider">{store.location}</p>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-start gap-3 mb-4">
                                            <FiMapPin className="text-gold-500 mt-1 flex-shrink-0" size={18} />
                                            <p className="text-gray-300 text-sm leading-relaxed">
                                                {store.address}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <FiPhone className="text-gold-500 flex-shrink-0" size={18} />
                                            <p className="text-gray-300 text-sm">{store.phone}</p>
                                        </div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <FiClock className="text-gold-500 flex-shrink-0" size={18} />
                                            <p className="text-gray-300 text-sm">{store.hours}</p>
                                        </div>
                                        <div className="flex gap-3">
                                            <button className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-white hover:bg-white hover:text-black transition-all font-medium text-sm flex items-center justify-center gap-2">
                                                <FiPhone size={16} /> Call
                                            </button>
                                            <button className="flex-1 btn-primary py-3 text-sm flex items-center justify-center gap-2">
                                                <FiNavigation size={16} /> Directions
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-20 bg-zinc-900 rounded-2xl p-8 border border-white/5 text-center">
                            <h3 className="text-2xl font-serif font-bold text-white mb-6">Store Hours</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                                <div>
                                    <p className="text-gold-500 font-semibold mb-2">Monday - Saturday</p>
                                    <p className="text-gray-300">10:00 AM - 7:00 PM</p>
                                </div>
                                <div>
                                    <p className="text-gold-500 font-semibold mb-2">Sunday</p>
                                    <p className="text-gray-300">11:00 AM - 6:00 PM</p>
                                </div>
                                <div>
                                    <p className="text-gold-500 font-semibold mb-2">Public Holidays</p>
                                    <p className="text-gray-300">By Appointment</p>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-20 bg-zinc-900 rounded-2xl border border-white/5">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FiMapPin className="text-gray-600" size={40} />
                        </div>
                        <h3 className="text-2xl text-white font-bold mb-3">No boutiques found</h3>
                        <p className="text-gray-500 max-w-sm mx-auto mb-6">
                            Try searching for another city or view all boutiques.
                        </p>
                        <button
                            onClick={() => { setSearchQuery(''); setSelectedCity('All'); }}
                            className="btn-primary px-8 py-3"
                        >
                            View All Boutiques
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StoreLocator;
