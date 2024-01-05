import api from "@/utils/api";
import Link from "next/link";
import React from "react";
import { FaComment, FaHeart } from "react-icons/fa";

const PostDetails = ({ post, user, onLikeUpdated }) => {
  const handleLike = async (postId) => {
    try {
      await api.post(`/post/like/${postId}`);
      if (onLikeUpdated) {
        onLikeUpdated();
      }
    } catch (error) {
      console.error("Erro ao processar o like:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-800 shadow-md">
      <Link href={`user/${post.author}`}>
        <p className="text-gray-600 hover:text-blue-400">{post.author}</p>
      </Link>
      <Link href={`/post/${post.id}`}>
        <h3 className="text-xl font-semibold text-blue-500 mb-2">
          {post.title}
        </h3>
        <p className="text-gray-400">{post.content}</p>
      </Link>
      <div className="mt-3 flex gap-4">
        <p className="text-gray-400">
          <Link href={`/post/${post.id}`}>
            <FaComment /> {post.comments.length}
          </Link>
        </p>
        <p className="text-gray-400">
          <button
            className={`text-gray-400 cursor-pointer focus:outline-none ${
              post.likes && post.likes.some((like) => like === user.username)
                ? "text-red-500"
                : ""
            }`}
            onClick={() => handleLike(post.id)}
          >
            <FaHeart /> {post.likes.length}
          </button>
        </p>
      </div>
    </div>
  );
};

export default PostDetails;
