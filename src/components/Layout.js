// components/Layout.js
import React, { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '@/contexts/AuthContext';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';

const Layout = ({ children }) => {
  const { isAuthenticated, signOut } = useContext(AuthContext);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen flex flex-col font-body">
      <header className="bg-gray-800 text-white py-6 text-center shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/post">
            <h1 className="text-3xl font-bold cursor-pointer hover:text-blue-500 transition duration-300">
              AnnairaM
            </h1>
          </Link>

          {isAuthenticated && (
            <nav className="flex gap-3">
              <Link href="/me">
                <button className="text-blue-500 hover:underline ml-4">
                  <FaUser size={20} />
                </button>
              </Link>
              <button
                className="text-blue-500 hover:underline ml-4"
                onClick={handleSignOut}
              >
                <FaSignOutAlt size={20} />
              </button>
            </nav>
          )}
        </div>
      </header>

      <main className="flex-grow container mx-auto flex flex-col items-center p-8">
        {children}
      </main>

      <footer className="bg-gray-800 text-white py-6 text-center border-t border-gray-700">
        <p className="text-sm">&copy; {new Date().getFullYear()} Meu Site</p>
      </footer>
    </div>
  );
};

export default Layout;
