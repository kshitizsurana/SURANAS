import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';

const HeroSection = ({ title, subtitle, image, videoSrc, foregroundImage, ctaText, ctaLink, darkText = false }) => {
    const heroRef = useRef(null);
    const [scrollY, setScrollY] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isMuted, setIsMuted] = useState(true);

    const handleMouseMove = (e) => {
        if (window.matchMedia("(hover: none)").matches) return;

        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        setMousePos({
            x: (clientX - centerX) / centerX,
            y: (clientY - centerY) / centerY
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const currentRef = heroRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    const parallaxOffset = scrollY * 0.5;
    const imageScale = 1 + (scrollY * 0.0002);
    const imageRotate = scrollY * 0.02;

    return (
        <section
            ref={heroRef}
            onMouseMove={handleMouseMove}
            className="hero-section relative overflow-hidden"
            style={{ marginTop: '0', paddingTop: '0' }}
        >
            <div
                className="absolute inset-0 transition-transform duration-300"
                style={{
                    transform: `translateY(${parallaxOffset}px) scale(${imageScale})`,
                    transformOrigin: 'center center'
                }}
            >
                {videoSrc && (
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{
                            filter: 'brightness(0.7) contrast(1.1) saturate(1.2)',
                        }}
                    >
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                )}
                {!videoSrc && (
                    <img
                        src={image}
                        alt={title}
                        className="hero-image animate-subtle-zoom opacity-50"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-gold-900/10 via-transparent to-transparent"></div>
            </div>

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-float-jewelry"
                        style={{
                            left: `${(i * 15) + 10}%`,
                            top: `${(i * 12) + 5}%`,
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: `${8 + (i * 2)}s`
                        }}
                    >
                        <div
                            className="w-2 h-2 bg-gold-500 rounded-full opacity-60"
                            style={{
                                boxShadow: '0 0 20px rgba(214, 171, 75, 0.8), 0 0 40px rgba(214, 171, 75, 0.4)',
                                animation: `pulse ${2 + (i * 0.3)}s ease-in-out infinite`
                            }}
                        ></div>
                    </div>
                ))}
            </div>

            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        background: 'linear-gradient(45deg, transparent 30%, rgba(214, 171, 75, 0.1) 50%, transparent 70%)',
                        backgroundSize: '200% 200%',
                        animation: 'shimmer 8s ease-in-out infinite'
                    }}
                ></div>
            </div>

            <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-32">
                <div className="max-w-[1400px] w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    <div className="text-center md:text-left order-2 md:order-1 reveal active relative z-20">
                        {videoSrc ? (
                            <div className="relative inline-block mb-6">
                                <div className="relative bg-black p-4 rounded-xl overflow-hidden isolation-auto">
                                    <h1
                                        className="text-5xl sm:text-6xl md:text-8xl font-bold text-white relative z-10 font-luxury tracking-tight"
                                        style={{ mixBlendMode: 'normal' }}
                                    >
                                        {title}
                                    </h1>
                                    <div className="absolute inset-0 z-20 mix-blend-multiply pointer-events-none">
                                        <video
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="w-full h-full object-cover opacity-100"
                                            style={{ filter: 'brightness(1.5) contrast(1.2)' }}
                                        >
                                            <source src={videoSrc} type="video/mp4" />
                                        </video>
                                    </div>
                                </div>
                                <div className="absolute -inset-4 bg-gold-500/20 blur-2xl -z-10 rounded-full opacity-50"></div>
                            </div>
                        ) : (
                            <h1
                                className={`text-5xl sm:text-6xl md:text-8xl font-bold mb-6 ${darkText ? 'text-gray-900' : 'text-white'
                                    } animate-fade-in-up leading-tight`}
                                style={{
                                    textShadow: darkText ? 'none' : '0 2px 20px rgba(0,0,0,0.5)',
                                    letterSpacing: '-0.02em'
                                }}
                            >
                                {title}
                            </h1>
                        )}
                        <p
                            className={`text-xl sm:text-2xl md:text-3xl mb-12 font-light ${darkText ? 'text-gray-700' : 'text-gray-300'
                                } animate-fade-in-up max-w-xl mx-auto md:mx-0`}
                            style={{
                                animationDelay: '0.2s',
                                textShadow: darkText ? 'none' : '0 1px 10px rgba(0,0,0,0.3)'
                            }}
                        >
                            {subtitle}
                        </p>
                        <div
                            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center animate-fade-in-up"
                            style={{ animationDelay: '0.4s' }}
                        >
                            <Link to={ctaLink} className="btn-primary text-lg px-10 py-4 transform hover:scale-105 transition-transform">
                                {ctaText}
                            </Link>
                            <Link to="/collections" className="btn-secondary text-lg px-10 py-4 transform hover:scale-105 transition-transform backdrop-blur-sm border-white/30 hover:bg-white/10">
                                Explore Collections
                            </Link>
                        </div>
                    </div>

                    <div className="relative order-1 md:order-2 h-[50vh] md:h-[80vh] flex items-center justify-center perspective-1000">
                        {foregroundImage && (
                            <img
                                src={foregroundImage}
                                alt="Featured Jewelry"
                                className="w-[90%] md:w-full max-w-3xl object-contain drop-shadow-2xl"
                                style={{
                                    transform: `
                                        translateY(${scrollY * -0.1}px) 
                                        rotateY(${scrollY * 0.05 - 10 + (mousePos.x * 5)}deg) 
                                        rotateX(${10 - (mousePos.y * 5)}deg)
                                        translateX(${mousePos.x * -20}px)
                                    `,
                                    filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.6))',
                                    mixBlendMode: 'normal',
                                    zIndex: 20,
                                    transition: 'transform 0.1s ease-out'
                                }}
                            />
                        )}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gold-500/20 blur-[100px] rounded-full -z-10 pointer-events-none"></div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
                <div className="flex flex-col items-center">
                    <span className={`text-sm mb-2 ${darkText ? 'text-gray-700' : 'text-gray-400'}`}>
                        Scroll to explore
                    </span>
                    <svg
                        className={`w-6 h-6 ${darkText ? 'text-gray-700' : 'text-gold-500'}`}
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
        </section>
    );
};

export default HeroSection;
