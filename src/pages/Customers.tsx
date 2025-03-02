
import React from 'react';
import { Users, Search, Plus, MoreHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// Sample customer data
const customers = [
  { id: 1, name: 'John Smith', email: 'john.smith@example.com', phone: '(555) 123-4567', orders: 12, spent: '$345.80', lastOrder: '2023-06-15' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah.j@example.com', phone: '(555) 234-5678', orders: 8, spent: '$289.50', lastOrder: '2023-06-18' },
  { id: 3, name: 'Michael Brown', email: 'mbrown@example.com', phone: '(555) 345-6789', orders: 15, spent: '$520.75', lastOrder: '2023-06-20' },
  { id: 4, name: 'Emily Davis', email: 'emily.d@example.com', phone: '(555) 456-7890', orders: 5, spent: '$175.25', lastOrder: '2023-06-10' },
  { id: 5, name: 'Robert Wilson', email: 'robert.w@example.com', phone: '(555) 567-8901', orders: 10, spent: '$310.90', lastOrder: '2023-06-17' },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).format(date);
};

const Customers = () => {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1 flex items-center gap-2">
            <Users className="h-8 w-8 text-primary" />
            Customers
          </h1>
          <p className="text-muted-foreground">Manage your customer database</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </header>

      <div className="bg-white dark:bg-card rounded-xl border shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              className="pl-8"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Export</Button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-card rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact Information</TableHead>
              <TableHead className="text-right">Orders</TableHead>
              <TableHead className="text-right">Total Spent</TableHead>
              <TableHead>Last Order</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map(customer => (
              <TableRow key={customer.id} className="table-row-hover">
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>
                  <div>{customer.email}</div>
                  <div className="text-sm text-muted-foreground">{customer.phone}</div>
                </TableCell>
                <TableCell className="text-right">{customer.orders}</TableCell>
                <TableCell className="text-right">{customer.spent}</TableCell>
                <TableCell>{formatDate(customer.lastOrder)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit customer</DropdownMenuItem>
                      <DropdownMenuItem>Order history</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Customers;
