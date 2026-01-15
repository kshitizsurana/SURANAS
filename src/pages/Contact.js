import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for contacting us. We will get back to you shortly!');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-black pt-32 pb-20">
            <div className="text-center mb-16 px-4">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Get in Touch</h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Have a question about our collections or need a custom design? We're here to help you craft your perfect moment.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="space-y-12">
                        <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 backdrop-blur-sm">
                            <h2 className="text-2xl font-bold text-white mb-8">Contact Information</h2>
                            <div className="space-y-8">
                                <div className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500/20 transition-colors">
                                        <FiPhone className="text-white group-hover:text-gold-500 transition-colors" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Call Us</p>
                                        <p className="text-white text-lg font-medium">+91 1800-123-4567</p>
                                        <p className="text-gray-400 text-sm">Mon - Sat, 10am - 7pm</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500/20 transition-colors">
                                        <FiMail className="text-white group-hover:text-gold-500 transition-colors" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Email Us</p>
                                        <p className="text-white text-lg font-medium">support@suranas.com</p>
                                        <p className="text-gray-400 text-sm">We reply within 24 hours</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500/20 transition-colors">
                                        <FiMapPin className="text-white group-hover:text-gold-500 transition-colors" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Flagship Store</p>
                                        <p className="text-white text-lg font-medium">Suranas Heritage</p>
                                        <p className="text-gray-400 text-sm">
                                            123, Gold Souk, Richmond Road,<br />
                                            Bangalore, Karnataka - 560025
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="h-64 rounded-2xl overflow-hidden bg-gray-800 relative group cursor-pointer">
                            <img
                                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2674&auto=format&fit=crop"
                                alt="Map Location"
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <button className="btn-secondary bg-black/50 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-black">
                                    View on Google Maps
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-8 lg:p-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a Message</h2>
                        <p className="text-gray-600 mb-8">We'd love to hear from you. Fill out the form below.</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-600 text-sm font-medium mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 outline-none transition-all"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-600 text-sm font-medium mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 outline-none transition-all"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-600 text-sm font-medium mb-2">Subject</label>
                                <select
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 outline-none transition-all bg-white"
                                    value={formData.subject}
                                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                >
                                    <option value="">Select a topic</option>
                                    <option value="inquiry">Product Inquiry</option>
                                    <option value="custom">Custom Design Request</option>
                                    <option value="appointment">Book Appointment</option>
                                    <option value="support">Order Support</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-600 text-sm font-medium mb-2">Message</label>
                                <textarea
                                    required
                                    rows="5"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 outline-none transition-all resize-none"
                                    placeholder="How can we help you?"
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                            </div>

                            <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">
                                <FiSend />
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
                <div className="text-center mb-16">
                    <span className="text-gold-500 tracking-[0.3em] uppercase font-semibold text-xs mb-4 block">Visit Us</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 tracking-tight">
                        Our <span className="gradient-text italic">Boutiques</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Experience luxury in person at our exclusive boutiques across India
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="group bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 hover:border-gold-500/30 transition-all duration-500">
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop"
                                alt="Suranas Bangalore Boutique"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="text-2xl font-serif font-bold text-white mb-1">Bangalore Heritage</h3>
                                <p className="text-gold-500 text-sm font-semibold uppercase tracking-wider">Flagship Store</p>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-start gap-3 mb-4">
                                <FiMapPin className="text-gold-500 mt-1 flex-shrink-0" size={18} />
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    123, Gold Souk, Richmond Road,<br />
                                    Bangalore, Karnataka - 560025
                                </p>
                            </div>
                            <div className="flex items-center gap-3 mb-4">
                                <FiPhone className="text-gold-500 flex-shrink-0" size={18} />
                                <p className="text-gray-300 text-sm">+91 80 1234 5678</p>
                            </div>
                            <button className="w-full btn-secondary text-sm py-2 hover:bg-gold-500 hover:text-black transition-all">
                                Get Directions
                            </button>
                        </div>
                    </div>

                    <div className="group bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 hover:border-gold-500/30 transition-all duration-500">
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1200&auto=format&fit=crop"
                                alt="Suranas Mumbai Boutique"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="text-2xl font-serif font-bold text-white mb-1">Mumbai Luxury</h3>
                                <p className="text-gold-500 text-sm font-semibold uppercase tracking-wider">Premium Store</p>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-start gap-3 mb-4">
                                <FiMapPin className="text-gold-500 mt-1 flex-shrink-0" size={18} />
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    456, Zaveri Bazaar, Kalbadevi,<br />
                                    Mumbai, Maharashtra - 400002
                                </p>
                            </div>
                            <div className="flex items-center gap-3 mb-4">
                                <FiPhone className="text-gold-500 flex-shrink-0" size={18} />
                                <p className="text-gray-300 text-sm">+91 22 2345 6789</p>
                            </div>
                            <button className="w-full btn-secondary text-sm py-2 hover:bg-gold-500 hover:text-black transition-all">
                                Get Directions
                            </button>
                        </div>
                    </div>

                    <div className="group bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 hover:border-gold-500/30 transition-all duration-500">
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1200&auto=format&fit=crop"
                                alt="Suranas Delhi Boutique"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="text-2xl font-serif font-bold text-white mb-1">Delhi Elegance</h3>
                                <p className="text-gold-500 text-sm font-semibold uppercase tracking-wider">Luxury Store</p>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-start gap-3 mb-4">
                                <FiMapPin className="text-gold-500 mt-1 flex-shrink-0" size={18} />
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    789, Chandni Chowk, Dariba Kalan,<br />
                                    New Delhi, Delhi - 110006
                                </p>
                            </div>
                            <div className="flex items-center gap-3 mb-4">
                                <FiPhone className="text-gold-500 flex-shrink-0" size={18} />
                                <p className="text-gray-300 text-sm">+91 11 3456 7890</p>
                            </div>
                            <button className="w-full btn-secondary text-sm py-2 hover:bg-gold-500 hover:text-black transition-all">
                                Get Directions
                            </button>
                        </div>
                    </div>

                    <div className="group bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 hover:border-gold-500/30 transition-all duration-500">
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=1200&auto=format&fit=crop"
                                alt="Suranas Hyderabad Boutique"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="text-2xl font-serif font-bold text-white mb-1">Hyderabad Royal</h3>
                                <p className="text-gold-500 text-sm font-semibold uppercase tracking-wider">Heritage Store</p>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-start gap-3 mb-4">
                                <FiMapPin className="text-gold-500 mt-1 flex-shrink-0" size={18} />
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    321, Abids Road, Koti,<br />
                                    Hyderabad, Telangana - 500001
                                </p>
                            </div>
                            <div className="flex items-center gap-3 mb-4">
                                <FiPhone className="text-gold-500 flex-shrink-0" size={18} />
                                <p className="text-gray-300 text-sm">+91 40 4567 8901</p>
                            </div>
                            <button className="w-full btn-secondary text-sm py-2 hover:bg-gold-500 hover:text-black transition-all">
                                Get Directions
                            </button>
                        </div>
                    </div>

                    <div className="group bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 hover:border-gold-500/30 transition-all duration-500">
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=1200&auto=format&fit=crop"
                                alt="Suranas Chennai Boutique"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="text-2xl font-serif font-bold text-white mb-1">Chennai Classic</h3>
                                <p className="text-gold-500 text-sm font-semibold uppercase tracking-wider">Traditional Store</p>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-start gap-3 mb-4">
                                <FiMapPin className="text-gold-500 mt-1 flex-shrink-0" size={18} />
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    654, T. Nagar, Usman Road,<br />
                                    Chennai, Tamil Nadu - 600017
                                </p>
                            </div>
                            <div className="flex items-center gap-3 mb-4">
                                <FiPhone className="text-gold-500 flex-shrink-0" size={18} />
                                <p className="text-gray-300 text-sm">+91 44 5678 9012</p>
                            </div>
                            <button className="w-full btn-secondary text-sm py-2 hover:bg-gold-500 hover:text-black transition-all">
                                Get Directions
                            </button>
                        </div>
                    </div>

                    <div className="group bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 hover:border-gold-500/30 transition-all duration-500">
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop"
                                alt="Suranas Kolkata Boutique"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="text-2xl font-serif font-bold text-white mb-1">Kolkata Heritage</h3>
                                <p className="text-gold-500 text-sm font-semibold uppercase tracking-wider">Classic Store</p>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-start gap-3 mb-4">
                                <FiMapPin className="text-gold-500 mt-1 flex-shrink-0" size={18} />
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    987, Bowbazar Street, Central Kolkata,<br />
                                    Kolkata, West Bengal - 700012
                                </p>
                            </div>
                            <div className="flex items-center gap-3 mb-4">
                                <FiPhone className="text-gold-500 flex-shrink-0" size={18} />
                                <p className="text-gray-300 text-sm">+91 33 6789 0123</p>
                            </div>
                            <button className="w-full btn-secondary text-sm py-2 hover:bg-gold-500 hover:text-black transition-all">
                                Get Directions
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-16 bg-zinc-900 rounded-2xl p-8 border border-white/5 text-center">
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
            </div>
        </div>
    );
};

export default Contact;
