import api from "@/utils/api";
import Link from "next/link";
import React from "react";
import { Heart, MessageSquare } from "react-feather";

const PostDetails = ({ post, user, onLikeUpdated }) => {
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
    <div>
      {post ? (
        <div className="p-4 bg-gray-800 shadow-md">
          <Link href={`/user/${post.author}`}>
            <p className="text-gray-600 hover:text-blue-400">{post.author}</p>
          </Link>
          <Link href={`/post/${post.id}`}>
            <h3 className="text-2xl font-semibold text-blue-500 mb-2">
              {post.title}
            </h3>
            <p className="text-gray-400 text-lg">{post.content}</p>
          </Link>
          <div className="mt-3 flex gap-4">
            <p className="text-gray-400">
              <Link href={`/post/${post.id}`}>
                <div className="flex gap-2">
                  <MessageSquare />
                  {post.comments ? post.comments.length : 0}
                </div>
              </Link>
            </p>
            <p className="text-gray-400">
              <button
                className={`text-gray-400 cursor-pointer focus:outline-none ${
                  post.likes &&
                  post.likes.some((like) => like === user.username)
                    ? "text-red-500"
                    : ""
                }`}
                onClick={() => handleLike(post.id)}
              >
                <div className="flex gap-2">
                  <Heart />
                  {post.likes ? post.likes.length : 0}
                </div>
              </button>
            </p>
          </div>
        </div>
      ) : (
        <p>Ops... nada por aqui</p>
      )}
    </div>
  );
};

export default PostDetails;
