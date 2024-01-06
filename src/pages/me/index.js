import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import api from "@/utils/api";
import Layout from "@/components/Layout";
import PostModal from "@/components/PostModal";
import { FaHeart, FaComment } from "react-icons/fa";
import PostDetails from "@/components/PostDetails";
import UserProfile from "@/components/UserProfile";

const MePage = () => {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("posts");

  const fetchUserData = async () => {
    try {
      const response = await api.get("/auth/me");
      setUser(response.data);
    } catch (error) {
      console.error("Erro ao obter informações do usuário", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Layout>
      <div className="max-w-xl w-screen">
        <UserProfile user={user} loggedUser={user} follow={fetchUserData}/>
        <div className="flex flex-col gap-2 mt-5">
          <div className="flex-1 bg-blue-500 h-2"></div> {/* Barra contínua */}
          <div className="flex">
            <MePageButton
              onClick={() => setPage("posts")}
              selected={page === "posts"}
            >
              Posts
            </MePageButton>

            <MePageButton
              onClick={() => setPage("likes")}
              selected={page === "likes"}
            >
              Likes
            </MePageButton>
          </div>
        </div>
        {page === "posts" ? (
          <ul>
            {user?.posts && user.posts.length > 0 ? (
              user.posts
                .slice()
                .reverse()
                .map((post) => (
                  <PostDetails
                    post={post}
                    user={user}
                    onLikeUpdated={fetchUserData}
                  />
                ))
            ) : (
              <p className="text-gray-500 mt-4">Nada por aqui...</p>
            )}
          </ul>
        ) : (
          <ul>
            {user?.likes && user.likes.length > 0 ? (
              user.likes
                .slice()
                .reverse()
                .map((post) => (
                  <PostDetails
                    post={post}
                    user={user}
                    onLikeUpdated={fetchUserData}
                  />
                ))
            ) : (
              <p className="text-gray-500 mt-4">Não curtiu nada...</p>
            )}
          </ul>
        )}
      </div>
    </Layout>
  );
};

const MePageButton = ({ onClick, selected, children }) => (
  <button
    onClick={onClick}
    className={`py-2 px-4 w-full ${
      selected ? "bg-blue-600 text-white" : "bg-blue-500 text-gray-100"
    } hover:bg-blue-700 focus:outline-none focus:bg-blue-700 transition-all duration-300 ease-in-out`}
  >
    {children}
  </button>
);

export default MePage;
