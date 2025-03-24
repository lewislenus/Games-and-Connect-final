import React from 'react';

const ShoeCategories: React.FC = () => {
  const classics: string[] = [
    "Air Max",
    "Blazer",
    "Air Jordan 1",
    "Dunk",
    "Air Force 1",
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Shop The Classics</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {classics.map((item, index) => (
          <button
            key={index}
            className="p-4 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200 border border-gray-200 hover:border-gray-300"
          >
            <span className="text-lg font-medium">{item}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShoeCategories;