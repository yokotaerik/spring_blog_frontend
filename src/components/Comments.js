import api from "@/utils/api";
import Link from "next/link";
import React from "react";
import { Heart } from "react-feather";

const Comments = ({ comments, user, onLikeUpdated }) => {
  comments = comments || [];

  const handleLike = async (id) => {
    try {
      await api.post(`/like/${id}`);
      if (onLikeUpdated) {
        onLikeUpdated();
      }
    } catch (error) {
      console.error("Erro ao processar o like:", error);
    }
  };

  return (
    <div className="">
      {comments.length > 0 ? (
        <ul className="bg-gray-800">
          {comments.map((comment, index) => (
            <li key={index} className=" bg-gray-800 p-4">
              <div className="flex items-start">
                <Link href={`/user/${comment.author}`}>
                  <p className="text-blue-400">
                    <span className="font-semibold">{comment.author}</span>
                  </p>
                </Link>
              </div>
              <p className="text-gray-300 mt-2">{comment.content}</p>
              <button
                className={`text-gray-400 cursor-pointer focus:outline-none ${
                  comment.likes &&
                  comment.likes.some((like) => like === user.username)
                    ? "text-red-500"
                    : ""
                }`}
                onClick={() => handleLike(comment.id)}
              >
                <div className="flex gap-2 mt-2">
                <Heart />
                 {comment.likes ? comment.likes.length : 0}
                </div>
              </button>
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
