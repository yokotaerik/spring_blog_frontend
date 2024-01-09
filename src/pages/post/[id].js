import React, { useState, useEffect, useContext } from "react";
import Layout from "../../components/Layout";
import PostDetails from "../../components/PostDetails";
import Comments from "../../components/Comments";
import CommentModal from "@/components/CommentModal";
import api from "@/utils/api";
import { useRouter } from "next/router";
import { AuthContext } from "@/contexts/AuthContext";
import CustomBlueButton from "@/components/CustomBlueButton";

const Post = () => {
  const [post, setPost] = useState({});
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await api.get(`/post/${id}`);
      setPost(response.data);
    } catch (error) {
      console.error("Erro ao obter o post", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAnswer = async (postContent) => {
    try {
      await api.post(`/comment/add/${post.id}`, { content: postContent });
      fetchPost();
    } catch (error) {
      console.error("Erro ao adicionar comentário", error);
    }
  };

  return (
    <Layout>
      <div className="max-w-xl w-full mx-auto p-4">
        <div className="">
          <PostDetails post={post} user={user} onLikeUpdated={fetchPost} />
        </div>

        <div className="w-full flex justify-between items-center bg-gray-700">
          <label className="p-2"> Respostas </label>
          <CustomBlueButton onClick={openModal}>Comente!</CustomBlueButton>
        </div>

        <CommentModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleAnswer}
        />

        <Comments
          comments={post.comments}
          user={user}
          onLikeUpdated={fetchPost}
        />
      </div>
    </Layout>
  );
};

export default Post;
