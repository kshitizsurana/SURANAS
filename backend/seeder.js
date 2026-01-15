const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const products = [
    {
        name: 'Diamond Solitaire Ring',
        description: 'Exquisite diamond solitaire ring with 18K white gold band. Perfect for engagements and special occasions.',
        price: 125000,
        originalPrice: 150000,
        category: 'Rings',
        subcategory: 'Engagement Rings',
        metal: 'White Gold',
        purity: '18K',
        weight: 3.5,
        images: ['/images/hero-ring.png'],
        stock: 10,
        rating: 4.9,
        numReviews: 127,
        badge: 'Bestseller',
        featured: true,
        collection: 'Diamond Collection'
    },
    {
        name: 'Gold Chain Necklace',
        description: 'Elegant 22K gold chain necklace with intricate design. A timeless piece for any occasion.',
        price: 85000,
        category: 'Necklaces',
        metal: 'Gold',
        purity: '22K',
        weight: 15.2,
        images: ['/images/hero-necklace.png'],
        stock: 15,
        rating: 4.8,
        numReviews: 89,
        badge: 'New',
        featured: true,
        collection: 'Gold Collection'
    },
    {
        name: 'Diamond Studs',
        description: 'Classic diamond stud earrings set in platinum. Brilliant cut diamonds for maximum sparkle.',
        price: 45000,
        originalPrice: 55000,
        category: 'Earrings',
        metal: 'Platinum',
        purity: '950',
        weight: 2.1,
        images: ['/images/hero-earrings.png'],
        stock: 20,
        rating: 4.9,
        numReviews: 156,
        featured: true,
        collection: 'Diamond Collection'
    },
    {
        name: 'Gold Bangles Set',
        description: 'Traditional gold bangles set of 4. Beautifully crafted with traditional Indian designs.',
        price: 95000,
        category: 'Bangles',
        metal: 'Gold',
        purity: '22K',
        weight: 25.5,
        images: ['/images/hero-bangles.png'],
        stock: 8,
        rating: 4.7,
        numReviews: 64,
        badge: 'Limited',
        featured: true,
        collection: 'Traditional Collection'
    },
    {
        name: 'Rose Gold Pendant',
        description: 'Delicate rose gold pendant with diamond accent. Modern and elegant design.',
        price: 32000,
        category: 'Pendants',
        metal: 'Rose Gold',
        purity: '18K',
        weight: 4.2,
        images: ['/images/hero-necklace.png'],
        stock: 25,
        rating: 4.6,
        numReviews: 42,
        featured: false,
        collection: 'Modern Collection'
    },
    {
        name: 'Platinum Wedding Band',
        description: 'Classic platinum wedding band with brushed finish. Timeless and durable.',
        price: 55000,
        category: 'Rings',
        subcategory: 'Wedding Bands',
        metal: 'Platinum',
        purity: '950',
        weight: 5.8,
        images: ['/images/hero-ring.png'],
        stock: 12,
        rating: 4.8,
        numReviews: 98,
        featured: false,
        collection: 'Wedding Collection'
    },
    {
        name: 'Emerald Drop Earrings',
        description: 'Stunning emerald drop earrings set in 18K gold. Perfect for special occasions.',
        price: 78000,
        category: 'Earrings',
        metal: 'Gold',
        purity: '18K',
        weight: 6.3,
        images: ['/images/hero-earrings.png'],
        stock: 6,
        rating: 4.9,
        numReviews: 34,
        badge: 'New',
        featured: false,
        collection: 'Gemstone Collection'
    },
    {
        name: 'Diamond Tennis Bracelet',
        description: 'Luxurious diamond tennis bracelet with 18K white gold. A statement piece.',
        price: 185000,
        originalPrice: 220000,
        category: 'Bracelets',
        metal: 'White Gold',
        purity: '18K',
        weight: 12.5,
        images: ['/images/hero-bangles.png'],
        stock: 4,
        rating: 5.0,
        numReviews: 28,
        badge: 'Bestseller',
        featured: true,
        collection: 'Diamond Collection'
    }
];

const users = [
    {
        name: 'Admin User',
        email: 'admin@luxe.com',
        password: 'admin123',
        role: 'admin'
    }
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/luxe-jewelry');

        console.log('✓ MongoDB Connected');

        await Product.deleteMany();
        await User.deleteMany();
        console.log('✓ Cleared existing data');

        await Product.insertMany(products);
        await User.create(users);

        console.log('✓ Sample products added');
        console.log('✓ Admin user created (email: admin@luxe.com, password: admin123)');
        console.log('✓ Data seeded successfully!');

        process.exit();
    } catch (error) {
        console.error('✗ Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
