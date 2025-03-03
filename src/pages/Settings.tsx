
import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  ChevronLeft, 
  Pencil, 
  Search, 
  Plus,
  ChevronRight,
  Shirt
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Settings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('services');

  const services = [
    { id: 1, name: 'Core Laundry Services', subservices: 3 },
    { id: 2, name: 'Dry Cleaning', subservices: 3 },
    { id: 3, name: 'Shoe Laundry', subservices: 2 },
  ];

  const clothingItems = [
    { id: 1, name: 'T-Shirt', price: 25 },
    { id: 2, name: 'Shirt', price: 30 },
    { id: 3, name: 'Pants', price: 40 },
    { id: 4, name: 'Jeans', price: 45 },
    { id: 5, name: 'Suit', price: 250 },
  ];

  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredClothingItems = clothingItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 md:p-6">
      {/* Header with Edit Button */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1 flex items-center gap-2">
            <SettingsIcon className="h-8 w-8 text-primary" />
            Saiteja Laundry
          </h1>
          <p className="text-muted-foreground">ID: STU10001</p>
        </div>
        <Button className="flex items-center gap-2" variant="default">
          <Pencil size={16} />
          Edit Details
        </Button>
      </div>

      {/* Laundry Details Cards */}
      <div className="grid grid-cols-1 gap-6 mb-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Owner Name</p>
              <p className="font-medium">Saiteja Samala</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Studio Name</p>
              <p className="font-medium">Saiteja Laundry</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">saitejasamala0808@gmail.com</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Primary Number</p>
              <p className="font-medium">8099830308</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Secondary Number</p>
              <p className="font-medium">9000135876</p>
            </div>
          </CardContent>
        </Card>

        {/* Address Details */}
        <Card>
          <CardHeader>
            <CardTitle>Address Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Street</p>
              <p className="font-medium">1-23/45, Main Street</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">City</p>
              <p className="font-medium">Hyderabad</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">State</p>
              <p className="font-medium">Telangana</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Postal Code</p>
              <p className="font-medium">500081</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Latitude</p>
              <p className="font-medium">17.3850</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Longitude</p>
              <p className="font-medium">78.4867</p>
            </div>
          </CardContent>
        </Card>

        {/* Business Details */}
        <Card>
          <CardHeader>
            <CardTitle>Business Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Business Registration Number</p>
              <p className="font-medium">UADJFDFJ4427287</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">GST/VAT Number</p>
              <p className="font-medium">GST9876541</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">PAN Number</p>
              <p className="font-medium">ABCDE1234F</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Opening Time</p>
              <p className="font-medium">09:00 AM</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Closing Time</p>
              <p className="font-medium">09:00 PM</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Price Adjustment %</p>
              <p className="font-medium">10%</p>
            </div>
          </CardContent>
        </Card>

        {/* Studio Setup */}
        <Card>
          <CardHeader>
            <CardTitle>Studio Setup</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Number of Employees</p>
              <p className="font-medium">2</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Daily Capacity (In KG's)</p>
              <p className="font-medium">100</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Special Equipment</p>
              <p className="font-medium">Special dry cleaning</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Selected Wash Category</p>
              <div className="font-medium">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-gray-500"></div>
                  <p>Standard Wash</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-gray-500"></div>
                  <p>Express Wash</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Details */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Account Holder Name</p>
              <p className="font-medium">Saiteja Samala</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Bank Name</p>
              <p className="font-medium">HDFC</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Account Number</p>
              <p className="font-medium">50107846646453</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">IFSC Code</p>
              <p className="font-medium">HDFC00236898</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Branch Name</p>
              <p className="font-medium">Gachibowli Phase-2</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">UPI ID</p>
              <p className="font-medium">saitejasamala@upi</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Selected Payment Schedule</p>
              <p className="font-medium">Daily Payment</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services and Items Management */}
      <div className="mb-8">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Studio Services</CardTitle>
              <div className="text-sm text-muted-foreground">Manage services for Studio ID: STU10001</div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search and Add Section */}
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search services, items or prices..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="flex items-center gap-2" variant="default">
                <Plus size={16} />
                Add New Service
              </Button>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="services" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="subservices">Subservices</TabsTrigger>
                <TabsTrigger value="items">Items</TabsTrigger>
              </TabsList>

              {/* Services Tab */}
              <TabsContent value="services" className="space-y-4">
                {filteredServices.map(service => (
                  <div 
                    key={service.id} 
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      <div>{service.name}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-muted-foreground bg-gray-200 px-2 py-1 rounded">
                        {service.subservices} subservices
                      </div>
                      <Button variant="ghost" size="sm" className="p-1 h-auto">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </TabsContent>

              {/* Subservices Tab */}
              <TabsContent value="subservices">
                <div className="text-center py-6 text-muted-foreground">
                  Select a service to view its subservices
                </div>
              </TabsContent>

              {/* Items Tab */}
              <TabsContent value="items">
                <div className="overflow-hidden rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item Name</TableHead>
                        <TableHead>Price (₹)</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClothingItems.map(item => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium flex items-center gap-2">
                            <Shirt className="h-4 w-4 text-muted-foreground" />
                            {item.name}
                          </TableCell>
                          <TableCell>₹{item.price}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex justify-end mt-4">
                  <Button className="flex items-center gap-2">
                    <Plus size={16} />
                    Add Clothing Item
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
