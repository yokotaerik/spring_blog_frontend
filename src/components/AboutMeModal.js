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
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo escuro semi-transparente
  },
  h2: {
    marginBottom: "20px", // Espaço abaixo do título
  },
  input: {
    marginBottom: "10px",
    padding: "8px",
    width: "100%", // Largura total
    maxWidth: "600px",
    border: "1px solid #64B5F6", // Borda azul
    backgroundColor: "#333", // Fundo escuro
    color: "#FFFFFF", // Texto claro
  },
  textarea: {
    marginBottom: "10px",
    padding: "8px",
    width: "100%", // Largura total
    minHeight: "150px",
    minWidth: "350px",
    border: "1px solid #64B5F6", // Borda azul
    backgroundColor: "#333", // Fundo escuro
    color: "#FFFFFF", // Texto claro
  },
};


const AboutMeModal = ({ isOpen, onClose, onUpdateAboutMe }) => {
  const [aboutMeContent, setAboutMeContent] = useState("");

  const handleSubmit = () => {
    onUpdateAboutMe(aboutMeContent);
    setAboutMeContent("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Atualizar Sobre Mim"
      style={customStyles}
    >
      <h2 style={customStyles.h2}>Atualizar Sobre Mim</h2>
      <textarea
        value={aboutMeContent}
        onChange={(e) => setAboutMeContent(e.target.value)}
        style={customStyles.textarea}
        placeholder="Conte sobre você"
      />
      <div style={{ display: "flex", gap: "10px" }}>
        <CustomBlueButton onClick={handleSubmit}>Atualizar</CustomBlueButton>
        <CustomBlueButton onClick={onClose}>Cancelar</CustomBlueButton>
      </div>
    </Modal>
  );
};

export default AboutMeModal;
