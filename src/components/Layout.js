// components/Layout.js
import React, { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '@/contexts/AuthContext';

const Layout = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext); 

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen flex flex-col font-body">
      <header className="bg-gray-800 text-white py-4 text-center">
        <div className="flex justify-between items-center">
          <Link href="/post">
          <h1 className="text-3xl font-bold">AnnairaM</h1>
          </Link>
          
          {isAuthenticated && (
            <nav>
              <Link href="/me">
                <label className="text-blue-500 hover:underline">Meu Perfil</label>
              </Link>
            </nav>
          )}
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center p-6">
        {children}
      </main>

      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2024 Meu Site</p>
      </footer>
    </div>
  );
};

export default Layout;
