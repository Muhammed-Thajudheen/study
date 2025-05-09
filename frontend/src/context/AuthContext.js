// src/context/AuthContext.js

import { createContext, useContext } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

// Provider component
export function AuthProvider({ children }) {
    const user = { name: 'John Doe' }; // Replace with actual authentication logic
    const logout = () => console.log('Logged out'); // Replace with actual logout logic

    return (
        <AuthContext.Provider value={{ user, logout }}>
            {children}
        </AuthContext.Provider>
    );
}