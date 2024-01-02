import React from 'react';

const Comments = ({ comments }) => {
  return (
    <div className="mt-4">
      <h3 className="text-2xl font-semibold mb-2">Respostas</h3>
      {comments.length > 0 ? (
        <ul className="list-disc pl-6">
          {comments.map((comment, index) => (
            <li key={index} className="mt-2">
              <p className="text-gray-500">{comment.author}</p>
              <p className="text-gray-300">{comment.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Ninguem ta nem ai ...</p>
      )}
    </div>
  );
};

export default Comments;
