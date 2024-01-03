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
  },
  input: {
    marginBottom: '10px',
    padding: '8px',
    width: '100vw', // Largura total
    maxWidth: '600px',
    borderRadius: '4px',
    border: '1px solid', // Borda azul brilhante
    backgroundColor: '#333', // Fundo escuro
    color: '#FFFFFF', // Texto claro
  },
  textarea: {
    marginBottom: '10px',
    padding: '8px',
    width: '100%', // Largura total
    minHeight: '150px',
    borderRadius: '4px',
    border: '1px solid', // Borda azul brilhante
    backgroundColor: '#333', // Fundo escuro
    color: '#FFFFFF', // Texto claro
  }
};


const PostModal = ({ isOpen, onClose, onSubmit }) => {
  const [postContent, setPostContent] = useState('');
  const [postTitle, setPostTitle] = useState('');

  const handleSubmit = () => {
    onSubmit(postContent, postTitle);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Enviar Post"
      style={customStyles}
    >
      <h2 style={customStyles.h2}>Lança a braba!</h2>
      <input
        type='text'
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
        style={customStyles.input}
        placeholder="Título"
      />
      <textarea
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        style={customStyles.textarea}
        placeholder="Conteúdo do post"
      />
      <div className='flex gap-3'>
      <button onClick={handleSubmit} className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-indigo-500 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-300 ease-in-out">Enviar</button>
      <button onClick={onClose}  className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-indigo-500 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-300 ease-in-out">Cancelar</button>
      </div>
    </Modal>
  );
};

export default PostModal;