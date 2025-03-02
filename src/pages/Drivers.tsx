
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  UserPlus, 
  Phone, 
  Mail, 
  MapPin, 
  Star,
  MoreHorizontal,
  Trash2,
  Edit
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

// Mock data
const drivers = [
  { 
    id: 1, 
    name: "Michael Rodriguez", 
    phone: "(555) 123-4567", 
    email: "michael.r@example.com", 
    location: "North District", 
    rating: 4.8, 
    orders: 156, 
    status: "Active", 
    available: true,
    image: ""
  },
  { 
    id: 2, 
    name: "Sarah Johnson", 
    phone: "(555) 234-5678", 
    email: "sarah.j@example.com", 
    location: "East District", 
    rating: 4.9, 
    orders: 203, 
    status: "Active", 
    available: true,
    image: ""
  },
  { 
    id: 3, 
    name: "David Williams", 
    phone: "(555) 345-6789", 
    email: "david.w@example.com", 
    location: "South District", 
    rating: 4.7, 
    orders: 178, 
    status: "Active", 
    available: false,
    image: ""
  },
  { 
    id: 4, 
    name: "Lisa Brown", 
    phone: "(555) 456-7890", 
    email: "lisa.b@example.com", 
    location: "West District", 
    rating: 4.5, 
    orders: 132, 
    status: "Inactive", 
    available: false,
    image: ""
  },
  { 
    id: 5, 
    name: "Robert Thomas", 
    phone: "(555) 567-8901", 
    email: "robert.t@example.com", 
    location: "Central District", 
    rating: 4.6, 
    orders: 89, 
    status: "Active", 
    available: true,
    image: ""
  },
  { 
    id: 6, 
    name: "Jennifer Wilson", 
    phone: "(555) 678-9012", 
    email: "jennifer.w@example.com", 
    location: "North District", 
    rating: 4.3, 
    orders: 67, 
    status: "Inactive", 
    available: false,
    image: ""
  },
];

const Drivers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDrivers, setFilteredDrivers] = useState(drivers);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredDrivers(drivers);
    } else {
      const results = drivers.filter(driver => 
        driver.name.toLowerCase().includes(term.toLowerCase()) ||
        driver.location.toLowerCase().includes(term.toLowerCase()) ||
        driver.email.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredDrivers(results);
    }
  };

  const getInitials = (name: string) => {
    const names = name.split(' ');
    return names.map(n => n[0]).join('');
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Drivers</h1>
          <p className="text-muted-foreground">Manage your delivery personnel</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Add Driver
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Driver</DialogTitle>
              <DialogDescription>
                Enter the details for the new delivery driver
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="Driver's full name"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  placeholder="Phone number"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input
                  id="location"
                  placeholder="Service area"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="available" className="text-right">
                  Available
                </Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch id="available" defaultChecked />
                  <Label htmlFor="available">Driver is available for deliveries</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Driver</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full sm:w-auto mb-4">
          <TabsTrigger value="all">All Drivers</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="available">Available Now</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search drivers by name, location, or email..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDrivers.map((driver, index) => (
              <Card key={driver.id} className="overflow-hidden animate-scale-in" style={{ animationDelay: `${index * 0.05}s` }}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={driver.image} alt={driver.name} />
                        <AvatarFallback className="bg-laundry-100 text-laundry-700">
                          {getInitials(driver.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{driver.name}</CardTitle>
                        <div className="flex items-center gap-1 mt-1">
                          <Badge variant={driver.available ? "default" : "outline"} className="text-xs h-5">
                            {driver.available ? "Available" : "Unavailable"}
                          </Badge>
                          <Badge variant="outline" className={`text-xs h-5 ${getStatusColor(driver.status)}`}>
                            {driver.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Edit className="h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Trash2 className="h-4 w-4" />
                          <span className="text-red-600">Delete</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          View Deliveries
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="space-y-3 mt-3">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{driver.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{driver.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{driver.location}</span>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{driver.rating}</span>
                        <span className="text-sm text-muted-foreground">rating</span>
                      </div>
                      <div>
                        <span className="font-medium">{driver.orders}</span>
                        <span className="text-sm text-muted-foreground ml-1">deliveries</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-between">
                  <Button variant="outline" size="sm" className="px-3">
                    Assign Orders
                  </Button>
                  <Button size="sm" className="px-3">
                    Contact
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="active" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDrivers.filter(d => d.status === 'Active').map((driver, index) => (
              <Card key={driver.id}>
                {/* Content same as above, filtered for active drivers */}
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={driver.image} alt={driver.name} />
                        <AvatarFallback className="bg-laundry-100 text-laundry-700">
                          {getInitials(driver.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{driver.name}</CardTitle>
                        <div className="flex items-center gap-1 mt-1">
                          <Badge variant={driver.available ? "default" : "outline"} className="text-xs h-5">
                            {driver.available ? "Available" : "Unavailable"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="space-y-3 mt-3">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{driver.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{driver.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{driver.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="available" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDrivers.filter(d => d.available).map((driver, index) => (
              <Card key={driver.id}>
                {/* Content same as above, filtered for available drivers */}
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={driver.image} alt={driver.name} />
                        <AvatarFallback className="bg-laundry-100 text-laundry-700">
                          {getInitials(driver.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{driver.name}</CardTitle>
                        <div className="flex items-center gap-1 mt-1">
                          <Badge variant="default" className="text-xs h-5">
                            Available
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="space-y-3 mt-3">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{driver.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{driver.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{driver.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="inactive" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDrivers.filter(d => d.status === 'Inactive').map((driver, index) => (
              <Card key={driver.id}>
                {/* Content same as above, filtered for inactive drivers */}
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={driver.image} alt={driver.name} />
                        <AvatarFallback className="bg-laundry-100 text-laundry-700">
                          {getInitials(driver.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{driver.name}</CardTitle>
                        <div className="flex items-center gap-1 mt-1">
                          <Badge variant="outline" className="text-xs h-5 bg-red-100 text-red-800">
                            Inactive
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="space-y-3 mt-3">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{driver.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{driver.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{driver.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Drivers;
