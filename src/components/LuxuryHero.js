import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import heroBg from '../assets/images/home-hero-bg.png';

const LuxuryHero = ({ title, subtitle, ctaText, ctaLink, foregroundImage }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [scrollY, setScrollY] = useState(0);

    const backgroundImages = [heroBg];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const parallaxOffset = scrollY * 0.5;

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
            <div className="absolute inset-0">
                {backgroundImages.map((img, index) => (
                    <div
                        key={index}
                        className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
                        style={{
                            opacity: currentImageIndex === index ? 1 : 0,
                            transform: `translateY(${parallaxOffset}px) scale(1.1)`,
                        }}
                    >
                        <img
                            src={img}
                            alt="Luxury Jewelry"
                            className="w-full h-full object-cover"
                            style={{
                                filter: 'brightness(0.6) contrast(1.1)',
                            }}
                        />
                    </div>
                ))}

                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60"></div>

                <div className="absolute inset-0 bg-gradient-to-t from-gold-900/20 via-transparent to-transparent"></div>
            </div>

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-float-jewelry"
                        style={{
                            left: `${(i * 7) + 5}%`,
                            top: `${(i * 6) + 10}%`,
                            animationDelay: `${i * 0.4}s`,
                            animationDuration: `${10 + (i * 1.5)}s`
                        }}
                    >
                        <div
                            className="w-1.5 h-1.5 bg-gold-400 rounded-full opacity-70"
                            style={{
                                boxShadow: '0 0 15px rgba(251, 191, 36, 0.8), 0 0 30px rgba(251, 191, 36, 0.4)',
                                animation: `pulse ${2 + (i * 0.2)}s ease-in-out infinite`
                            }}
                        ></div>
                    </div>
                ))}
            </div>

            <div className={`relative z-10 w-full px-6 sm:px-8 lg:px-12 pt-32 pb-20 ${foregroundImage ? 'max-w-[1400px] grid grid-cols-1 md:grid-cols-2 gap-12 items-center' : 'max-w-5xl mx-auto'}`}>

                <div className={`${foregroundImage ? 'text-center md:text-left order-2 md:order-1' : 'text-center'}`}>
                    <div className="mb-8">
                        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold text-white mb-4 tracking-tight leading-none">
                            <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                                Suranas
                            </span>
                            <br />
                            <span
                                className="inline-block gradient-text animate-fade-in-up italic"
                                style={{
                                    animationDelay: '0.3s',
                                    background: 'linear-gradient(135deg, #D4AF37 0%, #F4E5C3 50%, #D4AF37 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}
                            >
                                Jewellers
                            </span>
                        </h1>

                        <div className={`flex items-center gap-4 mt-6 ${foregroundImage ? 'justify-center md:justify-start' : 'justify-center'}`}>
                            <div className="h-[2px] w-16 bg-gradient-to-r from-gold-500 to-gold-300"></div>
                            <div className="w-2 h-2 bg-gold-500 rounded-full animate-pulse"></div>
                            <div className="h-[2px] w-16 bg-gradient-to-l from-gold-500 to-gold-300"></div>
                        </div>
                    </div>

                    <p
                        className={`text-xl sm:text-2xl md:text-3xl mb-12 font-light text-gray-200 animate-fade-in-up leading-relaxed ${foregroundImage ? 'max-w-xl mx-auto md:mx-0' : 'max-w-3xl mx-auto'}`}
                        style={{
                            animationDelay: '0.5s',
                            textShadow: '0 2px 20px rgba(0,0,0,0.5)'
                        }}
                    >
                        {subtitle}
                    </p>

                    <div
                        className={`flex flex-col sm:flex-row gap-4 items-center animate-fade-in-up ${foregroundImage ? 'justify-center md:justify-start' : 'justify-center'}`}
                        style={{ animationDelay: '0.7s' }}
                    >
                        <Link
                            to={ctaLink}
                            className="btn-primary text-lg px-12 py-5 transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-gold-500/30"
                        >
                            {ctaText}
                        </Link>
                        <Link
                            to="/collections"
                            className="btn-secondary text-lg px-12 py-5 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm border-white/30 hover:bg-white/10"
                        >
                            Explore Collections
                        </Link>
                    </div>
                </div>

                {foregroundImage && (
                    <div className="relative order-1 md:order-2 h-[50vh] md:h-[80vh] flex items-center justify-center perspective-1000">
                        <img
                            src={foregroundImage}
                            alt="Featured Jewelry"
                            className="w-[90%] md:w-full max-w-3xl object-contain drop-shadow-2xl animate-float-slow"
                            style={{
                                filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.7)) drop-shadow(0 0 40px rgba(212, 175, 55, 0.3))',
                                animation: 'float-slow 6s ease-in-out infinite'
                            }}
                        />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gold-500/20 blur-[120px] rounded-full -z-10 pointer-events-none animate-pulse"></div>
                    </div>
                )}
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
                <div className="flex flex-col items-center">
                    <span className="text-sm mb-2 text-gray-400 font-light tracking-wider">
                        Scroll to explore
                    </span>
                    <svg
                        className="w-6 h-6 text-gold-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                </div>
            </div>

            <style jsx>{`
                @keyframes float-slow {
                    0%, 100% {
                        transform: translateY(0px) rotateY(-5deg);
                    }
                    50% {
                        transform: translateY(-20px) rotateY(5deg);
                    }
                }
            `}</style>
        </section>
    );
};

export default LuxuryHero;
