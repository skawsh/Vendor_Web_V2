
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Filter, Calendar, Clock } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { Input } from "@/components/ui/input";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

interface OrderFilterDropdownProps {
  onFilterChange?: (filterType: string, value?: any) => void;
}

const OrderFilterDropdown: React.FC<OrderFilterDropdownProps> = ({ onFilterChange }) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    relativeTime: true,
    relativeDate: true,
    dateRange: false,
    dateTimeRange: false
  });
  const [fromTime, setFromTime] = useState<string>("12:00 AM");
  const [toTime, setToTime] = useState<string>("11:59 PM");

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

  const toggleSection = (section: string) => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section]
    });
  };
  
  const applyDateRange = () => {
    if (dateRange && dateRange.from) {
      onFilterChange && onFilterChange('appliedDateRange', dateRange);
    }
  };
  
  const applyDateTimeRange = () => {
    if (dateRange && dateRange.from) {
      const dateTimeRange = {
        ...dateRange,
        fromTime,
        toTime
      };
      onFilterChange && onFilterChange('appliedDateTimeRange', dateTimeRange);
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
      <PopoverContent className="w-[320px] p-0" align="start">
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

            <AccordionItem value="dateRange" className="border-b">
              <AccordionTrigger className="px-4 py-3 text-base font-medium hover:no-underline">
                Date Range
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3">
                <div className="space-y-4">
                  <div>
                    <p className="mb-2 font-medium">From:</p>
                    <div className="relative">
                      <Input 
                        placeholder="Select start date" 
                        className="pl-3 h-12" 
                        value={dateRange?.from ? format(dateRange.from, "MMM dd, yyyy") : ""}
                        readOnly
                      />
                      <Calendar className="absolute right-3 top-3 text-gray-400" size={20} />
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 font-medium">To:</p>
                    <div className="relative">
                      <Input 
                        placeholder="Select end date" 
                        className="pl-3 h-12" 
                        value={dateRange?.to ? format(dateRange.to, "MMM dd, yyyy") : ""}
                        readOnly
                      />
                      <Calendar className="absolute right-3 top-3 text-gray-400" size={20} />
                    </div>
                  </div>
                  <DateRangePicker 
                    date={dateRange} 
                    onDateChange={setDateRange} 
                    className="hidden"
                  />
                  <Button 
                    className="w-full bg-gray-500 hover:bg-gray-600 text-white"
                    onClick={applyDateRange}
                  >
                    Apply Date Range
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="dateTimeRange" className="border-b">
              <AccordionTrigger className="px-4 py-3 text-base font-medium hover:no-underline">
                Date & Time Range
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3">
                <div className="space-y-4">
                  <div>
                    <p className="mb-2 font-medium">From Date:</p>
                    <div className="relative">
                      <Input 
                        placeholder="Select start date" 
                        className="pl-3 h-12" 
                        value={dateRange?.from ? format(dateRange.from, "MMM dd, yyyy") : ""}
                        readOnly
                      />
                      <Calendar className="absolute right-3 top-3 text-gray-400" size={20} />
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 font-medium">From Time:</p>
                    <div className="relative">
                      <Select 
                        defaultValue={fromTime} 
                        onValueChange={setFromTime}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {["12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM", 
                            "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
                            "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
                            "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"
                          ].map(time => (
                            <SelectItem key={time} value={time}>{time}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Clock className="absolute right-9 top-3 text-gray-400" size={20} />
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 font-medium">To Date:</p>
                    <div className="relative">
                      <Input 
                        placeholder="Select end date" 
                        className="pl-3 h-12" 
                        value={dateRange?.to ? format(dateRange.to, "MMM dd, yyyy") : ""}
                        readOnly
                      />
                      <Calendar className="absolute right-3 top-3 text-gray-400" size={20} />
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 font-medium">To Time:</p>
                    <div className="relative">
                      <Select 
                        defaultValue={toTime} 
                        onValueChange={setToTime}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {["12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM", 
                            "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
                            "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
                            "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:59 PM"
                          ].map(time => (
                            <SelectItem key={time} value={time}>{time}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Clock className="absolute right-9 top-3 text-gray-400" size={20} />
                    </div>
                  </div>
                  <DateRangePicker 
                    date={dateRange} 
                    onDateChange={setDateRange} 
                    className="hidden"
                  />
                  <Button 
                    className="w-full bg-gray-500 hover:bg-gray-600 text-white"
                    onClick={applyDateTimeRange}
                  >
                    Apply Date & Time Range
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default OrderFilterDropdown;
