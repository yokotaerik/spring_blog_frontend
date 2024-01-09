import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import api from "@/utils/api";
import Layout from "@/components/Layout";
import PostModal from "@/components/PostModal";
import { AuthContext } from "@/contexts/AuthContext";
import PostDetails from "@/components/PostDetails";

const PostsList = () => {
  const [selectedOption, setSelectedOption] = useState("all");
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

  const fetchFeed = async () => {
    try {
      const response = await api.get(`/user/feed`);
      setPosts(response.data);
    } catch (error) {
      console.error("Erro ao buscar feed:", error);
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
      <div className=" max-w-xl w-full">
        <div className="mb-6 flex justify-between p-4">
          <h2 className="text-3xl font-bold">O que há de novo?</h2>
          <button
            onClick={openModal}
            className="bg-gray-500 text-white py-2 px-4 hover:bg-blue-800 focus:outline-none focus:bg-blue-800 transition-all duration-300 ease-in-out"
          >
            {" "}
            Postar
          </button>
        </div>

        <div className=" flex ">
          <OptionButton
            onClick={() => {
              fetchPosts();
              setSelectedOption("all");
            }}
            selected={selectedOption === "all"}
          >
            Recentes
          </OptionButton>

          <OptionButton
            onClick={() => {
              fetchFeed();
              setSelectedOption("following");
            }}
            selected={selectedOption === "following"}
          >
            Para você
          </OptionButton>
        </div>

        <PostModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handlePostSubmit}
        />

        <ul className="">
          {posts.map((post) => (
            <PostDetails
              key={post.id}
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

const OptionButton = ({ onClick, selected, children }) => (
  <button
    onClick={onClick}
    className={`w-full py-2 ${
      selected ? "bg-blue-600 text-white" : "bg-blue-500 text-gray-100"
    } hover:bg-blue-700 focus:outline-none focus:bg-blue-700 transition-all duration-300 ease-in-out`}
  >
    {children}
  </button>
);

export default PostsList;
