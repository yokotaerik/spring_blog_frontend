// pages/post/[id].js
import React from 'react';
import Layout from '../../components/Layout';
import PostDetails from '../../components/PostDetails';
import Comments from '../../components/Comments';
import api from '@/utils/api';

const Post = ({ post }) => {
  return (
    <Layout>
      <div className="p-4">
        <PostDetails title={post.title} author={post.author.username} content={post.content} />
        <Comments comments={post.comments} />
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const response = await api.get(`/post/${params.id}`);
  const post = await response.data;

  return {
    props: {
      post,
    },
  };
}

export default Post;
