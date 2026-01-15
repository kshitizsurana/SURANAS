const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');


dotenv.config();

const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.set('trust proxy', 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/luxe-jewelry');
        console.log('✓ MongoDB Connected Successfully');
    } catch (error) {
        console.error('✗ MongoDB Connection Error:', error.message);
        console.log('ℹ Server will continue to run without MongoDB (DB-dependent features will be disabled)');
    }
};

connectDB();

let goldPrice = 12500;
let silverPrice = 245;

io.on('connection', (socket) => {
    socket.emit('marketUpdate', { gold: Math.round(goldPrice), silver: Math.round(silverPrice) });

    console.log('Client connected to Market Stream:', socket.id);

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

setInterval(() => {
    goldPrice = Math.max(12000, goldPrice + (Math.random() - 0.5) * 50);

    let silverMove;
    if (Math.random() > 0.3) {
        silverMove = Math.random() * 2;
    } else {
        silverMove = -Math.random();
    }

    let nextSilver = silverPrice + silverMove;
    if (nextSilver > 250) {
        nextSilver = 250 - Math.random() * 0.5;
    }
    silverPrice = Math.max(200, nextSilver);

    io.emit('marketUpdate', {
        gold: Math.round(goldPrice),
        silver: Math.round(silverPrice)
    });
}, 3000);

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'LUXE Jewelry API is running' });
});

const fs = require('fs');

// Root route
app.get('/', (req, res) => {
    const buildPath = path.join(__dirname, '../build');
    const indexPath = path.join(buildPath, 'index.html');

    if (process.env.NODE_ENV === 'production' && fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.json({
            status: 'OK',
            message: 'LUXE Jewelry API is running',
            environment: process.env.NODE_ENV || 'development',
            endpoints: {
                health: '/api/health',
                products: '/api/products',
                users: '/api/users',
                orders: '/api/orders',
                payment: '/api/payment'
            }
        });
    }
});

// Serve static files from the React app build folder in production if it exists
if (process.env.NODE_ENV === 'production') {
    const buildPath = path.join(__dirname, '../build');
    if (fs.existsSync(buildPath)) {
        app.use(express.static(buildPath));
    }
}

// 404 Handler
app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

const PORT = process.env.PORT || 5005;

server.listen(PORT, () => {
    console.log(`✓ Server running on port ${PORT}`);
    console.log(`✓ Socket.io Market Stream Active`);
    console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
});
