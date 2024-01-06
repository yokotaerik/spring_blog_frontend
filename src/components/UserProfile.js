import React from "react";
import api from "@/utils/api";

const UserProfile = ({ user, loggedUser, follow }) => {
  const handleFollow = async () => {
    if (user.username === loggedUser.username) {
      return;
    }

    try {
      await api.post(`/user/follow/${user.username}`);
      follow();
    } catch (e) {
      console.error("Erro ao seguir", e);
    }
  };

  return (
    <div className="pt-4 px-4 bg-gray-800 shadow-md">
      {user ? (
        <>
          <h2 className="text-3xl font-bold text-white mb-4">{user.username}</h2>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2">Sobre:</label>
            <p className="text-gray-300">{user.about}</p>
          </div>
          <div className="flex gap-5 items-center justify-between">
            <button
              onClick={handleFollow}
              className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 shadow-md focus:outline-none transition-all duration-300 ease-in-out my-4 ${
                user.username === loggedUser.username ||
                (user.followers && user.followers.includes(loggedUser.username))
                  ? "bg-gray-600"
                  : ""
              }`}
            >
              {user.username === loggedUser.username ||
              (user.followers && user.followers.includes(loggedUser.username))
                ? "Seguindo"
                : "Seguir"}
            </button>
            <div className="flex gap-2">
              <div className="bg-gray-700 p-2 text-white text-center">
                <p>Seguidores: {user.followers ? user.followers.length : 0}</p>
              </div>
              <div className="bg-gray-700 p-2 text-white text-center">
                <p>Seguindo: {user.following ? user.following.length : 0}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-gray-300">Carregando informações do usuário...</p>
      )}
    </div>
  );
};

export default UserProfile;
