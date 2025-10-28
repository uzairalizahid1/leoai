import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Leo AI</h2>
      <nav>
        <ul>
          <li className="mb-2"><a href="/dashboard" className="hover:text-gray-300">Dashboard</a></li>
          <li className="mb-2"><a href="/lectures" className="hover:text-gray-300">Lectures</a></li>
          <li className="mb-2"><a href="/analytics" className="hover:text-gray-300">Analytics</a></li>
          <li className="mb-2"><a href="/settings" className="hover:text-gray-300">Settings</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
