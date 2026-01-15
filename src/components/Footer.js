import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter, FiYoutube, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { useToast } from '../context/ToastContext';
import { useState } from 'react';

const Footer = () => {
    const { success } = useToast();
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            success('Welcome to the Suranas Privilege Club.');
            setEmail('');
        }
    };

    const footerSections = [
        {
            title: 'Collections',
            links: [
                { name: 'Heritage Wedding', path: '/shop?collection=Wedding' },
                { name: 'Pure Diamond', path: '/shop?collection=Diamond' },
                { name: 'Royal Gold', path: '/shop?collection=Gold' },
                { name: 'Polki Traditions', path: '/shop?category=Necklaces' },
                { name: 'New Arrivals', path: '/shop' }
            ]
        },
        {
            title: 'Assistance',
            links: [
                { name: 'Customer Care', path: '/contact' },
                { name: 'Shipping Guide', path: '/contact' },
                { name: 'Exchange Policy', path: '/contact' },
                { name: 'Track Order', path: '/orders' },
                { name: 'Store Locator', path: '/stores' }
            ]
        },
        {
            title: 'The House',
            links: [
                { name: 'Our Story', path: '/about' },
                { name: 'Craftsmanship', path: '/about' },
                { name: 'Heritage Blog', path: '/about' },
                { name: 'CSR Initiatives', path: '/about' },
                { name: 'Careers', path: '/contact' }
            ]
        }
    ];

    return (
        <footer className="bg-[#050505] border-t border-white/5 pt-24 pb-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
                    <div className="lg:col-span-2 space-y-8">
                        <Link to="/" className="text-3xl font-luxury tracking-[0.2em] text-white block">
                            SURANAS <span className="text-[10px] block tracking-[0.5em] text-gold-500 mt-1 uppercase font-light">Heritage</span>
                        </Link>
                        <p className="text-gray-500 text-lg font-light leading-relaxed max-w-sm">
                            Defining luxury through half a century of artistry. We don’t just craft jewelry; we create the heirlooms of tomorrow.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-gray-400">
                                <FiMapPin className="text-gold-500" />
                                <span className="text-sm">Bangalore • Delhi • Mumbai • Hyderabad</span>
                            </div>
                            <div className="flex items-center gap-4 text-gray-400">
                                <FiMail className="text-gold-500" />
                                <span className="text-sm">concierge@suranas.com</span>
                            </div>
                        </div>
                    </div>

                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-8">{section.title}</h3>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            to={link.path}
                                            className="text-gray-500 hover:text-gold-500 text-sm font-medium transition-all hover:pl-2"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col lg:flex-row justify-between items-center gap-12 border-t border-white/5 pt-16 mb-16">
                    <div className="w-full lg:max-w-md">
                        <h3 className="text-white text-xl font-bold mb-4 tracking-tight">The Privilege Club</h3>
                        <p className="text-gray-500 mb-6 font-light">Enter the world of Suranas for exclusive collection previews and heritage updates.</p>
                        <form onSubmit={handleSubscribe} className="relative group">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                                className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-gold-500/50 transition-all text-lg font-light group-hover:bg-white/[0.07]"
                            />
                            <button className="absolute right-2 top-2 bottom-2 bg-gold-500 text-black px-8 rounded-xl font-bold hover:bg-gold-400 transition-colors shadow-xl">Join Now</button>
                        </form>
                    </div>

                    <div className="flex gap-6 items-center">
                        <span className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em]">Connect With Us</span>
                        <div className="flex gap-4">
                            {[
                                { icon: <FiInstagram />, name: 'Instagram', link: '#' },
                                { icon: <FiFacebook />, name: 'Facebook', link: '#' },
                                { icon: <FiTwitter />, name: 'Twitter', link: '#' },
                                { icon: <FiYoutube />, name: 'YouTube', link: '#' }
                            ].map((social) => (
                                <a
                                    key={social.name}
                                    href={social.link}
                                    className="w-14 h-14 bg-white/5 hover:bg-gold-500/10 border border-white/5 hover:border-gold-500/30 rounded-full flex items-center justify-center transition-all text-gray-400 hover:text-gold-500 group shadow-2xl"
                                    aria-label={social.name}
                                >
                                    <span className="text-2xl transition-transform group-hover:scale-125">{social.icon}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-12">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex flex-wrap justify-center md:justify-start gap-8">
                            <Link to="/about" className="text-gray-600 hover:text-white text-[10px] uppercase font-bold tracking-widest transition-colors">Privacy Charter</Link>
                            <Link to="/about" className="text-gray-600 hover:text-white text-[10px] uppercase font-bold tracking-widest transition-colors">Digital Ethics</Link>
                            <Link to="/about" className="text-gray-600 hover:text-white text-[10px] uppercase font-bold tracking-widest transition-colors">Global Compliance</Link>
                            <Link to="/about" className="text-gray-600 hover:text-white text-[10px] uppercase font-bold tracking-widest transition-colors">Cookie Management</Link>
                        </div>
                        <p className="text-gray-600 text-[10px] uppercase font-bold tracking-[0.2em]">
                            © 2024 SURANAS HERITAGE PRIVATE LIMITED. ALL RIGHTS RESERVED.
                        </p>
                    </div>

                    <div className="mt-16 text-center">
                        <p className="text-gray-800 text-[8px] uppercase font-bold tracking-[1em] mb-4">Crafted in Bharat for the World</p>
                        <div className="inline-block px-4 py-1 border border-white/5 rounded-full">
                            <span className="text-white/20 text-[8px] font-bold uppercase tracking-[0.5em]">Defining Luxury Since 1970</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
