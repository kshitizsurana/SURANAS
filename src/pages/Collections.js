import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

import weddingImg from '../assets/images/collections/wedding.png';
import diamondImg from '../assets/images/collections/diamond.png';
import goldImg from '../assets/images/collections/gold.png';
import platinumImg from '../assets/images/collections/platinum.png';
import templeImg from '../assets/images/collections/temple.png';
import polkiImg from '../assets/images/collections/polki.png';

const collectionsList = [
    {
        name: 'Wedding Collection',
        image: weddingImg,
        description: 'Heritage pieces for your special day.',
        link: '/shop?collection=Wedding%20Collection'
    },
    {
        name: 'Diamond Collection',
        image: diamondImg,
        description: 'Eternally brilliant solitaire and studded designs.',
        link: '/shop?collection=Diamond%20Collection'
    },
    {
        name: 'Gold Collection',
        image: goldImg,
        description: 'Pure 22K gold craftsmanship.',
        link: '/shop?collection=Gold%20Collection'
    },
    {
        name: 'Platinum Collection',
        image: platinumImg,
        description: 'Rare details for the modern connoisseur.',
        link: '/shop?collection=Platinum%20Collection'
    },
    {
        name: 'Temple Jewellery',
        image: templeImg,
        description: 'Divine motifs inspired by ancient traditions.',
        link: '/shop?collection=Temple%20Jewellery'
    },
    {
        name: 'Polki Collection',
        image: polkiImg,
        description: 'Uncut diamonds set in traditional grandeur.',
        link: '/shop?collection=Polki%20Collection'
    }
];

const Collections = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-black text-white min-h-screen pt-32">
            <div className="max-w-[1600px] mx-auto px-6 py-12">
                <div className="text-center mb-16 animate-fade-in-up">
                    <span className="text-gold-500 tracking-[0.3em] font-semibold uppercase text-sm mb-4 block">The Suranas Heritage</span>
                    <h1 className="section-header">Exclusive Collections</h1>
                    <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto mt-6">
                        Explore our curated assortments, each telling a unique story of artistry and elegance.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {collectionsList.map((col, idx) => (
                        <Link
                            to={col.link}
                            key={idx}
                            className="group relative h-[500px] overflow-hidden rounded-[2rem] cursor-pointer block hover-3d-card"
                        >
                            <div className="absolute inset-0 overflow-hidden">
                                <img
                                    src={col.image}
                                    alt={col.name}
                                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />
                            </div>

                            <div className="absolute bottom-0 left-0 p-10 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="overflow-hidden mb-2">
                                    <h3 className="text-4xl font-bold text-white tracking-tight transform transition-transform duration-500 group-hover:-translate-y-1">
                                        {col.name}
                                    </h3>
                                </div>
                                <p className="text-gold-200 text-lg font-light mb-6 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                    {col.description}
                                </p>

                                <div className="flex items-center gap-2 text-white font-medium uppercase tracking-widest text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                    Explore Collection <span className="text-gold-500">→</span>
                                </div>
                            </div>

                            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] group-hover:animate-shine" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Collections;
