const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide product name'],
        trim: true,
        maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please provide product description']
    },
    price: {
        type: Number,
        required: [true, 'Please provide product price'],
        min: [0, 'Price cannot be negative']
    },
    originalPrice: {
        type: Number,
        default: null
    },
    category: {
        type: String,
        required: [true, 'Please provide product category'],
        enum: ['Necklaces', 'Rings', 'Earrings', 'Bangles', 'Bracelets', 'Pendants', 'Chains', 'Other']
    },
    subcategory: {
        type: String,
        default: ''
    },
    metal: {
        type: String,
        enum: ['Gold', 'Rose Gold', 'White Gold', 'Platinum', 'Silver', 'Diamond', 'Mixed'],
        required: true
    },
    purity: {
        type: String,
        default: ''
    },
    weight: {
        type: Number,
        default: 0
    },
    images: [{
        type: String,
        required: true
    }],
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    rating: {
        type: Number,
        default: 0,
        min: [0, 'Rating must be at least 0'],
        max: [5, 'Rating cannot exceed 5']
    },
    numReviews: {
        type: Number,
        default: 0
    },
    badge: {
        type: String,
        enum: ['New', 'Bestseller', 'Limited', 'Sale', ''],
        default: ''
    },
    featured: {
        type: Boolean,
        default: false
    },
    collection: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
