
import React from 'react';
import { ChevronRight } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Filter } from 'lucide-react';
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";

interface OrderFilterDropdownProps {
  onFilterChange?: (filterType: string, value?: any) => void;
}

const OrderFilterDropdown: React.FC<OrderFilterDropdownProps> = ({ onFilterChange }) => {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50">
                <span className="text-base font-medium">Relative Time</span>
                <ChevronRight className="h-5 w-5 text-gray-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleFilterSelection('today')}>Today</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterSelection('yesterday')}>Yesterday</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterSelection('thisWeek')}>This Week</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterSelection('lastWeek')}>Last Week</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50">
                <span className="text-base font-medium">Relative Date</span>
                <ChevronRight className="h-5 w-5 text-gray-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleFilterSelection('last7days')}>Last 7 Days</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterSelection('last30days')}>Last 30 Days</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterSelection('last90days')}>Last 90 Days</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterSelection('thisMonth')}>This Month</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterSelection('lastMonth')}>Last Month</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="w-full px-4 py-3 hover:bg-gray-50">
            <button className="w-full flex items-center justify-between" onClick={() => handleFilterSelection('dateRange')}>
              <span className="text-base font-medium">Date Range</span>
              <ChevronRight className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          
          <div className="w-full px-4 py-3 hover:bg-gray-50">
            <button className="w-full flex items-center justify-between" onClick={() => handleFilterSelection('dateTimeRange')}>
              <span className="text-base font-medium">Date & Time Range</span>
              <ChevronRight className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default OrderFilterDropdown;
