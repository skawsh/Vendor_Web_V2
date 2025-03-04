
import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Pencil, 
  Search, 
  Plus,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Save,
  X,
  Shirt,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { toast } from 'sonner';

// Mock data for clothing items within subservices
const mockClothingItems = {
  101: [ // Wash & Fold
    { id: 1, name: 'Shirt', standardPrice: 10, expressPrice: 15 },
    { id: 2, name: 'Pant', standardPrice: 20, expressPrice: 30 },
    { id: 3, name: 'Shorts', standardPrice: 30, expressPrice: 45 },
    { id: 4, name: 'T-shirt', standardPrice: 15, expressPrice: 25 },
    { id: 5, name: 'Jeans', standardPrice: 25, expressPrice: 40 },
  ],
  102: [ // Wash & Iron
    { id: 6, name: 'Shirt', standardPrice: 15, expressPrice: 25 },
    { id: 7, name: 'Pant', standardPrice: 25, expressPrice: 40 },
    { id: 8, name: 'Dress', standardPrice: 35, expressPrice: 55 },
  ],
  103: [ // Steam Press
    { id: 9, name: 'Shirt', standardPrice: 8, expressPrice: 12 },
    { id: 10, name: 'Pant', standardPrice: 10, expressPrice: 15 },
    { id: 11, name: 'Suit', standardPrice: 50, expressPrice: 75 },
  ],
  201: [ // Upper Wear
    { id: 12, name: 'Shirt', standardPrice: 30, expressPrice: 45 },
    { id: 13, name: 'T-shirt', standardPrice: 25, expressPrice: 40 },
    { id: 14, name: 'Blazer', standardPrice: 70, expressPrice: 100 },
    { id: 15, name: 'Sweater', standardPrice: 40, expressPrice: 60 },
  ],
  202: [ // Lower Wear
    { id: 16, name: 'Pant', standardPrice: 35, expressPrice: 50 },
    { id: 17, name: 'Jeans', standardPrice: 40, expressPrice: 60 },
    { id: 18, name: 'Shorts', standardPrice: 30, expressPrice: 45 },
  ],
  203: [ // Formal Wear
    { id: 19, name: 'Suit', standardPrice: 150, expressPrice: 230 },
    { id: 20, name: 'Tuxedo', standardPrice: 180, expressPrice: 270 },
    { id: 21, name: 'Dress Shirt', standardPrice: 40, expressPrice: 60 },
  ],
  301: [ // Sport Shoes
    { id: 22, name: 'Sneakers', standardPrice: 100, expressPrice: 150 },
  ],
  302: [ // Leather Shoes
    { id: 23, name: 'Leather Shoes', standardPrice: 120, expressPrice: 180 },
  ],
};

