import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import api from '@/utils/api';
import Link from 'next/link';
import CustomBlueButtom from './CustomBlueButton';

const LoginForm = () => {
  const { signIn } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleLogin = async () => {
    console.log(credentials);
    await signIn(credentials);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form className="bg-gray-800 p-8 shadow-md max-w-lg w-full">
        <label className="block text-white text-lg mb-2">
          Username
          <input
            type="text"
            className="mt-1 p-2 w-full bg-gray-700 text-white"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
        </label>
        <label className="block text-white text-lg mb-5">
          Senha
          <input
            type="password"
            className="mt-1 p-2 w-full bg-gray-700 text-white"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
        </label>

        <CustomBlueButtom
          type="button"
          className="bg-blue-500 text-white py-2 px-4 hover:bg-blue-800 focus:outline-none focus:bg-blue-800 transition-all duration-300 ease-in-out"
          onClick={handleLogin}
        >
          Entrar
        </CustomBlueButtom>

          <p className='mt-5'> Não possui uma conta? </p>
        <Link href="/register">
          <label className="text-gray-300 hover:underline hover:text-blue-500 mb-4">Cadastre-se</label>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
