import Link from "next/link";
import React, { useState, useEffect } from "react";
import api from "@/utils/api";
import Layout from "@/components/Layout";

const PostsList = () => {
  const [posts, setPosts] = useState([]);

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
        <h2 className="text-2xl font-bold mb-4">O que há de novo</h2>
        <ul>
          {posts
            .slice()
            .reverse()
            .map((post) => (
              <li className="mb-6">
                <div className="p-4 bg-white shadow-md">
                  <Link href={`/post/${post.id}`} key={post.id}>
                    <p className="text-gray-600">{post.author.username}</p>
                    <h3 className="text-xl font-semibold text-blue-500 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-800">{post.content}</p>
                  </Link>
                  <div className="mt-3 flex gap-4">
                    <p className="text-gray-800">Likes</p>
                    <p className="text-gray-800">Respostas {post.comments.length}</p>
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
