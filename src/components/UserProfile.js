// UserProfile.js

import api from "@/utils/api";
import React, { useState, useEffect } from "react";

const UserProfile = ({ user }) => {

  return (
    <div className="p-4">
      {user ? (
        <>
          <h2 className="text-3xl font-bold mb-4">{user.username}</h2>
          <div className="mb-4">
            <p className="text-gray-600">Email: {user.email}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">Sobre Mim:</label>
            <p>{user.about}</p>
          </div>
        </>
      ) : (
        <p>Carregando informações do usuário...</p>
      )}
    </div>
  );
};

export default UserProfile;
