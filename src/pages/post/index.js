import Link from "next/link";
import React, { useState, useEffect } from "react";
import api from "@/utils/api";
import Layout from "@/components/Layout";
import PostModal from "@/components/PostModal";


const PostsList = () => {
  const [posts, setPosts] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePostSubmit = async (postContent, postTitle) => {

    const data = {
      title: postTitle,
      content: postContent
    }

    try{
      await api.post("/post/create", data)
    }
    catch(e) {
      console.log(e)
    }

    console.log("Conteúdo do post:", postContent , postTitle);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get(`/post/all`);
        setPosts(response.data);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      }
    };

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
              <li className="mb-6" key={post.id}>
                <div className="p-4  bg-gray-800 shadow-md">
                  <Link href={`user/${post.author.username}`}>  <p className="text-gray-600 hover:text-blue-400">{post.author.username}</p> </Link>
                  <Link href={`/post/${post.id}`}>
                    <h3 className="text-xl font-semibold text-blue-500 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-400">{post.content}</p>
                  </Link>
                  <div className="mt-3 flex gap-4">
                    <p className="text-gray-400">Likes</p>
                    <p className="text-gray-400">
                      Respostas {post.comments.length}
                    </p>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </Layout>
  );
};

export default PostsList;
