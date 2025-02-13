"use client";

import { useAuth } from "../../lib/AuthContext";

export default function AuthPage() {
    // Get auth context
    const authContext = useAuth();

    // Ensure authContext is not null before destructuring
    if (!authContext) {
        return <div>Loading...</div>;
    }

    const { user, signInWithGoogle, logout } = authContext;

    if (user) { 
        return (
            <div className="p-6 text-center">
                <h2>Welcome, {user.email}</h2>
                <button
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 mt-4"
                >
                    Logout
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <h2 className="text-2xl font-bold mb-4">Sign In</h2>
            <button
                onClick={signInWithGoogle}
                className="bg-blue-500 text-white px-4 py-2"
            >
                Sign in with Google
            </button>
        </div>
    );
}
