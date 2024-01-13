import React, { useState } from "react";
import Modal from "react-modal";
import CustomBlueButton from "./CustomBlueButton";
import Link from "next/link";

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
    maxWidth: "600px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo escuro semi-transparente
  },
  h2: {
    marginBottom: "10px", // Espaço abaixo do título
    color: "#64B5F6", // Cor do título
  },
};

const ListModal = ({ isOpen, onClose, list, title }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Enviar Post"
      style={customStyles}
    >
      <div className="flex justify-between items-center w-full">
        <h2 style={customStyles.h2}>{title}</h2>
        <CustomBlueButton onClick={onClose}>X</CustomBlueButton>
      </div>
        <ul className="list-none w-full mt-3">
          {list.map((user, index) => (
            <li key={index} className="bg-slate-700 p-2 m-[1px] shadow-md flex w-full">
              <Link href={`/user/${user}`}>
                <label className="text-white hover:underline">{user}</label>
              </Link>
            </li>
          ))}
        </ul>
    </Modal>
  );
};

export default ListModal;
