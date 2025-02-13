"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./globals.css";
import { AuthProvider } from "../lib/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  // Check localStorage for user preference on dark mode after mounting (client-side)
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedTheme);
    if (savedTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("darkMode", newDarkMode ? "true" : "false");
  };

  if (darkMode === null) {
    return null; // Avoid rendering before knowing the theme preference
  }

  return (
    <html lang="en">
      <body
        className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen`}
      >
        <AuthProvider>
          {/* Sidebar */}
          <aside
            className={`w-72 shadow-lg p-6 fixed h-full ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
          >
            <h2 className="text-2xl font-bold text-blue-600">Finance Dashboard</h2>
            <nav className="mt-6 space-y-4">
              <Link
                href="/dashboard"
                className={`block text-lg font-medium hover:text-blue-500 ${darkMode ? "text-white" : "text-gray-700"}`}
              >
                📊 Dashboard
              </Link>
              <Link
                href="/transactions"
                className={`block text-lg font-medium hover:text-blue-500 ${darkMode ? "text-white" : "text-gray-700"}`}
              >
                💰 Transactions
              </Link>
              <Link
                href="/auth"
                className={`block text-lg font-medium hover:text-blue-500 ${darkMode ? "text-white" : "text-gray-700"}`}
              >
                👤 Login / Profile
              </Link>
            </nav>

            {/* Dark Mode Toggle */}
            <div className="mt-6">
              <button
                onClick={toggleDarkMode}
                className="w-full bg-blue-500 text-white p-2 rounded-md"
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="ml-72 p-8 flex-1">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
