
import React from 'react';
import { Shirt } from 'lucide-react';

const LaundryLogo: React.FC = () => {
  return (
    <div className="flex items-center gap-2 font-display">
      <div className="h-8 w-8 rounded-full bg-laundry-500 flex items-center justify-center">
        <Shirt className="h-5 w-5 text-white" />
      </div>
      <span className="font-semibold text-lg tracking-tight text-laundry-800">LAUNDRY</span>
    </div>
  );
};

export default LaundryLogo;
