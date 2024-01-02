import React, { useState } from 'react';

const AnswerForm = ({ onSubmit }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(answer);
    setAnswer('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Resposta:
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </label>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
        Enviar Resposta
      </button>
    </form>
  );
};
 
export default AnswerForm
