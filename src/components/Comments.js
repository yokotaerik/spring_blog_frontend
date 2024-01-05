import Link from 'next/link';
import React from 'react';

const Comments = ({ comments }) => {
  comments = comments || [];

  return (
    <div className="mt-4">
      <h3 className="text-2xl font-semibold mb-2">Respostas</h3>
      {comments.length > 0 ? (
        <ul className="pl-6">
          {comments.map((comment, index) => (
            <li key={index} className="mt-2">
              <Link href={`/user/${comment.author}`}>
                <label className="text-gray-500 hover:text-blue-400">{comment.author}</label>
              </Link>
              <p className="text-gray-300">{comment.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Ninguém se manifestou ainda...</p>
      )}
    </div>
  );
};

export default Comments;
