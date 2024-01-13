import React, { useState } from "react";
import api from "@/utils/api";
import CustomBlueButton from "./CustomBlueButton";
import AboutMeModal from "./AboutMeModal";
import ListModal from "./ListModal";

const UserProfile = ({ user, loggedUser, sendRequest }) => {
  const [showModal, setShowModal] = useState(false);
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);

  const closeFollowersModal = () => {
    setIsFollowersModalOpen(false);
  };

  const closeFollowingModal = () => {
    setIsFollowingModalOpen(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleUpdateAboutMe = async (content) => {
    try {
      await api.patch("/user/about", { about: content });
      sendRequest();
    } catch (error) {
      console.error("Error updating about me:", error);
    }
  };

  const handleFollow = async () => {
    if (user.username === loggedUser.username) {
      return;
    }

    try {
      await api.post(`/user/follow/${user.username}`);
      sendRequest();
    } catch (e) {
      console.error("Erro ao seguir", e);
    }
  };

  return (
    <div className="pt-4 px-4 bg-gray-800 shadow-md">
      {user ? (
        <>
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold text-white mb-4">
              {user.username}
            </h2>
            {user.username === loggedUser.username ? (
              <div className="">
                <CustomBlueButton onClick={openModal}>
                  Atualizar sobre mim
                </CustomBlueButton>
              </div>
            ) : null}
          </div>
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
              <button onClick={() => setIsFollowersModalOpen(true)}>
                <div className="bg-gray-700 p-2 text-white text-center">
                  <p>
                    Seguidores: {user.followers ? user.followers.length : 0}
                  </p>
                </div>
              </button>
              <ListModal
                title={"Seguidores"}
                list={user.followers}
                isOpen={isFollowersModalOpen}
                onClose={closeFollowersModal}
              />
              <button onClick={() => setIsFollowingModalOpen(true)}>
                <div className="bg-gray-700 p-2 text-white text-center">
                  <p>Seguindo: {user.following ? user.following.length : 0}</p>
                </div>
              </button>
              <ListModal
                title={"Seguindo"}
                list={user.following}
                isOpen={isFollowingModalOpen}
                onClose={closeFollowingModal}
              />
            </div>
          </div>
          <AboutMeModal
            isOpen={showModal}
            onClose={closeModal}
            onUpdateAboutMe={handleUpdateAboutMe}
          />
        </>
      ) : (
        <p className="text-gray-300">Carregando informações do usuário...</p>
      )}
    </div>
  );
};

export default UserProfile;
