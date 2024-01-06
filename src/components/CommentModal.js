import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#1E1E1E', // Fundo escuro
    color: '#FFFFFF', // Texto claro
    border: 'none',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column', // Ajuste para coluna
    alignItems: 'center', // Alinhar itens ao centro
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escuro semi-transparente
  },
  h2: {
    marginBottom: '20px', // Espaço abaixo do título
    color: '#64B5F6', // Cor do título
  },
  textarea: {
    marginBottom: '10px',
    padding: '8px',
    width: '100%', // Largura total
    maxWidth: '600px',
    minHeight: '150px',
    borderRadius: '4px',
    border: '1px solid #64B5F6', // Borda azul
    backgroundColor: '#333', // Fundo escuro
    color: '#FFFFFF', // Texto claro
  },
  buttonsContainer: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    background: 'linear-gradient(to right, #2196F3, #64B5F6)',
    color: '#FFFFFF',
    fontWeight: 'bold',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
};

const CommentModal = ({ isOpen, onClose, onSubmit }) => {
  const [postContent, setPostContent] = useState('');

  const handleSubmit = () => {
    if (postContent.trim() !== '') {
      onSubmit(postContent.trim());
      setPostContent('');
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Enviar Post"
      style={customStyles}
    >
      <h2 style={customStyles.h2}>Opine</h2>
      <textarea
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        style={customStyles.textarea}
        placeholder="Conteúdo do post"
      />
      <div style={customStyles.buttonsContainer}>
        <button onClick={handleSubmit} style={customStyles.button}>
          Enviar
        </button>
        <button onClick={onClose} style={customStyles.button}>
          Cancelar
        </button>
      </div>
    </Modal>
  );
};

export default CommentModal;
