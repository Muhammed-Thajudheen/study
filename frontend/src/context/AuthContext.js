// src/context/AuthContext.js

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Login function
    const login = async (credentials) => {
        try {
            // Replace with your actual backend login endpoint
            const response = await axios.post('/api/auth/login', credentials);
            const { token } = response.data;

            // Save the token in localStorage
            localStorage.setItem('token', token);

            // Optionally decode the token or fetch user data
            const userData = decodeToken(token); // Or fetch user data from /api/auth/me
            setUser(userData);

            return true; // Login successful
        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
            throw new Error('Invalid credentials');
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    // Check authentication on app load
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // Replace with your actual backend user endpoint
                    const response = await axios.get('/api/auth/me', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUser(response.data.user);
                } catch (error) {
                    console.error('Failed to authenticate user:', error);
                    localStorage.removeItem('token'); // Clear invalid token
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const value = { user, login, logout };

    if (loading) {
        return <div>Loading...</div>;
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Helper function to decode a JWT token
function decodeToken(token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
}