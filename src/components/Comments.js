import api from "@/utils/api";
import Link from "next/link";
import React, { useState } from "react";
import { Heart, Trash } from "react-feather";
import ConfirmModal from "./ConfirmModal";

const Comments = ({ comments, user, onLikeUpdated }) => {
  comments = comments || [];
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const openConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const handleLike = async (id) => {
    try {
      await api.post(`/like/${id}`);
      onLikeUpdated();
    } catch (error) {
      console.error("Erro ao processar o like:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/comment/${id}`);
      onLikeUpdated();
    } catch (error) {
      console.error("Erro ao deletar comentario");
    }
  };

  return (
    <div className="">
      {comments.length > 0 ? (
        <ul className="bg-gray-800">
          {comments.map((comment, index) => (
            <li key={index} className=" bg-gray-800 p-4">
              <div className="flex items-start justify-between">
                <Link href={`/user/${comment.author}`}>
                  <p className="text-blue-400">
                    <span className="font-semibold">{comment.author}</span>
                  </p>
                </Link>
                <button onClick={openConfirmModal}>
                  {comment.author == user.username ? (
                    <Trash className="text-red-500 w-3/4 h-3/4" />
                  ) : null}
                </button>
                <ConfirmModal
                  isOpen={isConfirmModalOpen}
                  onClose={closeConfirmModal}
                  confirmDelete={() => handleDelete(comment.id)}
                  title={"Tem certeza que deseja deletar esse comentario?"}
                />
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
