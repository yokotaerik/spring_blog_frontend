import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import PostDetails from '../../components/PostDetails';
import Comments from '../../components/Comments';
import api from '@/utils/api';
import CommentModal from '@/components/CommentModal';

const Post = ({ initialPost }) => {
  const [post, setPost] = useState(initialPost);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAnswer = async (postContent) => {
    try {
      await api.post(`/comment/add/${post.id}`, { content: postContent });

      const response = await api.get(`/post/${post.id}`);
      const updatedPost = response.data;

      setPost(updatedPost);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout>
      <div className="p-4 bg-gray-800 max-w-sm w-screen">
        <PostDetails title={post.title} author={post.author.username} content={post.content} />

        <button
          onClick={openModal}
          className="my-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-indigo-500 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-300 ease-in-out w-full"
        >
          Solta a voz!
        </button>

        <CommentModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleAnswer}
        />

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
