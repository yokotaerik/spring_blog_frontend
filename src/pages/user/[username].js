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
        <UserProfile user={userData} loggedUser={user} follow={fetchUserData} />
        <div className="flex gap-2 my-5">
          <button
            className={`${
              page === "posts" ? "bg-blue-800 text-white" : "bg-blue-500"
            } py-2 px-4 rounded-md w-1/4`}
            onClick={() => setPage("posts")}
          >
            Posts
          </button>
          <button
            className={`${
              page === "likes" ? "bg-blue-800 text-white" : "bg-blue-500"
            } py-2 px-4 rounded-md  w-1/4`}
            onClick={() => setPage("likes")}
          >
            Likes
          </button>
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

export default UserPage;
