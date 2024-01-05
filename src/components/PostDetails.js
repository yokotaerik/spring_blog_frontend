import React from 'react';

const PostDetails = ({ post }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
      <p className="text-gray-500">Autor: {post.author}  </p>
      <p className="text-gray-300 mt-2">{post.content}</p>
    </div>
  );
};

export default PostDetails;
