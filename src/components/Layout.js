// components/Layout.js
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen flex flex-col font-body">
      <header className="bg-gray-800 text-white py-4 text-center">
        <h1 className="text-3xl font-bold">AnnairaM</h1>
      </header>

      <main className="flex-grow flex flex-col items-center p-6">{children}</main>

      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2024 Meu Site</p>
      </footer>
    </div>
  );
};

export default Layout;
