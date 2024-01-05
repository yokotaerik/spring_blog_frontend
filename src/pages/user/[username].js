import React, { useState, useEffect } from "react";
import Link from "next/link";
import UserProfile from "@/components/UserProfile";
import Layout from "@/components/Layout";
import api from "@/utils/api";
import { useRouter } from "next/router";

const UserPage = () => {

  const router = useRouter();
  const { username } = router.query;
  
  const [page, setPage] = useState('all')
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/user/${username}`);
        setUser(response.data);
      } catch (error) {
        console.error("Erro ao obter informações do usuário", error);
      }
    };

    fetchUserData();
  }, [username]); // Trigger the effect when the username changes

  return (
    <Layout>
      <div className="max-w-xl w-screen">
        <UserProfile user={user} />
        <div className="flex">
          <button> Posts </button>
          <button> Likes </button>
        </div>
        <ul>
        {user?.likes
            ?.slice()
            .reverse()
            .map((post) => (
              <li className="mb-6" key={post.id}>
                <div className="p-4  bg-gray-800 shadow-md">
                  <Link href={`/post/${post.id}`}>
                    <p className="text-gray-600">{post.author}</p>
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
        <ul>
          {user?.posts
            ?.slice()
            .reverse()
            .map((post) => (
              <li className="mb-6" key={post.id}>
                <div className="p-4  bg-gray-800 shadow-md">
                  <Link href={`/post/${post.id}`}>
                    <p className="text-gray-600">{post.author}</p>
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

export default UserPage;
