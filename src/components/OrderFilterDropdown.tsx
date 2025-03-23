
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface OrderFilterDropdownProps {
  onFilterChange?: (filterType: string, value?: any) => void;
}

const OrderFilterDropdown: React.FC<OrderFilterDropdownProps> = ({ onFilterChange }) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    relativeTime: true,
    relativeDate: true
  });

  const handleFilterSelection = (filterType: string) => {
    if (onFilterChange) {
      onFilterChange(filterType);
    }
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    if (onFilterChange) {
      onFilterChange('dateRange', range);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 flex items-center gap-1.5">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0" align="start">
        <div className="rounded-md border shadow-sm divide-y">
          <Accordion type="multiple" defaultValue={["relativeTime", "relativeDate"]} className="w-full">
            <AccordionItem value="relativeTime" className="border-b">
              <AccordionTrigger className="px-4 py-3 text-base font-medium hover:no-underline">
                Relative Time
              </AccordionTrigger>
              <AccordionContent className="px-0 pb-0">
                <div className="grid grid-cols-2 gap-2 p-2">
                  <button 
                    className="text-blue-500 text-left px-3 py-2 hover:bg-gray-50 rounded"
                    onClick={() => handleFilterSelection('last15minutes')}
                  >
                    Last 15 minutes
                  </button>
                  <button 
                    className="text-blue-500 text-left px-3 py-2 hover:bg-gray-50 rounded"
                    onClick={() => handleFilterSelection('last4hours')}
                  >
                    Last 4 hours
                  </button>
                  <button 
                    className="text-blue-500 text-left px-3 py-2 hover:bg-gray-50 rounded"
                    onClick={() => handleFilterSelection('last30minutes')}
                  >
                    Last 30 minutes
                  </button>
                  <button 
                    className="text-blue-500 text-left px-3 py-2 hover:bg-gray-50 rounded"
                    onClick={() => handleFilterSelection('last24hours')}
                  >
                    Last 24 hours
                  </button>
                  <button 
                    className="text-blue-500 text-left px-3 py-2 hover:bg-gray-50 rounded"
                    onClick={() => handleFilterSelection('last60minutes')}
                  >
                    Last 60 minutes
                  </button>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="relativeDate" className="border-b">
              <AccordionTrigger className="px-4 py-3 text-base font-medium hover:no-underline">
                Relative Date
              </AccordionTrigger>
              <AccordionContent className="px-0 pb-0">
                <div className="grid grid-cols-2 gap-2 p-2">
                  <button 
                    className="text-blue-500 text-left px-3 py-2 hover:bg-gray-50 rounded"
                    onClick={() => handleFilterSelection('daily')}
                  >
                    Daily
                  </button>
                  <button 
                    className="text-blue-500 text-left px-3 py-2 hover:bg-gray-50 rounded"
                    onClick={() => handleFilterSelection('monthly')}
                  >
                    Monthly
                  </button>
                  <button 
                    className="text-blue-500 text-left px-3 py-2 hover:bg-gray-50 rounded"
                    onClick={() => handleFilterSelection('yesterday')}
                  >
                    Yesterday
                  </button>
                  <button 
                    className="text-blue-500 text-left px-3 py-2 hover:bg-gray-50 rounded"
                    onClick={() => handleFilterSelection('yearly')}
                  >
                    Yearly
                  </button>
                  <button 
                    className="text-blue-500 text-left px-3 py-2 hover:bg-gray-50 rounded"
                    onClick={() => handleFilterSelection('weekly')}
                  >
                    Weekly
                  </button>
                  <button 
                    className="text-blue-500 text-left px-3 py-2 hover:bg-gray-50 rounded"
                    onClick={() => handleFilterSelection('allTime')}
                  >
                    All time
                  </button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="w-full px-4 py-3 hover:bg-gray-50">
            <button className="w-full flex items-center justify-between" onClick={() => handleFilterSelection('dateRange')}>
              <span className="text-base font-medium">Date Range</span>
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          
          <div className="w-full px-4 py-3 hover:bg-gray-50">
            <button className="w-full flex items-center justify-between" onClick={() => handleFilterSelection('dateTimeRange')}>
              <span className="text-base font-medium">Date & Time Range</span>
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default OrderFilterDropdown;
