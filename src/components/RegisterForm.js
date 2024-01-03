import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Link from 'next/link';

const RegisterForm = () => {
  const { signUp } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ username: '',  email: '', password: '' });

  const handleRegister = async () => {
    await signUp(JSON.stringify(credentials));
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form className="bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full">
        <label className="block text-white text-lg mb-2">
          Email:
          <input
            type="email"
            className="mt-1 p-2 w-full rounded-md bg-gray-700 text-white"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          />
        </label>
        <label className="block text-white text-lg mb-2">
          Username:
          <input
            type="text"
            className="mt-1 p-2 w-full rounded-md bg-gray-700 text-white"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
        </label>
        <label className="block text-white text-lg mb-2">
          Senha:
          <input
            type="password"
            className="mt-1 p-2 w-full rounded-md bg-gray-700 text-white"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
        </label>
        <button
          type="button"
          className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-blue-500 hover:to-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-300 ease-in-out"
          onClick={handleRegister}
        >
          Registrar
        </button>
        <p className="text-white mt-2">
          Já tem uma conta?{' '}
          <Link href="/login">
            <label className="text-gray-300 hover:underline">Faça login</label>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
