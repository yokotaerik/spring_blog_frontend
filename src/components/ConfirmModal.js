import React, { useState } from "react";
import Modal from "react-modal";
import CustomBlueButton from "./CustomBlueButton";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#1E1E1E", // Fundo escuro
    color: "#FFFFFF", // Texto claro
    border: "none",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column", // Ajuste para coluna
    alignItems: "center", // Alinhar itens ao centro
    width: "60%",
    maxWidth: "300px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo escuro semi-transparente
  },
  h2: {
    marginBottom: "10px", // Espaço abaixo do título
    color: "#64B5F6", // Cor do título
  },
};

const ConfirmModal = ({ isOpen, onClose, title, confirmDelete }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
    >
      <div className="flex justify-between items-center w-full flex-col mb-5">
        <h2 style={customStyles.h2}>{title}</h2>
        <p className="font-black"> ESTA É UMA AÇÂO PERMANENTE </p>
      </div>
      <div className="flex gap-5">
        <button 
        className="bg-red-500 text-white py-2 px-4 hover:bg-red-800 focus:outline-none focus:bg-red-800 transition-all duration-300 ease-in-out"
        onClick={confirmDelete}> Deletar </button>
        <CustomBlueButton onClick={onClose}>Cancelar</CustomBlueButton>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
