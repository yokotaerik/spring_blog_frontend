// UserProfile.js

import api from "@/utils/api";
import React, { useState, useEffect } from "react";

const UserProfile = ({ user, loggedUser , follow}) => {
  const handleFollow = async () => {
    if (user.username === loggedUser.username) {
      return;
    }

    try {
      await api.post(`/user/follow/${user.username}`);
      follow()
    } catch (e) {
      console.error("Erro ao seguir", e);
    }
  };

  return (
    <div className="p-4">
      {user ? (
        <>
          <h2 className="text-3xl font-bold mb-4">{user.username}</h2>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">Sobre:</label>
            <p>{user.about}</p>
          </div>
          <div className="flex gap-5 items-center">
            <button
              onClick={handleFollow}
              className="bg-gradient-to-r from-blue-500 to-sky-700 hover:from-sky-500 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-300 ease-in-out my-4"
            >
              {user.username === loggedUser.username ||
              (user.followers && user.followers.includes(loggedUser.username))
                ? "Seguindo"
                : "Seguir"}
            </button>
            <p>Seguidores: {user.followers ? user.followers.length : 0}</p>
            <p>Seguindo: {user.following ? user.following.length : 0} </p>
          </div>
        </>
      ) : (
        <p>Carregando informações do usuário...</p>
      )}
    </div>
  );
};

export default UserProfile;
