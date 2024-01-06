import React from 'react';

const CustomBlueButtom = ({ onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className="bg-blue-500 text-white py-2 px-4 hover:bg-blue-800 focus:outline-none focus:bg-blue-800 transition-all duration-300 ease-in-out"
  >
    {children}
  </button>
);

export default CustomBlueButtom;