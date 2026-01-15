import React, { useEffect } from 'react';
import { FiTarget, FiAward, FiUsers, FiHeart, FiShield, FiTrendingUp } from 'react-icons/fi';
import storefrontImage from '../assets/images/suranas-storefront.jpg';

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const values = [
        {
            icon: FiAward,
            title: 'Uncompromised Design',
            description: 'Every piece is a masterpiece, conceptualized by award-winning designers and brought to life by master artisans.'
        },
        {
            icon: FiShield,
            title: 'Certified Purity',
            description: 'We pioneered transparency in the industry. Our gold is BIS Hallmarked, and diamonds are IGI/GIA certified.'
        },
        {
            icon: FiHeart,
            title: 'Customer First',
            description: 'Building relationships that last generations. Our lifetime exchange and buyback policies are a testament to our commitment.'
        }
    ];




    const milestones = [
        { year: '1835', title: 'The Beginning', description: 'Suranas Jewellery was established in the royal city, serving nobility with exquisite craftsmanship.' },
        { year: '1970', title: 'Modern Foundation', description: 'Expanded our legacy with a new flagship store, blending tradition with modern commerce.' },
        { year: '2000', title: 'Innovation', description: 'Introduced modern design techniques while preserving traditional craftsmanship' },
        { year: '2024', title: 'Digital Era', description: 'Launched our online platform to serve customers worldwide' }
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={storefrontImage}
                        alt="Suranas Storefront Est 1835"
                        className="w-full h-full object-cover animate-subtle-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black"></div>
                </div>
                <div className="relative z-10 text-center max-w-5xl px-6 animate-fade-in-up">
                    <span className="text-gold-500 tracking-[0.3em] uppercase font-semibold text-sm mb-6 block">Est. 1835</span>
                    <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8 tracking-tight italic">
                        A Legacy of <span className="gradient-text">Royalty</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light max-w-3xl mx-auto">
                        For nearly two centuries, Suranas has been the jeweler of choice for connoisseurs of art and luxury. From royal courts to modern runways, our heritage is etched in gold.
                    </p>
                </div>
            </section>
            <section className="py-32 px-6 md:px-12 bg-zinc-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black"></div>
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center mb-20">
                        <span className="text-gold-500 tracking-[0.3em] uppercase font-semibold text-xs mb-6 block">Our Story</span>
                        <h2 className="text-5xl md:text-6xl font-serif font-bold mb-8 tracking-tight italic">The Journey of <span className="gradient-text">Excellence</span></h2>
                        <p className="text-xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
                            What started as a royal atelier in 1835 has grown into one of the most trusted names in fine jewelry.
                            Our commitment to quality, authenticity, and customer satisfaction remains unwavering across generations.
                        </p>
                    </div>

                    <div className="relative">
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-gold-500 via-gold-500/50 to-transparent"></div>
                        <div className="space-y-16">
                            {milestones.map((milestone, idx) => (
                                <div key={idx} className={`flex items-center gap-8 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                                    <div className={`flex-1 ${idx % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                        <div className="inline-block bg-zinc-900 border border-white/10 rounded-2xl p-8 hover:border-gold-500/30 transition-all duration-500">
                                            <h3 className="text-3xl font-bold text-gold-500 mb-2">{milestone.year}</h3>
                                            <h4 className="text-2xl font-serif font-bold text-white mb-3">{milestone.title}</h4>
                                            <p className="text-gray-400">{milestone.description}</p>
                                        </div>
                                    </div>
                                    <div className="w-6 h-6 bg-gold-500 rounded-full border-4 border-black shadow-lg shadow-gold-500/50 z-10"></div>
                                    <div className="flex-1"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-32 px-6 md:px-12 bg-black">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="text-gold-500 tracking-[0.3em] uppercase font-semibold text-xs mb-6 block">Our Values</span>
                        <h2 className="text-5xl md:text-6xl font-serif font-bold mb-8 tracking-tight italic">What We <span className="gradient-text">Stand For</span></h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {values.map((value, idx) => (
                            <div key={idx} className="group text-center p-10 rounded-3xl border border-white/5 hover:border-gold-500/30 transition-all duration-700 bg-gradient-to-br from-white/[0.02] to-transparent">
                                <div className="w-24 h-24 mx-auto bg-zinc-900 rounded-full flex items-center justify-center mb-8 group-hover:bg-gold-500/10 transition-all duration-500 group-hover:scale-110">
                                    <value.icon className="text-gold-500 transition-colors" size={40} />
                                </div>
                                <h3 className="text-2xl font-serif font-bold mb-4 text-white group-hover:text-gold-500 transition-colors">{value.title}</h3>
                                <p className="text-gray-400 leading-relaxed font-light">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-[700px] relative overflow-hidden group">
                    <img
                        src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=2574&auto=format&fit=crop"
                        alt="Artisan working"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50"></div>
                </div>
                <div className="flex items-center bg-zinc-950 p-12 md:p-20">
                    <div>
                        <span className="text-gold-500 tracking-[0.3em] uppercase font-semibold text-xs mb-6 block">Craftsmanship</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 italic">The Art of <span className="gradient-text">Making</span></h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-10 font-light">
                            Our workshops are where tradition meets technology. While we employ 3D printing for precision casting,
                            the final finish, the setting of polki, and the intricate enameling are done by hands that have
                            inherited the skill through generations.
                        </p>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="border-l-4 border-gold-500 pl-6">
                                <h4 className="text-4xl font-bold text-white mb-2">50+</h4>
                                <span className="text-gold-500 text-sm font-semibold uppercase tracking-wider">Years of Legacy</span>
                            </div>
                            <div className="border-l-4 border-gold-500 pl-6">
                                <h4 className="text-4xl font-bold text-white mb-2">100k+</h4>
                                <span className="text-gold-500 text-sm font-semibold uppercase tracking-wider">Happy Families</span>
                            </div>
                            <div className="border-l-4 border-gold-500 pl-6">
                                <h4 className="text-4xl font-bold text-white mb-2">5000+</h4>
                                <span className="text-gold-500 text-sm font-semibold uppercase tracking-wider">Unique Designs</span>
                            </div>
                            <div className="border-l-4 border-gold-500 pl-6">
                                <h4 className="text-4xl font-bold text-white mb-2">100%</h4>
                                <span className="text-gold-500 text-sm font-semibold uppercase tracking-wider">Transparency</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>




            <section className="py-32 px-6 md:px-12 bg-zinc-950 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/5 blur-[150px] rounded-full"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="text-8xl text-gold-500 mb-8 font-serif">"</div>
                    <p className="text-3xl md:text-4xl font-serif font-light italic text-white leading-relaxed mb-12">
                        Jewelry is not just adornment; it is an emotion, an investment, and a legacy.
                        We are honored to be a part of your most cherished moments.
                    </p>
                    <div className="flex items-center justify-center gap-6">
                        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent to-gold-500"></div>
                        <div>
                            <cite className="not-italic font-bold text-white block text-2xl font-serif">Mahendra Surana</cite>
                            <span className="text-gold-500 text-sm font-semibold uppercase tracking-wider">Founder & Chairman</span>
                        </div>
                        <div className="w-20 h-0.5 bg-gradient-to-l from-transparent to-gold-500"></div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 bg-black text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 italic">Visit Our <span className="gradient-text">Showroom</span></h2>
                    <p className="text-xl text-gray-400 mb-10 font-light">
                        Experience the beauty of our collections in person. Our experts are ready to help you find the perfect piece.
                    </p>
                    <a href="/contact" className="btn-primary text-lg px-12 py-4 inline-block">
                        Get in Touch
                    </a>
                </div>
            </section>
        </div>
    );
};

export default About;
