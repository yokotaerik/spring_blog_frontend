import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import api from "@/utils/api";
import Layout from "@/components/Layout";
import PostModal from "@/components/PostModal";
import { FaHeart, FaComment } from "react-icons/fa"; // Importe os ícones específicos que você precisa
import { AuthContext } from "@/contexts/AuthContext";
import PostDetails from "@/components/PostDetails";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, isAuthenticated, signOut } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
    } else {
      console.log("Usuário não autenticado");
    }
  }, [user, isAuthenticated]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchPosts = async () => {
    try {
      const response = await api.get(`/post/all`);
      setPosts(response.data);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    }
  };

  const handlePostSubmit = async (postContent, postTitle) => {
    const data = {
      title: postTitle,
      content: postContent,
    };

    try {
      await api.post("/post/create", data);
      fetchPosts();
    } catch (e) {
      console.log(e);
    }

    console.log("Conteúdo do post:", postContent, postTitle);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Layout>
      <div className="p-4">
        <div className="flex justify-between p-3 mb-2 gap-10">
          <h2 className="text-2xl font-bold">O que há de novo ?</h2>
          <button
            onClick={openModal}
            className="bg-gradient-to-r from-blue-500 to-sky-700 hover:from-sky-500 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-300 ease-in-out"
          >
            Lançar a braba
          </button>
        </div>

        <PostModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handlePostSubmit}
        />
        <ul>
          {posts
            .slice()
            .reverse()
            .map((post) => (
              <PostDetails
                post={post}
                user={user}
                onLikeUpdated={fetchPosts}
              />
            ))}
        </ul>
      </div>
    </Layout>
  );
};

export default PostsList;
