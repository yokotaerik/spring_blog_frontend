import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import api from '@/utils/api';

const LoginForm = () => {
  const { signIn } = useContext(AuthContext)
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleLogin = async () => {

      console.log(credentials)
      await signIn(credentials)
  };

  return (
    <div>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
        </label>
        <br />
        <label>
          Senha:
          <input
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
