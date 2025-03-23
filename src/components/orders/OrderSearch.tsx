
import React from 'react';
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

interface OrderSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const OrderSearch: React.FC<OrderSearchProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative flex-1 max-w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      <Input
        type="text"
        placeholder="Search Order ID, Cust..."
        className="pl-10 pr-10 py-2 h-12 rounded-md w-full border-2"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <button 
          onClick={() => setSearchQuery("")}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default OrderSearch;
