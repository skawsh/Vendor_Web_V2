
import React from 'react';

const LaundryLogo: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-2 font-display">
      <div className="relative shadow-lg rounded-full p-4 bg-white">
        <img 
          src="/lovable-uploads/d18d94bb-a863-41b6-b5b1-635b38e3fe6a.png" 
          alt="Skawsh Logo" 
          className="h-32 w-auto" 
        />
      </div>
    </div>
  );
};

export default LaundryLogo;
