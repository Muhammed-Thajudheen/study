// src/pages/dashboard/index.js

import { useAuth } from '../../../context/AuthContext';
import Link from 'next/link';

export default function Dashboard() {
    const { user, logout } = useAuth();

    if (!user) {
        return <Link href="/login">Please log in</Link>;
    }

    return (
        <div>
            <h1>Welcome, {user.name}!</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
}