const Settings = () => {
  const [searchServiceQuery, setSearchServiceQuery] = useState('');
  const [searchClothingQuery, setSearchClothingQuery] = useState('');
  const [editing, setEditing] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    address: false,
    business: false,
    studio: false,
    payment: false
  });
  
  // Track which services are expanded
  const [expandedServices, setExpandedServices] = useState<Record<number, boolean>>({});
  
  // Track which subservices are expanded
  const [expandedSubservices, setExpandedSubservices] = useState<Record<number, boolean>>({});

  // Mock data with subservices
  const services = [
    { 
      id: 1, 
      name: 'Core Laundry Services', 
      subservices: [
        { id: 101, name: 'Wash & Fold', price: '₹59 per Kg', items: 5 },
        { id: 102, name: 'Wash & Iron', price: '₹79 per Kg', items: 3 },
        { id: 103, name: 'Steam Press', price: '₹39 per Item', items: 3 }
      ]
    },
    { 
      id: 2, 
      name: 'Dry Cleaning', 
      subservices: [
        { id: 201, name: 'Upper Wear', price: '', items: 4 },
        { id: 202, name: 'Lower Wear', price: '', items: 3 },
        { id: 203, name: 'Formal Wear', price: '', items: 3 }
      ]
    },
    { 
      id: 3, 
      name: 'Shoe Laundry', 
      subservices: [
        { id: 301, name: 'Sport Shoes', price: '₹199 per Pair', items: 1 },
        { id: 302, name: 'Leather Shoes', price: '₹249 per Pair', items: 1 }
      ]
    },
  ];

  const clothingItems = [
    { id: 1, name: 'T-Shirt', price: 25 },
    { id: 2, name: 'Shirt', price: 30 },
    { id: 3, name: 'Pants', price: 40 },
    { id: 4, name: 'Jeans', price: 45 },
    { id: 5, name: 'Suit', price: 250 },
  ];

  const toggleServiceExpand = (serviceId: number) => {
    setExpandedServices(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }));
  };

  const toggleSubserviceExpand = (subserviceId: number) => {
    setExpandedSubservices(prev => ({
      ...prev,
      [subserviceId]: !prev[subserviceId]
    }));
  };

  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchServiceQuery.toLowerCase())
  );

  const filteredClothingItems = clothingItems.filter(item => 
    item.name.toLowerCase().includes(searchClothingQuery.toLowerCase())
  );

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleEditDetails = (sectionName) => {
    setEditing(sectionName);
    toast.info(`Now editing ${sectionName} information`);
  };

  const handleSaveDetails = (sectionName) => {
    setEditing(null);
    toast.success(`${sectionName} information updated successfully!`);
  };

  const handleCancelEdit = (sectionName) => {
    setEditing(null);
    toast.info(`Editing ${sectionName} cancelled`);
  };

  const handleAddService = () => {
    toast.info("Add service modal would open here");
  };

  const handleAddClothingItem = () => {
    toast.info("Add clothing item modal would open here");
  };

  const handleEditItem = (id, type) => {
    toast.info(`Editing ${type} with ID: ${id}`);
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      {/* Header with Edit Button */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1 flex items-center gap-2">
            <SettingsIcon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            Saiteja Laundry
          </h1>
          <p className="text-sm text-muted-foreground">ID: STU10001</p>
        </div>
      </div>

      {/* Laundry Details Cards */}
      <div className="grid grid-cols-1 gap-6 mb-8">
        {/* Basic Information */}
        <Card>
          <Collapsible open={expandedSections.basic}>
            <CardHeader className="cursor-pointer hover:bg-muted/20 transition-colors" onClick={() => toggleSection('basic')}>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl md:text-2xl">Basic Information</CardTitle>
                <div className="flex items-center">
                  {editing !== 'basic' ? (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mr-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditDetails('basic');
                      }}
                    >
                      <Pencil size={16} />
                      <span className="ml-1 hidden sm:inline">Edit</span>
                    </Button>
                  ) : (
                    <>
                      <Button 
                        variant="success" 
                        size="sm" 
                        className="mr-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveDetails('basic');
                        }}
                      >
                        <Save size={16} />
                        <span className="ml-1 hidden sm:inline">Save</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mr-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancelEdit('basic');
                        }}
                      >
                        <X size={16} />
                        <span className="ml-1 hidden sm:inline">Cancel</span>
                      </Button>
                    </>
                  )}
                  {expandedSections.basic ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
            </CardHeader>
            <CollapsibleContent>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Owner Name</p>
                  {editing === 'basic' ? (
                    <Input defaultValue="Saiteja Samala" className="mt-1" />
                  ) : (
                    <p className="font-medium">Saiteja Samala</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Studio Name</p>
                  {editing === 'basic' ? (
                    <Input defaultValue="Saiteja Laundry" className="mt-1" />
                  ) : (
                    <p className="font-medium">Saiteja Laundry</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  {editing === 'basic' ? (
                    <Input defaultValue="saitejasamala0808@gmail.com" className="mt-1" />
                  ) : (
                    <p className="font-medium">saitejasamala0808@gmail.com</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Primary Number</p>
                  {editing === 'basic' ? (
                    <Input defaultValue="8099830308" className="mt-1" />
                  ) : (
                    <p className="font-medium">8099830308</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Secondary Number</p>
                  {editing === 'basic' ? (
                    <Input defaultValue="9000135876" className="mt-1" />
                  ) : (
                    <p className="font-medium">9000135876</p>
                  )}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Address Details */}
        <Card>
          <Collapsible open={expandedSections.address}>
            <CardHeader className="cursor-pointer hover:bg-muted/20 transition-colors" onClick={() => toggleSection('address')}>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl md:text-2xl">Address Details</CardTitle>
                <div className="flex items-center">
                  {editing !== 'address' ? (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mr-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditDetails('address');
                      }}
                    >
                      <Pencil size={16} />
                      <span className="ml-1 hidden sm:inline">Edit</span>
                    </Button>
                  ) : (
                    <>
                      <Button 
                        variant="success" 
                        size="sm" 
                        className="mr-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveDetails('address');
                        }}
                      >
                        <Save size={16} />
                        <span className="ml-1 hidden sm:inline">Save</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mr-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancelEdit('address');
                        }}
                      >
                        <X size={16} />
                        <span className="ml-1 hidden sm:inline">Cancel</span>
                      </Button>
                    </>
                  )}
                  {expandedSections.address ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
            </CardHeader>
            <CollapsibleContent>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Street</p>
                  {editing === 'address' ? (
                    <Input defaultValue="1-23/45, Main Street" className="mt-1" />
                  ) : (
                    <p className="font-medium">1-23/45, Main Street</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">City</p>
                  {editing === 'address' ? (
                    <Input defaultValue="Hyderabad" className="mt-1" />
                  ) : (
                    <p className="font-medium">Hyderabad</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">State</p>
                  {editing === 'address' ? (
                    <Input defaultValue="Telangana" className="mt-1" />
                  ) : (
                    <p className="font-medium">Telangana</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Postal Code</p>
                  {editing === 'address' ? (
                    <Input defaultValue="500081" className="mt-1" />
                  ) : (
                    <p className="font-medium">500081</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Latitude</p>
                  {editing === 'address' ? (
                    <Input defaultValue="17.3850" className="mt-1" />
                  ) : (
                    <p className="font-medium">17.3850</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Longitude</p>
                  {editing === 'address' ? (
                    <Input defaultValue="78.4867" className="mt-1" />
                  ) : (
                    <p className="font-medium">78.4867</p>
                  )}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Business Details */}
        <Card>
          <Collapsible open={expandedSections.business}>
            <CardHeader className="cursor-pointer hover:bg-muted/20 transition-colors" onClick={() => toggleSection('business')}>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl md:text-2xl">Business Details</CardTitle>
                <div className="flex items-center">
                  {editing !== 'business' ? (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mr-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditDetails('business');
                      }}
                    >
                      <Pencil size={16} />
                      <span className="ml-1 hidden sm:inline">Edit</span>
                    </Button>
                  ) : (
                    <>
                      <Button 
                        variant="success" 
                        size="sm" 
                        className="mr-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveDetails('business');
                        }}
                      >
                        <Save size={16} />
                        <span className="ml-1 hidden sm:inline">Save</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mr-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancelEdit('business');
                        }}
                      >
                        <X size={16} />
                        <span className="ml-1 hidden sm:inline">Cancel</span>
                      </Button>
                    </>
                  )}
                  {expandedSections.business ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
            </CardHeader>
            <CollapsibleContent>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Business Registration Number</p>
                  {editing === 'business' ? (
                    <Input defaultValue="UADJFDFJ4427287" className="mt-1" />
                  ) : (
                    <p className="font-medium">UADJFDFJ4427287</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">GST/VAT Number</p>
                  {editing === 'business' ? (
                    <Input defaultValue="GST9876541" className="mt-1" />
                  ) : (
                    <p className="font-medium">GST9876541</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">PAN Number</p>
                  {editing === 'business' ? (
                    <Input defaultValue="ABCDE1234F" className="mt-1" />
                  ) : (
                    <p className="font-medium">ABCDE1234F</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Opening Time</p>
                  {editing === 'business' ? (
                    <Input defaultValue="09:00 AM" className="mt-1" />
                  ) : (
                    <p className="font-medium">09:00 AM</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Closing Time</p>
                  {editing === 'business' ? (
                    <Input defaultValue="09:00 PM" className="mt-1" />
                  ) : (
                    <p className="font-medium">09:00 PM</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Price Adjustment %</p>
                  {editing === 'business' ? (
                    <Input defaultValue="10%" className="mt-1" />
                  ) : (
                    <p className="font-medium">10%</p>
                  )}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Studio Setup */}
        <Card>
          <Collapsible open={expandedSections.studio}>
            <CardHeader className="cursor-pointer hover:bg-muted/20 transition-colors" onClick={() => toggleSection('studio')}>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl md:text-2xl">Studio Setup</CardTitle>
                <div className="flex items-center">
                  {editing !== 'studio' ? (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mr-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditDetails('studio');
                      }}
                    >
                      <Pencil size={16} />
                      <span className="ml-1 hidden sm:inline">Edit</span>
                    </Button>
                  ) : (
                    <>
                      <Button 
                        variant="success" 
                        size="sm" 
                        className="mr-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveDetails('studio');
                        }}
                      >
                        <Save size={16} />
                        <span className="ml-1 hidden sm:inline">Save</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mr-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancelEdit('studio');
                        }}
                      >
                        <X size={16} />
                        <span className="ml-1 hidden sm:inline">Cancel</span>
                      </Button>
                    </>
                  )}
                  {expandedSections.studio ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
            </CardHeader>
            <CollapsibleContent>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Number of Employees</p>
                  {editing === 'studio' ? (
                    <Input defaultValue="2" className="mt-1" type="number" />
                  ) : (
                    <p className="font-medium">2</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Daily Capacity (In KG's)</p>
                  {editing === 'studio' ? (
                    <Input defaultValue="100" className="mt-1" type="number" />
                  ) : (
                    <p className="font-medium">100</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Special Equipment</p>
                  {editing === 'studio' ? (
                    <Input defaultValue="Special dry cleaning" className="mt-1" />
                  ) : (
                    <p className="font-medium">Special dry cleaning</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Selected Wash Category</p>
                  {editing === 'studio' ? (
                    <div className="mt-1">
                      <div className="flex items-center gap-2 mb-1">
                        <input type="checkbox" defaultChecked />
                        <label>Standard Wash</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked />
                        <label>Express Wash</label>
                      </div>
                    </div>
                  ) : (
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
                  )}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Payment Details */}
        <Card>
          <Collapsible open={expandedSections.payment}>
            <CardHeader className="cursor-pointer hover:bg-muted/20 transition-colors" onClick={() => toggleSection('payment')}>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl md:text-2xl">Payment Details</CardTitle>
                <div className="flex items-center">
                  {editing !== 'payment' ? (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mr-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditDetails('payment');
                      }}
                    >
                      <Pencil size={16} />
                      <span className="ml-1 hidden sm:inline">Edit</span>
                    </Button>
                  ) : (
                    <>
                      <Button 
                        variant="success" 
                        size="sm" 
                        className="mr-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveDetails('payment');
                        }}
                      >
                        <Save size={16} />
                        <span className="ml-1 hidden sm:inline">Save</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mr-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancelEdit('payment');
                        }}
                      >
                        <X size={16} />
                        <span className="ml-1 hidden sm:inline">Cancel</span>
                      </Button>
                    </>
                  )}
                  {expandedSections.payment ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
            </CardHeader>
            <CollapsibleContent>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Account Holder Name</p>
                  {editing === 'payment' ? (
                    <Input defaultValue="Saiteja Samala" className="mt-1" />
                  ) : (
                    <p className="font-medium">Saiteja Samala</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bank Name</p>
                  {editing === 'payment' ? (
                    <Input defaultValue="HDFC" className="mt-1" />
                  ) : (
                    <p className="font-medium">HDFC</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Account Number</p>
                  {editing === 'payment' ? (
                    <Input defaultValue="50107846646453" className="mt-1" />
                  ) : (
                    <p className="font-medium">50107846646453</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">IFSC Code</p>
                  {editing === 'payment' ? (
                    <Input defaultValue="HDFC00236898" className="mt-1" />
                  ) : (
                    <p className="font-medium">HDFC00236898</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Branch Name</p>
                  {editing === 'payment' ? (
                    <Input defaultValue="Gachibowli Phase-2" className="mt-1" />
                  ) : (
                    <p className="font-medium">Gachibowli Phase-2</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">UPI ID</p>
                  {editing === 'payment' ? (
                    <Input defaultValue="saitejasamala@upi" className="mt-1" />
                  ) : (
                    <p className="font-medium">saitejasamala@upi</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Selected Payment Schedule</p>
                  {editing === 'payment' ? (
                    <Input defaultValue="Daily Payment" className="mt-1" />
                  ) : (
                    <p className="font-medium">Daily Payment</p>
                  )}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      </div>

      {/* Services and Items Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Services Management */}
        <Card className="h-full">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
              <CardTitle className="text-xl md:text-2xl mb-2 sm:mb-0">Services Management</CardTitle>
              <Button 
                className="flex items-center gap-2 w-full sm:w-auto" 
                variant="default"
                onClick={handleAddService}
              >
                <Plus size={16} />
                <span>Add Service</span>
              </Button>
            </div>
            <CardDescription>Manage your laundry services and subservices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search services..." 
                className="pl-10"
                value={searchServiceQuery}
                onChange={(e) => setSearchServiceQuery(e.target.value)}
              />
            </div>
            
            <div className="space-y-3">
              {filteredServices.map(service => (
                <div key={service.id} className="rounded-lg overflow-hidden">
                  <Collapsible open={expandedServices[service.id]}>
                    <CollapsibleTrigger 
                      onClick={() => toggleServiceExpand(service.id)}
                      className="w-full"
                    >
                      <div 
                        className="flex justify-between items-center p-3 md:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          {expandedServices[service.id] ? 
                            <ChevronDown className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" /> : 
                            <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                          }
                          <div className="font-medium">{service.name}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-xs md:text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                            {service.subservices.length} subservices
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="p-1 h-auto"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditItem(service.id, 'service');
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="bg-white border-x border-b rounded-b-lg">
                      <div className="space-y-3 px-4 py-2">
                        {service.subservices.map(subservice => (
                          <div key={subservice.id} className="border-l-2 border-gray-200 pl-2">
                            <Collapsible open={expandedSubservices[subservice.id]}>
                              <CollapsibleTrigger 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleSubserviceExpand(subservice.id);
                                }}
                                className="w-full"
                              >
                                <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md">
                                  <div className="flex items-center gap-2">
                                    {expandedSubservices[subservice.id] ? 
                                      <ChevronDown className="h-4 w-4 text-muted-foreground" /> : 
                                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                    }
                                    <span className="font-medium">{subservice.name}</span>
                                    {subservice.price && (
                                      <span className="text-sm text-muted-foreground">({subservice.price})</span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                      {subservice.items} items
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="p-1 h-6 w-6"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditItem(subservice.id, 'subservice');
                                      }}
                                    >
                                      <Pencil className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </CollapsibleTrigger>
                              <CollapsibleContent className="pl-6 pr-2 py-1">
                                <div className="space-y-2">
                                  {mockClothingItems[subservice.id]?.map((item) => (
                                    <div key={item.id} className="border border-gray-100 rounded-lg shadow-sm p-3">
                                      <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-2">
                                          <Shirt className="h-4 w-4 text-muted-foreground" />
                                          <span className="font-medium">{item.name}</span>
                                        </div>
                                        <Button 
                                          variant="ghost" 
                                          size="sm" 
                                          className="p-1 h-6 w-6"
                                          onClick={() => handleEditItem(item.id, 'clothing')}
                                        >
                                          <Pencil className="h-3 w-3" />
                                        </Button>
                                      </div>
                                      <div className="flex flex-col gap-1">
                                        <div className="flex justify-between text-sm">
                                          <span className="text-muted-foreground">Standard:</span>
                                          <span className="font-medium">₹{item.standardPrice}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                          <div className="flex items-center gap-1 text-amber-600">
                                            <span>Express:</span>
                                            <Zap className="h-3 w-3" />
                                          </div>
                                          <span className="font-medium text-amber-600">₹{item.expressPrice}</span>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </CollapsibleContent>
                            </Collapsible>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              ))}
              
              {filteredServices.length === 0 && (
                <div className="text-center py-6 text-muted-foreground">
                  No services found. Try a different search or add a new service.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Clothing Items Management */}
        <Card className="h-full">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
              <CardTitle className="text-xl md:text-2xl mb-2 sm:mb-0">Clothing Items</CardTitle>
              <Button 
                className="flex items-center gap-2 w-full sm:w-auto" 
                variant="default"
                onClick={handleAddClothingItem}
              >
                <Plus size={16} />
                <span>Add Item</span>
              </Button>
            </div>
            <CardDescription>Manage clothing items and their prices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search clothing items..." 
                className="pl-10"
                value={searchClothingQuery}
                onChange={(e) => setSearchClothingQuery(e.target.value)}
              />
            </div>

            <div className="overflow-hidden rounded-lg border">
              {/* Mobile view for clothing items (shown only on small screens) */}
              <div className="block md:hidden">
                {filteredClothingItems.map(item => (
                  <div key={item.id} className="border-b p-3 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Shirt className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm">₹{item.price}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleEditItem(item.id, 'clothing')}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {filteredClothingItems.length === 0 && (
                  <div className="text-center py-6 text-muted-foreground">
                    No clothing items found. Try a different search or add a new item.
                  </div>
                )}
              </div>

              {/* Desktop view for clothing items (shown only on medium screens and up) */}
              <div className="hidden md:block">
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
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleEditItem(item.id, 'clothing')}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    
                    {filteredClothingItems.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                          No clothing items found. Try a different search or add a new item.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
