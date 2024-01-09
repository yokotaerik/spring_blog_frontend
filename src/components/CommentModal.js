import React, { useState } from 'react';
import Modal from 'react-modal';
import CustomBlueButton from './CustomBlueButton';

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
    marginBottom: '10px', // Espaço abaixo do título
    color: '#64B5F6', // Cor do título
  },
  textarea: {
    marginBottom: '10px',
    padding: '8px',
    width: '100%', // Largura total
    maxWidth: '600px',
    minWidth: '300px',
    minHeight: '150px',
    border: '1px solid #64B5F6', // Borda azul
    backgroundColor: '#333', // Fundo escuro
    color: '#FFFFFF', // Texto claro
  },
  buttonsContainer: {
    display: 'flex',
    gap: '10px',
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
      <h2 style={customStyles.h2}>Comente!</h2>
      <textarea
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        style={customStyles.textarea}
        placeholder="Conteúdo do post"
      />
      <div style={customStyles.buttonsContainer}>
        <CustomBlueButton onClick={handleSubmit}>
          Enviar
        </CustomBlueButton>
        <CustomBlueButton onClick={onClose} >
          Cancelar
        </CustomBlueButton>
      </div>
    </Modal>
  );
};

export default CommentModal;
