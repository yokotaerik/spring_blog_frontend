import React from 'react';
import Layout from '../components/Layout';
import LoginForm from '@/components/LoginForm';

const HomePage = () => {
  return (
    <Layout>
      <h2>Login</h2>
      <LoginForm />
    </Layout>
  );
};

export default HomePage;
