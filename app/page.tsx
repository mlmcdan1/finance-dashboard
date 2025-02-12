"use client";

import { useAuth } from "../lib/AuthContext"; // Import auth context for sign-in/out

export default function HomePage() {
  const { user, signInWithGoogle, logout } = useAuth();

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Finance Dashboard</h1>
      <p className="text-xl mb-4">Track your income and expenses in real-time with this simple finance dashboard.</p>

      <div className="space-x-4">
        {/* Sign In/Sign Out buttons */}
        {!user ? (
          <button
            onClick={signInWithGoogle}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Sign In with Google
          </button>
        ) : (
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
}
