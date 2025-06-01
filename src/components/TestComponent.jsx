import React from 'react';

export const TestComponent = () => {
  return (
    <div className="p-8">
      <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition-colors">
        <h2 className="text-2xl font-bold mb-2">Test Component</h2>
        <p className="text-lg">If you see this with blue background and white text, Tailwind is working!</p>
      </div>
    </div>
  );
}; 