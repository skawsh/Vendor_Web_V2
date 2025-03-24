
import React from 'react';

const LaundryLogo: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-2 font-display">
      <img 
        src="/lovable-uploads/60102504-6789-4ff5-b2f2-708130ca1131.png" 
        alt="Skawsh Logo" 
        className="h-28 w-auto" // Increased the height from h-20 to h-28
      />
    </div>
  );
};

export default LaundryLogo;
