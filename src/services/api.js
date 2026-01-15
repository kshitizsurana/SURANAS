import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5005/api';


axios.defaults.baseURL = API_URL;


axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export const productAPI = {
    getAll: async (params = {}) => {
        const response = await axios.get('/products', { params });
        return response.data;
    },

    getById: async (id) => {
        const response = await axios.get(`/products/${id}`);
        return response.data;
    },

    create: async (productData) => {
        const response = await axios.post('/products', productData);
        return response.data;
    },

    update: async (id, productData) => {
        const response = await axios.put(`/products/${id}`, productData);
        return response.data;
    },

    delete: async (id) => {
        const response = await axios.delete(`/products/${id}`);
        return response.data;
    }
};


export const orderAPI = {
    create: async (orderData) => {
        const response = await axios.post('/orders', orderData);
        return response.data;
    },

    getMyOrders: async () => {
        const response = await axios.get('/orders/myorders');
        return response.data;
    },

    getById: async (id) => {
        const response = await axios.get(`/orders/${id}`);
        return response.data;
    },

    updateToPaid: async (id, paymentResult) => {
        const response = await axios.put(`/orders/${id}/pay`, paymentResult);
        return response.data;
    },

    cancel: async (id) => {
        const response = await axios.put(`/orders/${id}`, { status: 'Cancelled' });
        return response.data;
    }
};


export const reviewAPI = {
    create: async (productId, reviewData) => {
        const response = await axios.post(`/products/${productId}/reviews`, reviewData);
        return response.data;
    },

    getByProduct: async (productId) => {
        const response = await axios.get(`/products/${productId}/reviews`);
        return response.data;
    },

    update: async (reviewId, reviewData) => {
        const response = await axios.put(`/reviews/${reviewId}`, reviewData);
        return response.data;
    },

    delete: async (reviewId) => {
        const response = await axios.delete(`/reviews/${reviewId}`);
        return response.data;
    }
};


export const userAPI = {
    getProfile: async () => {
        const response = await axios.get('/users/profile');
        return response.data;
    },

    updateProfile: async (userData) => {
        const response = await axios.put('/users/profile', userData);
        return response.data;
    },

    addToCart: async (productId, quantity) => {
        const response = await axios.post('/users/cart', { productId, quantity });
        return response.data;
    },

    updateCart: async (cartData) => {
        const response = await axios.put('/users/cart', cartData);
        return response.data;
    },

    removeFromCart: async (productId) => {
        const response = await axios.delete(`/users/cart/${productId}`);
        return response.data;
    },

    addToWishlist: async (productId) => {
        const response = await axios.post('/users/wishlist', { productId });
        return response.data;
    },

    removeFromWishlist: async (productId) => {
        const response = await axios.delete(`/users/wishlist/${productId}`);
        return response.data;
    }
};

export default {
    productAPI,
    orderAPI,
    reviewAPI,
    userAPI
};
