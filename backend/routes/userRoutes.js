const express = require('express');
const router = express.Router();
const {
    register,
    login,
    getProfile,
    updateProfile,
    addToCart,
    addToWishlist,
    removeFromCart,
    removeFromWishlist
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.route('/profile').get(protect, getProfile).put(protect, updateProfile);
router.post('/cart', protect, addToCart);
router.delete('/cart/:productId', protect, removeFromCart);
router.post('/wishlist', protect, addToWishlist);
router.delete('/wishlist/:productId', protect, removeFromWishlist);

module.exports = router;
