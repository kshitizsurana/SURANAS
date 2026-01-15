import React, { useState, useEffect, useRef } from 'react';
import ProductCard from '../components/ProductCard';
import { products, categories, collections, metalTypes } from '../data/products';
import { FiFilter, FiX, FiChevronDown, FiSearch } from 'react-icons/fi';
import { useSearchParams, useLocation } from 'react-router-dom';

const Shop = () => {
    const [searchParams] = useSearchParams();
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [activeFilter, setActiveFilter] = useState('All');
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [priceRange, setPriceRange] = useState([0, 1000000]);
    const [sortBy, setSortBy] = useState('featured');

    const location = useLocation();
    const [visualSearchImage, setVisualSearchImage] = useState(null);

    const [selectedCollection, setSelectedCollection] = useState('All Collections');
    const [selectedMetal, setSelectedMetal] = useState('All Metals');
    useEffect(() => {
        const cat = searchParams.get('category');
        const col = searchParams.get('collection');
        const search = searchParams.get('search');

        if (location.state?.visualSearch && location.state?.image) {
            setVisualSearchImage(location.state.image);
            setActiveFilter('Visual Match Results');
            const shuffled = [...products].sort(() => 0.5 - Math.random()).slice(0, 4);
            setFilteredProducts(shuffled);
            setSelectedCategory('All');
        }
        else if (cat) {
            setVisualSearchImage(null);
            setSelectedCategory(cat);
            setActiveFilter(cat);
        }
        else if (col) {
            setVisualSearchImage(null);
            setSelectedCollection(col);
            setActiveFilter(col);
        }
        else if (search) {
            setVisualSearchImage(null);
            setActiveFilter(`Search: ${search}`);
        } else {
            setVisualSearchImage(null);
        }
    }, [searchParams, location.state]);

    useEffect(() => {
        let result = [...products];
        const search = searchParams.get('search')?.toLowerCase();

        if (search) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(search) ||
                p.category.toLowerCase().includes(search)
            );
        }

        if (selectedCategory !== 'All') {
            result = result.filter(p => p.category === selectedCategory);
        }

        if (selectedCollection !== 'All Collections') {
            result = result.filter(p => p.collection === selectedCollection);
        }

        if (selectedMetal !== 'All Metals') {
            result = result.filter(p => p.metal === selectedMetal);
        }

        result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

        result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
        if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
        if (sortBy === 'newest') result.sort((a, b) => b.id.localeCompare(a.id));

        setFilteredProducts(result);
        if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
        if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
        if (sortBy === 'newest') result.sort((a, b) => b.id.localeCompare(a.id));

        if (!visualSearchImage) {
            setFilteredProducts(result);
        }
    }, [selectedCategory, selectedCollection, selectedMetal, priceRange, sortBy, searchParams, visualSearchImage]);

    const handleCategoryClick = (cat) => {
        setSelectedCategory(cat === 'All' ? 'All' : cat);
        setSelectedCollection('All Collections');
        setActiveFilter(cat);
    };

    return (
        <div className="min-h-screen bg-[#000000] text-white pt-32">
            <div className="sticky top-[78px] z-40 bg-black/80 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
                <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">

                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mask-gradient flex-1 mr-4">
                        <button
                            onClick={() => handleCategoryClick('All')}
                            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === 'All' ? 'bg-white text-black' : 'text-gray-400 hover:text-white bg-white/5'}`}
                        >
                            All Jewellery
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryClick(cat)}
                                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === cat ? 'bg-white text-black' : 'text-gray-400 hover:text-white bg-white/5'}`}
                            >
                                {cat}
                            </button>
                        ))}
                        <div className="w-px h-6 bg-gray-800 mx-2 flex-shrink-0"></div>
                        {collections.map(col => (
                            <button
                                key={col}
                                onClick={() => { setSelectedCollection(col); setSelectedCategory('All'); setActiveFilter(col); }}
                                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === col ? 'bg-gold-500 text-black' : 'text-gold-500/80 hover:text-gold-400 bg-gold-900/10'}`}
                            >
                                {col}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <button className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white px-3 py-2">
                                Sort <FiChevronDown />
                            </button>
                            <div className="absolute right-0 top-full mt-2 w-48 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                                {['featured', 'newest', 'price-low', 'price-high'].map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => setSortBy(opt)}
                                        className={`w-full text-left px-4 py-2 text-sm rounded-lg ${sortBy === opt ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5'}`}
                                    >
                                        {{ 'featured': 'Featured', 'newest': 'Newest Arrivals', 'price-low': 'Price: Low to High', 'price-high': 'Price: High to Low' }[opt]}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                            className={`p-2 rounded-full transition-colors ${showAdvancedFilters ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
                        >
                            <FiFilter size={18} />
                        </button>
                    </div>
                </div>

                <div className={`overflow-hidden transition-all duration-500 ease-in-out bg-[#0f0f0f] border-b border-white/5 ${showAdvancedFilters ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="max-w-[1600px] mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div>
                            <h4 className="text-gray-500 text-xs uppercase tracking-widest mb-4">Price Range</h4>
                            <input
                                type="range"
                                min="0"
                                max="1000000"
                                step="10000"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                className="w-full accent-white h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-sm mt-2 text-gray-300">
                                <span>₹0</span>
                                <span>Max: ₹{priceRange[1].toLocaleString()}</span>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-gray-500 text-xs uppercase tracking-widest mb-4">Metal Type</h4>
                            <div className="flex flex-wrap gap-2">
                                {metalTypes.map(metal => (
                                    <button
                                        key={metal}
                                        onClick={() => setSelectedMetal(selectedMetal === metal ? 'All Metals' : metal)}
                                        className={`px-4 py-1.5 rounded-lg text-sm border transition-all ${selectedMetal === metal ? 'border-gold-500 text-gold-500 bg-gold-900/10' : 'border-gray-800 text-gray-400 hover:border-gray-600'}`}
                                    >
                                        {metal}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-end justify-end">
                            <button onClick={() => { setPriceRange([0, 1000000]); setSelectedMetal('All Metals'); }} className="text-sm text-red-400 hover:text-red-300">
                                Reset Filters
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto px-6 py-12">
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                        {activeFilter === 'All' ? 'All Jewellery' : activeFilter}
                    </h1>
                    <p className="text-gray-400">{filteredProducts.length} designs available</p>

                </div>

                {visualSearchImage && (
                    <div className="flex flex-col sm:flex-row items-center gap-6 mb-12 bg-gradient-to-r from-white/5 to-transparent p-6 rounded-3xl border border-white/10 relative overflow-hidden animate-fade-in-up">
                        <div className="absolute top-0 right-0 p-32 bg-gold-500 rounded-full blur-[100px] opacity-10 pointer-events-none"></div>
                        <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-gold-500 shadow-lg relative group flex-shrink-0">
                            <img src={visualSearchImage} alt="Uploaded" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gold-500/20 animate-pulse mix-blend-overlay"></div>
                        </div>
                        <div className="text-center sm:text-left z-10">
                            <h3 className="text-xl font-bold text-white mb-1">Visual Match Found</h3>
                            <p className="text-gray-400 text-sm max-w-lg">
                                Our AI has analyzed your image and identified similar styles from our exclusive collection.
                                <span className="text-gold-500 block mt-1 font-medium">✨ High Confidence Match</span>
                            </p>
                        </div>
                        <div className="flex-1"></div>
                        <button
                            onClick={() => { setVisualSearchImage(null); setFilteredProducts(products); setActiveFilter('All'); }}
                            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-colors z-10"
                        >
                            Clear Search
                        </button>
                    </div>
                )}

                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-16">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="h-64 flex flex-col items-center justify-center text-gray-500">
                        <FiSearch size={48} className="mb-4 opacity-50" />
                        <p className="text-xl">No designs found matching your criteria.</p>
                        <button onClick={() => { setSelectedCategory('All'); setPriceRange([0, 1000000]); }} className="mt-4 text-gold-500 hover:underline">Clear all filters</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shop;
