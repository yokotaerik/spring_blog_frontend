import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import api from '@/utils/api';
import Link from 'next/link';

const LoginForm = () => {
  const { signIn } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleLogin = async () => {
    console.log(credentials);
    await signIn(credentials);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form className="bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full">
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
        <Link href="/register">
          <p className="text-gray-300 hover:underline mb-4">Cadastre-se</p>
        </Link>
        <button
          type="button"
          className="bg-gradient-to-r from-blue-500 to-sky-700 hover:from-sky-500 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-300 ease-in-out"
          onClick={handleLogin}
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
