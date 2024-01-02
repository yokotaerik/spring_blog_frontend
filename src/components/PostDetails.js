import React from 'react';

const PostDetails = ({ title, author, content }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-gray-500">Autor: {author}</p>
      <p className="text-gray-300 mt-2">{content}</p>
    </div>
  );
};

export default PostDetails;
