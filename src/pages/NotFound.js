import React from 'react';
import { Link } from 'react-router-dom';
import { FiBox } from 'react-icons/fi';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="text-center relative z-10 animate-fade-in">
                <div className="w-32 h-32 bg-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-12 border border-white/5 rotate-12 hover:rotate-0 transition-transform duration-700">
                    <FiBox className="text-gray-600" size={60} />
                </div>
                <h1 className="text-[10rem] font-bold text-white leading-none tracking-tighter opacity-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">404</h1>
                <h2 className="text-6xl font-bold text-white mb-6 tracking-tighter italic font-serif">Selection <span className="gradient-text">Lost</span></h2>
                <p className="text-gray-500 text-xl font-light mb-12 max-w-md mx-auto">
                    The archival path you are seeking does not exist. It may have been relocated or removed from our digital catalog.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link to="/shop" className="btn-primary px-12 py-4">
                        Explore Collection
                    </Link>
                    <Link to="/" className="px-12 py-4 border border-white/10 rounded-full text-white hover:bg-white hover:text-black transition-all font-bold text-xs uppercase tracking-widest">
                        Return to Boutique
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
