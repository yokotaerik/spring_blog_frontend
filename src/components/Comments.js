import Link from "next/link";
import React from "react";

const Comments = ({ comments }) => {
  comments = comments || [];

  return (
    <div className="">
      {comments.length > 0 ? (
        <ul className="bg-gray-800 ">
          {comments.map((comment, index) => (
            <li key={index} className="my-4bg-gray-800 p-4 ">
              <div className="flex items-start">
                <Link href={`/user/${comment.author}`}>
                  <p className="text-blue-400">
                    <span className="font-semibold">{comment.author}</span>
                  </p>
                </Link>
              </div>
              <p className="text-gray-300 mt-2">{comment.content}</p>
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
