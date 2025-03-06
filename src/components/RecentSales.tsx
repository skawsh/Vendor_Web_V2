
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>RK</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Rahul Kumar</p>
          <p className="text-sm text-muted-foreground">rahul@example.com</p>
        </div>
        <div className="ml-auto font-medium">+₹1,999.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Anjali Sharma</p>
          <p className="text-sm text-muted-foreground">anjali@example.com</p>
        </div>
        <div className="ml-auto font-medium">+₹2,499.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>VP</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Vikram Patel</p>
          <p className="text-sm text-muted-foreground">vikram@example.com</p>
        </div>
        <div className="ml-auto font-medium">+₹3,499.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>PG</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Priya Gupta</p>
          <p className="text-sm text-muted-foreground">priya@example.com</p>
        </div>
        <div className="ml-auto font-medium">+₹2,299.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>AK</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Arjun Khanna</p>
          <p className="text-sm text-muted-foreground">arjun@example.com</p>
        </div>
        <div className="ml-auto font-medium">+₹1,799.00</div>
      </div>
    </div>
  );
}
