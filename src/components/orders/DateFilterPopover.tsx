
import React from 'react';
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { Calendar } from "lucide-react";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface DateFilterPopoverProps {
  dateFilter: string;
  setDateFilter: (filter: string) => void;
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  dateFilterOptions: Array<{ id: string; label: string }>;
  datePopoverOpen: boolean;
  setDatePopoverOpen: (open: boolean) => void;
  resetDateFilters: () => void;
  applyDateFilters: () => void;
}

const DateFilterPopover: React.FC<DateFilterPopoverProps> = ({
  dateFilter,
  setDateFilter,
  dateRange,
  setDateRange,
  dateFilterOptions,
  datePopoverOpen,
  setDatePopoverOpen,
  resetDateFilters,
  applyDateFilters,
}) => {
  return (
    <Popover open={datePopoverOpen} onOpenChange={setDatePopoverOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 h-12 px-4 py-2 border-2">
          <span>{dateFilterOptions.find(option => option.id === dateFilter)?.label || "All dates"}</span>
          <Calendar className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] sm:w-80">
        <div className="space-y-4">
          <h4 className="font-medium text-lg">Filter by Date</h4>
          <RadioGroup value={dateFilter} onValueChange={setDateFilter}>
            {dateFilterOptions.map((option) => (
              <div className="flex items-center space-x-2" key={option.id}>
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
          
          {dateFilter === 'customRange' && (
            <div className="pt-2">
              <DateRangePicker
                date={dateRange}
                onDateChange={setDateRange}
                className="w-full"
              />
            </div>
          )}
          
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={resetDateFilters}>
              Reset
            </Button>
            <Button 
              className="bg-[#0F3E92] text-white"
              onClick={applyDateFilters}
            >
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateFilterPopover;
