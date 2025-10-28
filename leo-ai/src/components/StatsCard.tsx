import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-secondary rounded-lg p-6 shadow-md flex items-center">
      {icon && <div className="mr-4">{icon}</div>}
      <div>
        <h4 className="text-sm text-gray-400 font-medium">{title}</h4>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
