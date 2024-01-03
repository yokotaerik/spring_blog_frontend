// components/Layout.js
import React, { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '@/contexts/AuthContext';

const Layout = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen flex flex-col font-body">
      <header className="bg-gray-800 text-white py-4 text-center">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/post">
            <h1 className="text-3xl font-bold cursor-pointer hover:text-blue-500 transition duration-300">
              AnnairaM
            </h1>
          </Link>

          {isAuthenticated && (
            <nav>
              <Link href="/me">
                <label className="text-blue-500 hover:underline ml-4">Meu Perfil</label>
              </Link>
            </nav>
          )}
        </div>
      </header>

      <main className="flex-grow container mx-auto flex flex-col items-center p-6">
        {children}
      </main>

      <footer className="bg-gray-800 text-white py-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Meu Site</p>
      </footer>
    </div>
  );
};

export default Layout;
