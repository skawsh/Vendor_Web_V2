
import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Search, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const services = [
  { 
    id: 1, 
    name: "Wash & Fold", 
    price: "$2.50", 
    unit: "per lb", 
    turnaround: "24 hours", 
    description: "Regular laundry service for everyday clothes.",
    active: true 
  },
  { 
    id: 2, 
    name: "Dry Cleaning", 
    price: "$6.50", 
    unit: "per item", 
    turnaround: "48 hours", 
    description: "Professional cleaning for delicate fabrics and formal wear.",
    active: true 
  },
  { 
    id: 3, 
    name: "Ironing", 
    price: "$3.00", 
    unit: "per item", 
    turnaround: "24 hours", 
    description: "Professional pressing service for wrinkle-free clothes.",
    active: true 
  },
  { 
    id: 4, 
    name: "Stain Removal", 
    price: "$5.00", 
    unit: "per stain", 
    turnaround: "48 hours", 
    description: "Specialized treatment for tough stains.",
    active: true 
  },
  { 
    id: 5, 
    name: "Bedding & Linens", 
    price: "$4.00", 
    unit: "per lb", 
    turnaround: "48 hours", 
    description: "Cleaning service for sheets, comforters, and other linens.",
    active: true 
  },
  { 
    id: 6, 
    name: "Leather & Suede", 
    price: "$15.00", 
    unit: "per item", 
    turnaround: "72 hours", 
    description: "Specialized cleaning for leather and suede items.",
    active: false 
  },
  { 
    id: 7, 
    name: "Wedding Dress", 
    price: "$150.00", 
    unit: "per dress", 
    turnaround: "7 days", 
    description: "Premium service for wedding dress cleaning and preservation.",
    active: true 
  },
  { 
    id: 8, 
    name: "Alterations", 
    price: "$10.00", 
    unit: "starting price", 
    turnaround: "3-5 days", 
    description: "Clothing alterations and repairs.",
    active: false 
  },
];

const Services: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServices, setFilteredServices] = useState(services);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<number | null>(null);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredServices(services);
    } else {
      const results = services.filter(service => 
        service.name.toLowerCase().includes(term.toLowerCase()) ||
        service.description.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredServices(results);
    }
  };

  const confirmDelete = (id: number) => {
    setServiceToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (serviceToDelete !== null) {
      // In a real app, you would make an API call to delete the service
      // For now, we'll filter it out from our local state
      setFilteredServices(services.filter(service => service.id !== serviceToDelete));
    }
    setIsDeleteDialogOpen(false);
    setServiceToDelete(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground">Manage your laundry services and pricing</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
              <DialogDescription>
                Create a new laundry service for your customers
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Service name"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  id="price"
                  placeholder="e.g. $2.50"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="unit" className="text-right">
                  Unit
                </Label>
                <Input
                  id="unit"
                  placeholder="e.g. per lb, per item"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="turnaround" className="text-right">
                  Turnaround
                </Label>
                <Input
                  id="turnaround"
                  placeholder="e.g. 24 hours"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  placeholder="Short description"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="active" className="text-right">
                  Active
                </Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch id="active" defaultChecked />
                  <Label htmlFor="active">Service is active and available</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Service</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full sm:w-auto mb-4">
          <TabsTrigger value="all">All Services</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search services..."
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
            {filteredServices.map((service, index) => (
              <Card key={service.id} className="overflow-hidden animate-scale-in" style={{ animationDelay: `${index * 0.05}s` }}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{service.name}</CardTitle>
                    <div className={`px-2 py-1 rounded-full text-xs ${service.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {service.active ? 'Active' : 'Inactive'}
                    </div>
                  </div>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Price:</span>
                      <span className="font-medium">{service.price} {service.unit}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Turnaround:</span>
                      <span className="font-medium">{service.turnaround}</span>
                    </div>
                    <div className="flex items-center justify-end gap-2 mt-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="h-8">
                            <Pencil className="h-3.5 w-3.5 mr-1" />
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Edit Service</DialogTitle>
                            <DialogDescription>
                              Make changes to the {service.name} service
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-name" className="text-right">
                                Name
                              </Label>
                              <Input
                                id="edit-name"
                                defaultValue={service.name}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-price" className="text-right">
                                Price
                              </Label>
                              <Input
                                id="edit-price"
                                defaultValue={service.price.replace('$', '')}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-unit" className="text-right">
                                Unit
                              </Label>
                              <Input
                                id="edit-unit"
                                defaultValue={service.unit}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-turnaround" className="text-right">
                                Turnaround
                              </Label>
                              <Input
                                id="edit-turnaround"
                                defaultValue={service.turnaround}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-description" className="text-right">
                                Description
                              </Label>
                              <Input
                                id="edit-description"
                                defaultValue={service.description}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-active" className="text-right">
                                Active
                              </Label>
                              <div className="flex items-center space-x-2 col-span-3">
                                <Switch id="edit-active" defaultChecked={service.active} />
                                <Label htmlFor="edit-active">Service is active and available</Label>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit">Save Changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 text-red-600" 
                        onClick={() => confirmDelete(service.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="active" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.filter(s => s.active).map((service, index) => (
              <Card key={service.id} className="overflow-hidden">
                {/* Card content same as above, filtered for active services */}
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Price:</span>
                      <span className="font-medium">{service.price} {service.unit}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Turnaround:</span>
                      <span className="font-medium">{service.turnaround}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="inactive" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.filter(s => !s.active).map((service, index) => (
              <Card key={service.id} className="overflow-hidden">
                {/* Card content same as above, filtered for inactive services */}
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Price:</span>
                      <span className="font-medium">{service.price} {service.unit}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Turnaround:</span>
                      <span className="font-medium">{service.turnaround}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this service? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Service
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Services;
