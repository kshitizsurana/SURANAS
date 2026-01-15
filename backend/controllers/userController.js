const User = require('../models/User');
const jwt = require('jsonwebtoken');


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};


exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        const user = await User.create({
            name,
            email,
            password
        });

        res.status(201).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error registering user',
            error: error.message
        });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        res.json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error logging in',
            error: error.message
        });
    }
};


exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('wishlist cart.product');

        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching profile',
            error: error.message
        });
    }
};


exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.phone = req.body.phone || user.phone;

            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            res.json({
                success: true,
                data: {
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    role: updatedUser.role,
                    token: generateToken(updatedUser._id)
                }
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating profile',
            error: error.message
        });
    }
};


exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const user = await User.findById(req.user.id);

        const existingItem = user.cart.find(item => item.product.toString() === productId);

        if (existingItem) {
            existingItem.quantity += quantity || 1;
        } else {
            user.cart.push({ product: productId, quantity: quantity || 1 });
        }

        await user.save();
        await user.populate('cart.product');

        res.json({
            success: true,
            data: user.cart
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error adding to cart',
            error: error.message
        });
    }
};


exports.removeFromCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.cart = user.cart.filter(item => item.product.toString() !== req.params.productId);

        await user.save();
        await user.populate('cart.product');

        res.json({
            success: true,
            data: user.cart
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error removing from cart',
            error: error.message
        });
    }
};


exports.addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = await User.findById(req.user.id);

        if (!user.wishlist.includes(productId)) {
            user.wishlist.push(productId);
            await user.save();
        }

        await user.populate('wishlist');

        res.json({
            success: true,
            data: user.wishlist
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error adding to wishlist',
            error: error.message
        });
    }
};


exports.removeFromWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.wishlist = user.wishlist.filter(id => id.toString() !== req.params.productId);

        await user.save();
        await user.populate('wishlist');

        res.json({
            success: true,
            data: user.wishlist
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error removing from wishlist',
            error: error.message
        });
    }
};
