import Link from "next/link";
import "./globals.css";
import { AuthProvider } from "../lib/AuthContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-black"> {/* Always use light mode styling */}
        <AuthProvider>
          {/* Sidebar */}
          <aside className="w-72 shadow-lg p-6 fixed h-full">
            <h2 className="text-2xl font-bold text-blue-600">Finance Dashboard</h2>
            <nav className="mt-6 space-y-4">
              <Link href="/dashboard" className="block text-lg font-medium hover:text-blue-500">
                📊 Dashboard
              </Link>
              <Link href="/transactions" className="block text-lg font-medium hover:text-blue-500">
                💰 Transactions
              </Link>
              <Link href="/auth" className="block text-lg font-medium hover:text-blue-500">
                👤 Login / Profile
              </Link>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="ml-72 p-8 flex-1">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
