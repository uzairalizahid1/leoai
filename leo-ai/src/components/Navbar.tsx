import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Leo AI</div>
      <div>
        {/* User profile and other nav items can go here */}
      </div>
    </nav>
  );
};

export default Navbar;
