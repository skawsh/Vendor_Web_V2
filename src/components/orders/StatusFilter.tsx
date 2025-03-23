
import React from 'react';
import { Button } from "@/components/ui/button";
import { Filter, ChevronUp, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface StatusFilterProps {
  statusOptions: string[];
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  isFilterSectionOpen: boolean;
  setIsFilterSectionOpen: (open: boolean) => void;
}

const StatusFilter: React.FC<StatusFilterProps> = ({
  statusOptions,
  statusFilter,
  setStatusFilter,
  isFilterSectionOpen,
  setIsFilterSectionOpen
}) => {
  return (
    <>
      <Collapsible 
        open={isFilterSectionOpen} 
        onOpenChange={setIsFilterSectionOpen}
        className="md:hidden mb-4 rounded-t-lg overflow-hidden"
      >
        <CollapsibleTrigger className="flex w-full justify-between items-center p-3 bg-[#0F7EA3] text-white">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter by Status</span>
          </div>
          {isFilterSectionOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="bg-[#0F7EA3] p-2">
          <div className="space-y-2">
            {statusOptions.map((status) => (
              <Button 
                key={status}
                className={`
                  w-full ${statusFilter === status 
                    ? 'bg-[#0F7EA3] text-white border-2 border-white' 
                    : 'bg-white text-black border-2 border-white'} 
                  rounded-md px-4 py-2
                `}
                onClick={() => setStatusFilter(status)}
              >
                {status}
              </Button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      <div className="hidden md:flex flex-wrap p-2 bg-[#0F7EA3] rounded-t-lg overflow-x-auto">
        {statusOptions.map((status) => (
          <Button 
            key={status}
            className={`
              ${statusFilter === status 
                ? 'bg-[#0F7EA3] text-white border-2 border-white' 
                : 'bg-white text-black border-2 border-white'} 
              rounded-md px-4 py-2 m-1
            `}
            onClick={() => setStatusFilter(status)}
          >
            {status}
          </Button>
        ))}
      </div>
    </>
  );
};

export default StatusFilter;
