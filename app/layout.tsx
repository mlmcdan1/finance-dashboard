import "./globals.css";
import { AuthProvider } from "../lib/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex bg-gray-100 min-h-screen">
        <AuthProvider>
          {/* Sidebar */}
          <aside className="w-72 bg-white shadow-lg p-6 fixed h-full">
            <h2 className="text-2xl font-bold text-blue-600">Finlab Dashboard</h2>
            <nav className="mt-6 space-y-4">
              <a href="/dashboard" className="block text-lg font-medium text-gray-700 hover:text-blue-500">
                📊 Dashboard
              </a>
              <a href="/transactions" className="block text-lg font-medium text-gray-700 hover:text-blue-500">
                💰 Transactions
              </a>
              <a href="/profile" className="block text-lg font-medium text-gray-700 hover:text-blue-500">
                👤 Profile
              </a>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="ml-72 p-8 flex-1">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
