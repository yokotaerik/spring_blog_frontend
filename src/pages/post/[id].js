import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import PostDetails from '../../components/PostDetails';
import Comments from '../../components/Comments';
import api from '@/utils/api';
import AnswerForm from '@/components/AnswerForm';
import { useAuth } from '@/contexts/AuthContext';

const Post = ({ initialPost }) => {
  const [post, setPost] = useState(initialPost);

  const handleAnswer = async (answer) => {
    try {
      await api.post(`/comment/add/${post.id}`, { content: answer });

      const response = await api.get(`/post/${post.id}`);
      const updatedPost = response.data;

      setPost(updatedPost);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout>
      <div className="p-4">
        <PostDetails title={post.title} author={post.author.username} content={post.content} />
        <AnswerForm onSubmit={handleAnswer} />
        <Comments comments={post.comments} />
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  try {
    const response = await api.get(`/post/${params.id}`);
    const initialPost = await response.data;

    return {
      props: {
        initialPost,
      },
    };
  } catch (error) {
    console.error('Erro ao obter dados do servidor:', error);
    return {
      props: {
        initialPost: null,
      },
    };
  }
}

export default Post;
