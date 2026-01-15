
import zoyaEmeraldRing from '../assets/images/products/zoya-emerald-ring.png';
import alekhyaRubyRing from '../assets/images/products/alekhya-ruby-ring.png';
import alekhyaTempleHaram from '../assets/images/products/alekhya-temple-haram.png';
import rivaahChandbali from '../assets/images/products/rivaah-chandbali.png';
import rivaahKadas from '../assets/images/products/rivaah-kadas.png';
import rivaahKundanChoker from '../assets/images/products/rivaah-kundan-choker.png';
import zoyaDiamondCollar from '../assets/images/products/zoya-diamond-collar-final.png';
import celesteDiamondStuds from '../assets/images/products/celeste-diamond-studs-final.png';
import tanishqTennisBracelet from '../assets/images/products/tanishq-tennis-bracelet-final.png';

export const categories = ['Necklaces', 'Rings', 'Earrings', 'Bangles', 'Bracelets', 'Pendants', 'Sets', 'Mangalsutra'];
export const collections = ['Wedding Collection', 'Diamond Collection', 'Gold Collection', 'Platinum Collection', 'Gemstone Collection', 'Polki Collection', 'Temple Jewellery'];
export const metalTypes = ['Gold (22K)', 'Gold (18K)', 'Platinum', 'Rose Gold', 'White Gold'];

export const products = [
    {
        id: 'r1',
        name: 'Celeste Solitaire Diamond Ring',
        price: 145000,
        originalPrice: 160000,
        category: 'Rings',
        collection: 'Diamond Collection',
        metal: 'White Gold',
        weight: '4.5g',
        purity: '18K',
        rating: 4.9,
        numReviews: 89,
        stock: 12,
        featured: true,
        badge: 'Best Seller',
        description: 'A masterpiece from the Celeste collection, featuring a high-clarity solitaire set in 18K white gold.',
        images: [
            'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800',
            'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800'
        ]
    },
    {
        id: 'r2',
        name: 'Zoya Emerald Cut Platinum Ring',
        price: 325000,
        category: 'Rings',
        collection: 'Diamond Collection',
        metal: 'Platinum',
        weight: '5.2g',
        purity: '950',
        rating: 5.0,
        numReviews: 42,
        stock: 5,
        featured: true,
        badge: 'Luxury',
        description: 'An exquisite emerald-cut diamond from Zoya, crafted in pure platinum for the modern royal.',
        images: [
            zoyaEmeraldRing,
            zoyaEmeraldRing
        ]
    },
    {
        id: 'r3',
        name: 'Alekhya Ruby & Gold Ring',
        price: 85000,
        originalPrice: 95000,
        category: 'Rings',
        collection: 'Gemstone Collection',
        metal: 'Gold (22K)',
        weight: '8g',
        purity: '22K',
        rating: 4.7,
        stock: 15,
        featured: false,
        description: 'Inspired by Indian art forms, this Alekhya ring features a regal ruby set in intricate 22K gold.',
        images: [
            alekhyaRubyRing,
            alekhyaRubyRing
        ]
    },

    {
        id: 'n1',
        name: 'Rivaah Kundan Polki Choker',
        price: 550000,
        originalPrice: 600000,
        category: 'Necklaces',
        collection: 'Polki Collection',
        metal: 'Gold (22K)',
        weight: '85g',
        purity: '22K',
        rating: 5.0,
        numReviews: 24,
        stock: 2,
        featured: true,
        badge: 'Heirloom',
        description: 'A majestic Kundan Polki choker from the Rivaah wedding collection, capturing the grandeur of Indian royalty.',
        images: [
            rivaahKundanChoker,
            rivaahKundanChoker
        ]
    },
    {
        id: 'n2',
        name: 'Alekhya Temple Gold Haram',
        price: 280000,
        category: 'Necklaces',
        collection: 'Temple Jewellery',
        metal: 'Gold (22K)',
        weight: '45g',
        purity: '22K',
        rating: 4.8,
        numReviews: 156,
        stock: 8,
        featured: true,
        description: 'A traditional long Haram necklace featuring divine temple motifs, perfect for the classic bride.',
        images: [
            alekhyaTempleHaram,
            alekhyaTempleHaram
        ]
    },
    {
        id: 'n3',
        name: 'Zoya Diamond Collar Necklace',
        price: 890000,
        category: 'Necklaces',
        collection: 'Diamond Collection',
        metal: 'White Gold',
        weight: '32g',
        purity: '18K',
        rating: 5.0,
        stock: 1,
        featured: true,
        badge: 'Showstopper',
        description: 'A breathtaking diamond collar necklace from Zoya, featuring hand-set diamonds in a contemporary design.',
        images: [
            zoyaDiamondCollar,
            zoyaDiamondCollar
        ]
    },

    {
        id: 'e1',
        name: 'Rivaah Gold Chandbali',
        price: 95000,
        originalPrice: 105000,
        category: 'Earrings',
        collection: 'Wedding Collection',
        metal: 'Gold (22K)',
        weight: '15g',
        purity: '22K',
        rating: 4.9,
        numReviews: 112,
        stock: 20,
        featured: true,
        description: 'Grand gold Chandbalis from the Rivaah collection, adorned with pearls and intricate filigree.',
        images: [
            rivaahChandbali,
            rivaahChandbali
        ]
    },
    {
        id: 'e2',
        name: 'Celeste Diamond Studs',
        price: 45000,
        category: 'Earrings',
        collection: 'Diamond Collection',
        metal: 'White Gold',
        weight: '2g',
        purity: '18K',
        rating: 4.7,
        numReviews: 89,
        stock: 30,
        featured: false,
        description: 'Classic diamond studs from the Celeste collection, adding a touch of everyday luxury.',
        images: [
            celesteDiamondStuds,
            celesteDiamondStuds
        ]
    },

    {
        id: 'b1',
        name: 'Rivaah Antique Gold Kadas',
        price: 210000,
        category: 'Bangles',
        collection: 'Wedding Collection',
        metal: 'Gold (22K)',
        weight: '40g',
        purity: '22K',
        rating: 4.8,
        numReviews: 56,
        stock: 10,
        featured: true,
        description: 'Heritage antique gold Kadas from Rivaah, crafted with traditional Nakshi work.',
        images: [
            rivaahKadas,
            rivaahKadas
        ]
    },
    {
        id: 'b2',
        name: 'Tanishq Diamond Tennis Bracelet',
        price: 185000,
        category: 'Bangles',
        collection: 'Diamond Collection',
        metal: 'Rose Gold',
        weight: '12g',
        purity: '18K',
        rating: 4.9,
        numReviews: 34,
        stock: 8,
        featured: true,
        badge: 'Trending',
        description: 'A contemporary rose gold tennis bracelet set with sparkling diamonds.',
        images: [
            tanishqTennisBracelet,
            tanishqTennisBracelet
        ]
    }
];
