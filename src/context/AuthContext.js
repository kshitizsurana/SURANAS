import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5005/api';

const MOCK_USERS = [
    {
        _id: '1',
        name: 'Admin User',
        email: 'admin@luxe.com',
        password: 'admin123',
        role: 'admin'
    },
    {
        _id: '2',
        name: 'Test User',
        email: 'test@test.com',
        password: 'test123',
        role: 'user'
    }
];

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);
    const [mockMode, setMockMode] = useState(false);

    useEffect(() => {
        const initAuth = async () => {
            const savedToken = localStorage.getItem('token');
            const savedUser = localStorage.getItem('user');
            const savedMockMode = localStorage.getItem('mockMode') === 'true';

            if (savedToken && savedUser) {
                setToken(savedToken);
                setUser(JSON.parse(savedUser));
                setMockMode(savedMockMode);
                if (!savedMockMode) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const mockRegister = (name, email, password) => {
        const existingUser = MOCK_USERS.find(u => u.email === email);
        if (existingUser) {
            return {
                success: false,
                message: 'User already exists'
            };
        }

        const newUser = {
            _id: Date.now().toString(),
            name,
            email,
            role: 'user'
        };

        const mockToken = `mock_token_${Date.now()}`;

        setToken(mockToken);
        setUser(newUser);
        setMockMode(true);
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('mockMode', 'true');

        return { success: true };
    };

    const mockLogin = (email, password) => {
        const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);

        if (!foundUser) {
            return {
                success: false,
                message: 'Invalid credentials'
            };
        }

        const { password: _, ...userData } = foundUser;
        const mockToken = `mock_token_${Date.now()}`;

        setToken(mockToken);
        setUser(userData);
        setMockMode(true);
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('mockMode', 'true');

        return { success: true };
    };

    const register = async (name, email, password) => {
        try {
            const response = await axios.post(`${API_URL}/users/register`, {
                name,
                email,
                password
            });

            const { token: newToken, ...userData } = response.data.data;

            setToken(newToken);
            setUser(userData);
            setMockMode(false);
            localStorage.setItem('token', newToken);
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('mockMode', 'false');
            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

            return { success: true };
        } catch (error) {
            console.error('Registration error:', error);

            if (error.request && !error.response) {
                console.log('Backend not available, using mock authentication');
                return mockRegister(name, email, password);
            }

            let errorMessage = 'Registration failed';

            if (error.response) {
                errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
            } else {
                errorMessage = error.message || 'Registration failed';
            }

            return {
                success: false,
                message: errorMessage
            };
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/users/login`, {
                email,
                password
            });

            const { token: newToken, ...userData } = response.data.data;

            setToken(newToken);
            setUser(userData);
            setMockMode(false);
            localStorage.setItem('token', newToken);
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('mockMode', 'false');
            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

            return { success: true };
        } catch (error) {
            console.error('Login error:', error);

            if (error.request && !error.response) {
                console.log('Backend not available, using mock authentication');
                return mockLogin(email, password);
            }

            let errorMessage = 'Login failed';

            if (error.response) {
                errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
            } else {
                errorMessage = error.message || 'Login failed';
            }

            return {
                success: false,
                message: errorMessage
            };
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        setMockMode(false);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('mockMode');
        delete axios.defaults.headers.common['Authorization'];
    };

    const updateProfile = async (updates) => {
        if (mockMode) {
            const updatedUser = { ...user, ...updates };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            return { success: true };
        }

        try {
            const response = await axios.put(`${API_URL}/users/profile`, updates);
            const updatedUser = response.data.data;
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Update failed'
            };
        }
    };

    const value = {
        user,
        token,
        loading,
        mockMode,
        register,
        login,
        logout,
        updateProfile,
        isAuthenticated: !!token
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
