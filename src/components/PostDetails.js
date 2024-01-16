import api from "@/utils/api";
import Link from "next/link";
import React, { useState } from "react";
import { Heart, MessageSquare, Trash } from "react-feather";
import ListModal from "./ListModal";
import ConfirmModal from "./ConfirmModal";

const PostDetails = ({ post, user, onLikeUpdated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true);
    console.log(post.likes)
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openConfirmModal = () => {
    setIsConfirmModalOpen(true);
    console.log(post.likes)
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };


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

  const handleDelete = async (id) => {
    try {
      await api.delete(`/post/${id}`);
      closeConfirmModal();
      onLikeUpdated();
      }
     catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  return (
    <div>
      {post && user ? (
        <div className="p-4 bg-gray-800 shadow-md">
          <div className="flex justify-between">
          <Link href={`/user/${post.author}`}>
            <p className="text-gray-600 hover:text-blue-400">{post.author}</p>
          </Link>

          <button onClick={openConfirmModal}>
          {post.author == user.username ? <Trash className="text-red-500 w-3/4 h-3/4" /> : null }
          </button>
          <ConfirmModal isOpen={isConfirmModalOpen} onClose={closeConfirmModal} confirmDelete={() => handleDelete(post.id)} title={"Tem certeza que deseja deletar esse post?"} />
          
          </div>
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
              <div className="flex gap-2">
                <button
                  className={`text-gray-400 cursor-pointer focus:outline-none ${
                    post.likes &&
                    post.likes.some((like) => like === user.username)
                      ? "text-red-500"
                      : ""
                  }`}
                  onClick={() => handleLike(post.id)}
                >
                  <Heart />
                </button>
                <button onClick={openModal}>
                  {post.likes ? post.likes.length : 0}
                </button>
              </div>
            </p>
          </div>
        </div>
      ) : (
        <p>Ops... nada por aqui</p>
      )}
      <ListModal
        isOpen={isModalOpen}
        onClose={closeModal}
        list={post.likes}
        title={"Quem curtiu"}
      />
    </div>
  );
};

export default PostDetails;
