import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { FiLock, FiChevronLeft, FiCheckCircle, FiCreditCard, FiSmartphone } from 'react-icons/fi';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5005/api';

const Checkout = () => {

    const { cartItems, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const { success, error } = useToast();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        address: '',
        city: '',
        zip: '',
        phone: ''
    });

    if (cartItems.length === 0 && step !== 3) {
        navigate('/shop');
        return null;
    }

    const shippingCost = cartTotal > 50000 ? 0 : 500;
    const tax = cartTotal * 0.03;
    const total = cartTotal + shippingCost + tax;

    const handleSubmitInfo = (e) => {
        e.preventDefault();
        setStep(2);
        window.scrollTo(0, 0);
    };

    const handleRazorpayPayment = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/payment/order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: total,
                    currency: 'INR',
                    receipt: `receipt_${Date.now()}`
                })
            });

            const order = await response.json();

            const options = {
                key: 'rzp_test_placeholder',
                amount: order.amount,
                currency: order.currency,
                name: "Suranas Heritage",
                description: "Masterpiece Jewelry Purchase",
                image: "https://images.unsplash.com/photo-1616150638538-ffb0679a3fc4?q=80&w=100&auto=format&fit=crop",
                order_id: order.id,
                handler: async function (response) {
                    const verifyRes = await fetch(`${API_URL}/payment/verify`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(response)
                    });

                    const verifyData = await verifyRes.json();

                    if (verifyData.status === 'success') {
                        clearCart();
                        setStep(3);
                        success('Payment Successful! Your masterpiece is being prepared.');
                        window.scrollTo(0, 0);
                    } else {
                        error('Payment verification failed. Please contact support.');
                    }
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone
                },
                notes: {
                    address: formData.address
                },
                theme: {
                    color: "#d4af37"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {
                error(response.error.description);
            });
            rzp.open();
        } catch (err) {
            console.error(err);
            error('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (step === 3) {
        return (
            <div className="min-h-screen bg-black pt-32 flex items-center justify-center px-4">
                <div className="text-center animate-fade-in-up">
                    <div className="w-24 h-24 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(212,175,55,0.3)]">
                        <FiCheckCircle className="text-gold-500" size={60} />
                    </div>
                    <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">Masterpiece Secured</h1>
                    <p className="text-gray-400 text-lg mb-12 max-w-md mx-auto leading-relaxed">
                        Your heritage journey begins. Our master artisans are preparing your selection for its global passage.
                    </p>
                    <div className="space-y-4 flex flex-col items-center">
                        <button
                            onClick={() => navigate('/orders')}
                            className="btn-primary w-full max-w-xs py-4 shadow-xl shadow-gold-500/20"
                        >
                            Track My Order
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="text-gray-500 hover:text-white transition-colors mt-4 font-medium"
                        >
                            Return to Boutique
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                    <div>
                        <button onClick={() => step === 2 ? setStep(1) : navigate('/cart')} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 mb-4 group">
                            <FiChevronLeft className="group-hover:-translate-x-1 transition-transform" /> {step === 2 ? 'Back to shipping' : 'Return to cart'}
                        </button>
                        <h1 className="text-5xl font-bold text-white tracking-tight">Boutique Checkout</h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-center gap-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${step >= 1 ? 'border-gold-500 bg-gold-500 text-black' : 'border-gray-800 text-gray-800'}`}>1</div>
                            <span className={`text-xs font-medium uppercase tracking-widest ${step >= 1 ? 'text-gold-500' : 'text-gray-800'}`}>Shipping</span>
                        </div>
                        <div className={`w-12 h-[2px] mb-6 ${step >= 2 ? 'bg-gold-500' : 'bg-gray-800'}`}></div>
                        <div className="flex flex-col items-center gap-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${step >= 2 ? 'border-gold-500 bg-gold-500 text-black' : 'border-gray-800 text-gray-800'}`}>2</div>
                            <span className={`text-xs font-medium uppercase tracking-widest ${step >= 2 ? 'text-gold-500' : 'text-gray-800'}`}>Payment</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-7">
                        {step === 1 ? (
                            <form onSubmit={handleSubmitInfo} className="space-y-10 animate-fade-in">
                                <div className="bg-[#111] border border-white/5 rounded-3xl p-8 md:p-12">
                                    <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/5 pb-4">Shipping Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="md:col-span-2">
                                            <label className="block text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">Full Name</label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 transition-all text-lg"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="Enter your full name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">Email Address</label>
                                            <input
                                                required
                                                type="email"
                                                className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gold-500 transition-all text-lg"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">Phone Number</label>
                                            <input
                                                required
                                                type="tel"
                                                className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gold-500 transition-all text-lg"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="+91 XXXXX XXXXX"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">Residential Address</label>
                                            <textarea
                                                required
                                                rows="3"
                                                className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gold-500 transition-all text-lg resize-none"
                                                value={formData.address}
                                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                placeholder="Street, Landmark, Apartment"
                                            ></textarea>
                                        </div>
                                        <div>
                                            <label className="block text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">City</label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gold-500 transition-all text-lg"
                                                value={formData.city}
                                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">ZIP / PIN Code</label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gold-500 transition-all text-lg"
                                                value={formData.zip}
                                                onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn-primary w-full py-5 text-xl font-bold tracking-tight shadow-2xl shadow-gold-500/20">
                                    Proceed to Secure Payment
                                </button>
                            </form>
                        ) : (
                            <div className="space-y-10 animate-fade-in">
                                <div className="bg-[#111] border border-white/5 rounded-3xl p-8 md:p-12">
                                    <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/5 pb-4">Payment Selection</h3>

                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="p-8 rounded-3xl border border-gold-500/50 bg-gold-500/5 flex items-center justify-between relative group">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 bg-gold-500/20 rounded-2xl flex items-center justify-center">
                                                    <FiSmartphone className="text-gold-500" size={32} />
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-bold text-white mb-1">Razorpay Secure</h4>
                                                    <p className="text-gray-500 text-sm">Cards, UPI, Netbanking, Wallets</p>
                                                </div>
                                            </div>
                                            <div className="w-6 h-6 rounded-full border-2 border-gold-500 flex items-center justify-center">
                                                <div className="w-3 h-3 bg-gold-500 rounded-full"></div>
                                            </div>
                                        </div>

                                        <div className="p-8 rounded-3xl border border-white/5 bg-black/20 opacity-50 flex items-center justify-between cursor-not-allowed">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center">
                                                    <FiCreditCard className="text-gray-600" size={32} />
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-bold text-gray-400 mb-1">Direct Bank Wire</h4>
                                                    <p className="text-gray-600 text-sm">For purchases above ₹1,000,000</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-12 p-6 bg-gold-500/5 rounded-2xl border border-gold-500/10 flex items-start gap-4">
                                        <FiLock className="text-gold-500 flex-shrink-0 mt-1" />
                                        <p className="text-xs text-gray-400 leading-relaxed">
                                            Your transaction is encrypted with military-grade SSL. Suranas Heritage does not store your card details. Payment is processed securely via Razorpay's PCI-DSS compliant infrastructure.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={handleRazorpayPayment}
                                    disabled={loading}
                                    className={`btn-primary w-full py-5 text-xl font-bold tracking-tight shadow-2xl flex items-center justify-center gap-3 ${loading ? 'opacity-70' : 'hover:scale-[1.02]'}`}
                                >
                                    {loading ? (
                                        <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                                    ) : (
                                        <><FiLock /> Pay ₹{total.toLocaleString()}</>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-5">
                        <div className="lg:sticky lg:top-32 h-fit bg-[#111] border border-white/5 rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 blur-[100px] rounded-full"></div>

                            <h2 className="text-2xl font-bold text-white mb-8 relative z-10">Boutique Bag</h2>

                            <div className="space-y-6 max-h-[400px] overflow-y-auto mb-10 pr-4 scrollbar-thin relative z-10">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-6 group">
                                        <div className="w-20 h-20 bg-black rounded-2xl overflow-hidden flex-shrink-0 border border-white/5 group-hover:border-gold-500/30 transition-colors">
                                            <img src={item.images?.[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <h4 className="text-white font-semibold text-base line-clamp-1">{item.name}</h4>
                                            <div className="flex justify-between items-center mt-2">
                                                <p className="text-gray-500 text-sm italic">Qty: {item.quantity}</p>
                                                <p className="text-white font-medium">₹{(item.price * item.quantity).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 border-t border-white/5 pt-8 relative z-10">
                                <div className="flex justify-between text-gray-400">
                                    <span className="font-light">Subtotal</span>
                                    <span className="text-white">₹{cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span className="font-light">Logistics Fee</span>
                                    <span className="text-white">{shippingCost === 0 ? 'Complimentary' : `₹${shippingCost.toLocaleString()}`}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span className="font-light">GST (3%)</span>
                                    <span className="text-white">₹{tax.toLocaleString()}</span>
                                </div>
                                <div className="mt-8 pt-6 border-t border-white/10">
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-gray-300 text-lg">Total</span>
                                        <div className="text-right">
                                            <span className="text-4xl font-bold text-gold-500 tracking-tighter">₹{total.toLocaleString()}</span>
                                            <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Inclusive of all taxes</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
