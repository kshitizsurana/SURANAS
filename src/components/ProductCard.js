import React from 'react';
import { FiHeart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const { addToCart, addToWishlist, isInWishlist } = useCart();
    const { success } = useToast();
    const inWishlist = isInWishlist(product.id);
    const cardRef = React.useRef(null);

    const productImage = product.images && product.images.length > 0
        ? product.images[0]
        : 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2670&auto=format&fit=crop';

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        success(`${product.name} added to cart!`);
    };

    const handleWishlistToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToWishlist(product);
    };

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        if (window.matchMedia("(hover: none)").matches) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;

        const shineX = (x / rect.width) * 100;
        const shineY = (y / rect.height) * 100;

        card.style.setProperty('--shine-x', `${shineX}%`);
        card.style.setProperty('--shine-y', `${shineY}%`);
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        cardRef.current.style.removeProperty('--shine-x');
        cardRef.current.style.removeProperty('--shine-y');
    };

    return (
        <Link
            to={`/product/${product.id}`}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="block group relative w-full aspect-[4/5] rounded-[2rem] transition-all duration-200 ease-out preserve-3d"
            style={{ transformStyle: 'preserve-3d' }}
        >
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden bg-zinc-900 shadow-2xl">
                <img
                    src={productImage}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
                    style={{
                        background: 'radial-gradient(circle at var(--shine-x, 50%) var(--shine-y, 50%), rgba(255,255,255,0.25) 0%, transparent 60%)',
                        mixBlendMode: 'overlay'
                    }}
                />

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 z-10" />
            </div>

            <div className="absolute inset-0 p-6 flex flex-col justify-between z-20" style={{ transform: 'translateZ(30px)' }}>
                <div className="flex justify-between items-start">
                    {product.badge ? (
                        <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                            {product.badge}
                        </span>
                    ) : <div></div>}

                    <button
                        onClick={handleWishlistToggle}
                        className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 shadow-xl border border-white/10 ${inWishlist
                            ? 'bg-rose-500 text-white'
                            : 'bg-black/30 text-white hover:bg-white hover:text-rose-500'
                            }`}
                    >
                        <FiHeart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
                    </button>
                </div>

                <div className="space-y-3 transform transition-transform duration-500 group-hover:translate-y-0 translate-y-2">
                    <p className="text-gold-400 text-xs font-medium tracking-[0.2em] uppercase">{product.collection}</p>
                    <h3 className="text-2xl font-bold text-white leading-tight pr-4 drop-shadow-lg group-hover:text-gold-200 transition-colors">
                        {product.name}
                    </h3>

                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                        <div className="flex flex-col">
                            <span className="text-gray-400 text-xs line-through opacity-70">
                                {product.originalPrice ? `₹${product.originalPrice.toLocaleString()}` : ''}
                            </span>
                            <span className="text-xl font-medium text-white shadow-black drop-shadow-md">
                                ₹{product.price.toLocaleString()}
                            </span>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gold-400 transition-all shadow-lg hover:scale-105 active:scale-95"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>

            <div
                className="absolute inset-0 rounded-[2rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/5 to-transparent z-30"
                style={{ transform: 'translateZ(1px)' }}
            />
        </Link>
    );
};

export default ProductCard;
