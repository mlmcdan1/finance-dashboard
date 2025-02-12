"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "./firebase";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";

// Create context for authentication
const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true); // Correct type

  // Set up an effect to track auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // After user state is updated, set loading to false
    });
    return () => unsubscribe(); // Clean up on component unmount
  }, []);

  // Google sign-in method
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  // Register new user
  const register = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  // Login method for existing user
  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  // Sign out method
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the context
export const useAuth = () => useContext(AuthContext);
