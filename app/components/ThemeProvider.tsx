"use client"; // ✅ ONLY this file should be a client component

import { useState, useEffect } from "react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
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
    <div className={darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}>
      <button onClick={toggleDarkMode} className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-md">
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      {children}
    </div>
  );
}
