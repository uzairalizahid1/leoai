import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Leo AI</div>
      <div>
        <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full">
          {/* TODO: Replace with user avatar */}
          Profile
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
