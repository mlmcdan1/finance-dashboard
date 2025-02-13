import { createContext, useState, useEffect, useContext } from "react";
import { auth } from "./firebase";
import { 
    onAuthStateChanged, 
    signInWithPopup, 
    GoogleAuthProvider, 
    signOut, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword 
} from "firebase/auth";

interface AuthContextType {
    user: any;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

// Provide a default empty object to prevent `null` errors
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    };

    const register = async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password);
    };

    const login = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, loading, signInWithGoogle, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Ensure `useAuth()` never returns null by throwing an error if used outside the provider
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
