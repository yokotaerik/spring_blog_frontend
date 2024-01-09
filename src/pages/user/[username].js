import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import UserProfile from "@/components/UserProfile";
import Layout from "@/components/Layout";
import api from "@/utils/api";
import { useRouter } from "next/router";
import PostDetails from "@/components/PostDetails";
import { AuthContext } from "@/contexts/AuthContext";

const UserPage = () => {
  const router = useRouter();
  const { username } = router.query;
  const { user } = useContext(AuthContext);

  const [page, setPage] = useState("posts");
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await api.get(`/user/${username}`);
      setUserData(response.data);
    } catch (error) {
      console.error("Erro ao obter informações do usuário", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [username]);

  return (
    <Layout>
      <div className="max-w-xl w-screen">
        <UserProfile
          user={userData}
          loggedUser={user}
          sendRequest={fetchUserData}
        />
        <div className="flex flex-col gap-2 mt-5">
          <div className="flex-1 bg-blue-500 h-2"></div>
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
            {userData?.posts && userData.posts.length > 0 ? (
              userData.posts
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
            {userData?.likes && userData.likes.length > 0 ? (
              userData.likes
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

export default UserPage;
