import React, { useState, useEffect } from "react";
import Link from "next/link"; // Import Link from Next.js
import UserProfile from "@/components/UserProfile";
import Layout from "@/components/Layout";
import api from "@/utils/api";

const UserPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/auth/me");
        setUser(response.data);
      } catch (error) {
        console.error("Erro ao obter informações do usuário", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Layout>
      <div className=" max-w-xl w-screen">
        <UserProfile user={user} />
        <ul>
          {user?.posts
            ?.slice()
            .reverse()
            .map((post) => (
              <li className="mb-6" key={post.id}>
                <div className="p-4 bg-gray-300 shadow-md">
                  <Link href={`/post/${post.id}`}>
                    <p className="text-gray-600">{post.author.username}</p>
                    <h3 className="text-xl font-semibold text-blue-500 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-800">{post.content}</p>
                  </Link>
                  <div className="mt-3 flex gap-4">
                    <p className="text-gray-800">Likes</p>
                    <p className="text-gray-800">
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
