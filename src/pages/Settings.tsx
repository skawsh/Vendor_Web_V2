
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  ChevronDown,
  ChevronRight,
  Edit,
  Plus,
  Save,
  Trash2,
  X
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Settings = () => {
  // State for services
  const [services, setServices] = useState([
    {
      id: '1',
      name: 'Wash & Fold',
      isOpen: false,
      description: 'Garments are washed and folded neatly',
      price: 49,
      unit: 'kg',
      isEditing: false,
      subServices: [
        {
          id: '1-1',
          name: 'Regular Wash',
          isOpen: false,
          standardPrice: 40,
          expressPrice: 60,
          items: [
            { id: '1-1-1', name: 'T-shirt', price: 40 },
            { id: '1-1-2', name: 'Jeans', price: 50 },
          ]
        },
        {
          id: '1-2',
          name: 'Premium Wash',
          isOpen: false,
          standardPrice: 60,
          expressPrice: 90,
          items: [
            { id: '1-2-1', name: 'Dress Shirt', price: 60 },
            { id: '1-2-2', name: 'Trousers', price: 70 },
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'Wash & Iron',
      isOpen: false,
      description: 'Garments are washed and ironed to perfection',
      price: 69,
      unit: 'kg',
      isEditing: false,
      subServices: [
        {
          id: '2-1',
          name: 'Regular Service',
          isOpen: false,
          standardPrice: 55,
          expressPrice: 75,
          items: [
            { id: '2-1-1', name: 'Shirt', price: 55 },
            { id: '2-1-2', name: 'Pants', price: 65 },
          ]
        },
        {
          id: '2-2',
          name: 'Premium Service',
          isOpen: false,
          standardPrice: 120,
          expressPrice: 160,
          items: [
            { id: '2-2-1', name: 'Blazer', price: 120 },
            { id: '2-2-2', name: 'Suit', price: 200 },
          ]
        }
      ]
    },
    {
      id: '3',
      name: 'Dry Clean',
      isOpen: false,
      description: 'Specialized cleaning for delicate fabrics',
      price: 250,
      unit: 'piece',
      isEditing: false,
      subServices: [
        {
          id: '3-1',
          name: 'Basic Dry Clean',
          isOpen: false,
          standardPrice: 180,
          expressPrice: 250,
          items: [
            { id: '3-1-1', name: 'Sweater', price: 180 },
            { id: '3-1-2', name: 'Winter Jacket', price: 350 },
          ]
        },
        {
          id: '3-2',
          name: 'Premium Dry Clean',
          isOpen: false,
          standardPrice: 800,
          expressPrice: 1200,
          items: [
            { id: '3-2-1', name: 'Wedding Dress', price: 1200 },
            { id: '3-2-2', name: 'Formal Suit', price: 800 },
          ]
        }
      ]
    }
  ]);

  // Dialog states
  const [isAddServiceDialogOpen, setIsAddServiceDialogOpen] = useState(false);
  const [isAddSubserviceDialogOpen, setIsAddSubserviceDialogOpen] = useState(false);
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const [isEditSubserviceDialogOpen, setIsEditSubserviceDialogOpen] = useState(false);

  // New service form state
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
    unit: 'kg'
  });

  // New subservice form state
  const [newSubservice, setNewSubservice] = useState({
    name: '',
    standardPrice: '',
    expressPrice: '',
    parentServiceId: ''
  });

  // Edit subservice form state
  const [editSubservice, setEditSubservice] = useState({
    id: '',
    name: '',
    standardPrice: '',
    expressPrice: '',
    parentServiceId: ''
  });

  // New item form state
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    parentServiceId: '',
    parentSubserviceId: ''
  });

  // Toggle open/close state for a service
  const toggleService = (serviceId) => {
    setServices(prevServices => 
      prevServices.map(service => 
        service.id === serviceId 
          ? { ...service, isOpen: !service.isOpen } 
          : service
      )
    );
  };

  // Toggle open/close state for a subservice
  const toggleSubservice = (serviceId, subserviceId) => {
    setServices(prevServices => 
      prevServices.map(service => 
        service.id === serviceId 
          ? {
              ...service,
              subServices: service.subServices.map(subservice =>
                subservice.id === subserviceId
                  ? { ...subservice, isOpen: !subservice.isOpen }
                  : subservice
              )
            } 
          : service
      )
    );
  };

  // Toggle edit mode for a service
  const toggleEditService = (serviceId) => {
    setServices(prevServices => 
      prevServices.map(service => 
        service.id === serviceId 
          ? { ...service, isEditing: !service.isEditing } 
          : service
      )
    );
  };

  // Handle change in service form fields
  const handleServiceChange = (serviceId, field, value) => {
    setServices(prevServices => 
      prevServices.map(service => 
        service.id === serviceId 
          ? { ...service, [field]: value } 
          : service
      )
    );
  };

  // Save service changes
  const saveServiceChanges = (serviceId) => {
    toggleEditService(serviceId);
    toast.success('Service updated successfully');
  };

  // Open dialog to add a new service
  const openAddServiceDialog = () => {
    setNewService({
      name: '',
      description: '',
      price: '',
      unit: 'kg'
    });
    setIsAddServiceDialogOpen(true);
  };

  // Handle change in new service form
  const handleNewServiceChange = (field, value) => {
    setNewService(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Add a new service
  const addNewService = () => {
    // Validate fields
    if (!newService.name || !newService.description || !newService.price) {
      toast.error('Please fill all required fields');
      return;
    }

    const newId = (services.length + 1).toString();
    
    setServices(prev => [
      ...prev,
      {
        id: newId,
        name: newService.name,
        description: newService.description,
        price: parseFloat(newService.price),
        unit: newService.unit,
        isOpen: false,
        isEditing: false,
        subServices: []
      }
    ]);
    
    setIsAddServiceDialogOpen(false);
    toast.success('Service added successfully');
  };

  // Open dialog to add a new subservice
  const openAddSubserviceDialog = (serviceId) => {
    setNewSubservice({
      name: '',
      standardPrice: '',
      expressPrice: '',
      parentServiceId: serviceId
    });
    setIsAddSubserviceDialogOpen(true);
  };

  // Handle change in new subservice form
  const handleNewSubserviceChange = (field, value) => {
    setNewSubservice(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Add a new subservice
  const addNewSubservice = () => {
    // Validate fields
    if (!newSubservice.name || !newSubservice.standardPrice || !newSubservice.expressPrice) {
      toast.error('Please fill all required fields');
      return;
    }

    setServices(prev => 
      prev.map(service => 
        service.id === newSubservice.parentServiceId
          ? {
              ...service,
              subServices: [
                ...service.subServices,
                {
                  id: `${service.id}-${service.subServices.length + 1}`,
                  name: newSubservice.name,
                  standardPrice: parseFloat(newSubservice.standardPrice),
                  expressPrice: parseFloat(newSubservice.expressPrice),
                  isOpen: false,
                  items: []
                }
              ]
            }
          : service
      )
    );
    
    setIsAddSubserviceDialogOpen(false);
    toast.success('Subservice added successfully');
  };

  // Open dialog to edit a subservice
  const openEditSubserviceDialog = (serviceId, subservice) => {
    setEditSubservice({
      id: subservice.id,
      name: subservice.name,
      standardPrice: subservice.standardPrice || '',
      expressPrice: subservice.expressPrice || '',
      parentServiceId: serviceId
    });
    setIsEditSubserviceDialogOpen(true);
  };

  // Handle change in edit subservice form
  const handleEditSubserviceChange = (field, value) => {
    setEditSubservice(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Save subservice changes
  const saveSubserviceChanges = () => {
    // Validate fields
    if (!editSubservice.name || !editSubservice.standardPrice || !editSubservice.expressPrice) {
      toast.error('Please fill all required fields');
      return;
    }

    setServices(prev => 
      prev.map(service => 
        service.id === editSubservice.parentServiceId
          ? {
              ...service,
              subServices: service.subServices.map(subservice =>
                subservice.id === editSubservice.id
                  ? { 
                      ...subservice, 
                      name: editSubservice.name,
                      standardPrice: parseFloat(editSubservice.standardPrice),
                      expressPrice: parseFloat(editSubservice.expressPrice)
                    }
                  : subservice
              )
            }
          : service
      )
    );
    
    setIsEditSubserviceDialogOpen(false);
    toast.success('Subservice updated successfully');
  };

  // Open dialog to add a new item to a subservice
  const openAddItemDialog = (serviceId, subserviceId) => {
    setNewItem({
      name: '',
      price: '',
      parentServiceId: serviceId,
      parentSubserviceId: subserviceId
    });
    setIsAddItemDialogOpen(true);
  };

  // Handle change in new item form
  const handleNewItemChange = (field, value) => {
    setNewItem(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Add a new item to a subservice
  const addNewItem = () => {
    // Validate fields
    if (!newItem.name || !newItem.price) {
      toast.error('Please fill all required fields');
      return;
    }

    setServices(prev => 
      prev.map(service => 
        service.id === newItem.parentServiceId
          ? {
              ...service,
              subServices: service.subServices.map(subservice =>
                subservice.id === newItem.parentSubserviceId
                  ? {
                      ...subservice,
                      items: [
                        ...subservice.items,
                        {
                          id: `${subservice.id}-${subservice.items.length + 1}`,
                          name: newItem.name,
                          price: parseFloat(newItem.price)
                        }
                      ]
                    }
                  : subservice
              )
            }
          : service
      )
    );
    
    setIsAddItemDialogOpen(false);
    toast.success('Item added successfully');
  };

  // Delete a service
  const deleteService = (serviceId) => {
    if (confirm('Are you sure you want to delete this service?')) {
      setServices(prev => prev.filter(service => service.id !== serviceId));
      toast.success('Service deleted successfully');
    }
  };

  // Delete a subservice
  const deleteSubservice = (serviceId, subserviceId) => {
    if (confirm('Are you sure you want to delete this subservice?')) {
      setServices(prev => 
        prev.map(service => 
          service.id === serviceId
            ? {
                ...service,
                subServices: service.subServices.filter(
                  subservice => subservice.id !== subserviceId
                )
              }
            : service
        )
      );
      toast.success('Subservice deleted successfully');
    }
  };

  // Delete an item
  const deleteItem = (serviceId, subserviceId, itemId) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setServices(prev => 
        prev.map(service => 
          service.id === serviceId
            ? {
                ...service,
                subServices: service.subServices.map(subservice =>
                  subservice.id === subserviceId
                    ? {
                        ...subservice,
                        items: subservice.items.filter(
                          item => item.id !== itemId
                        )
                      }
                    : subservice
                )
              }
            : service
        )
      );
      toast.success('Item deleted successfully');
    }
  };

  // Save all changes
  const saveAllChanges = () => {
    toast.success('All changes saved successfully');
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Button onClick={saveAllChanges}>Save All Changes</Button>
      </div>

      <Tabs defaultValue="services" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-4">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Service Management</CardTitle>
                <CardDescription>
                  Manage your services, subservices, and item details
                </CardDescription>
              </div>
              <Button onClick={openAddServiceDialog} className="flex items-center gap-1">
                <Plus className="h-4 w-4" /> Add Service
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service) => (
                  <Card key={service.id} className="border">
                    <div className="p-3 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleService(service.id)}>
                      <div className="flex items-center gap-2">
                        {service.isOpen ? (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-500" />
                        )}
                        <h3 className="font-medium">{service.name}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleEditService(service.id);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteService(service.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <Collapsible open={service.isOpen}>
                      <CollapsibleContent>
                        <div className="p-4 border-t">
                          {service.isEditing ? (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor={`service-name-${service.id}`}>Service Name</Label>
                                  <Input
                                    id={`service-name-${service.id}`}
                                    value={service.name}
                                    onChange={(e) => handleServiceChange(service.id, 'name', e.target.value)}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor={`service-price-${service.id}`}>Price</Label>
                                  <div className="flex gap-2">
                                    <Input
                                      id={`service-price-${service.id}`}
                                      type="number"
                                      value={service.price}
                                      onChange={(e) => handleServiceChange(service.id, 'price', e.target.value)}
                                    />
                                    <select
                                      value={service.unit}
                                      onChange={(e) => handleServiceChange(service.id, 'unit', e.target.value)}
                                      className="px-2 py-1 border rounded-md w-24"
                                    >
                                      <option value="kg">per kg</option>
                                      <option value="piece">per piece</option>
                                      <option value="meter">per meter</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`service-desc-${service.id}`}>Description</Label>
                                <Input
                                  id={`service-desc-${service.id}`}
                                  value={service.description}
                                  onChange={(e) => handleServiceChange(service.id, 'description', e.target.value)}
                                />
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  onClick={() => toggleEditService(service.id)}
                                >
                                  <X className="h-4 w-4 mr-1" /> Cancel
                                </Button>
                                <Button
                                  onClick={() => saveServiceChanges(service.id)}
                                >
                                  <Save className="h-4 w-4 mr-1" /> Save
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm text-gray-500">Description</Label>
                                  <p>{service.description}</p>
                                </div>
                                <div>
                                  <Label className="text-sm text-gray-500">Price</Label>
                                  <p>₹{service.price} per {service.unit}</p>
                                </div>
                              </div>
                              
                              <div className="mt-4">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-medium">Subservices</h4>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => openAddSubserviceDialog(service.id)}
                                  >
                                    <Plus className="h-4 w-4 mr-1" /> Add Subservice
                                  </Button>
                                </div>
                                
                                <div className="space-y-3 ml-4">
                                  {service.subServices.map((subservice) => (
                                    <Card key={subservice.id} className="border">
                                      <div className="p-2 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                                        onClick={() => toggleSubservice(service.id, subservice.id)}>
                                        <div className="flex items-center gap-2">
                                          {subservice.isOpen ? (
                                            <ChevronDown className="h-4 w-4 text-gray-500" />
                                          ) : (
                                            <ChevronRight className="h-4 w-4 text-gray-500" />
                                          )}
                                          <p className="font-medium text-sm">{subservice.name}</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              openEditSubserviceDialog(service.id, subservice);
                                            }}
                                          >
                                            <Edit className="h-3 w-3" />
                                          </Button>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7 text-red-500"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              deleteSubservice(service.id, subservice.id);
                                            }}
                                          >
                                            <Trash2 className="h-3 w-3" />
                                          </Button>
                                        </div>
                                      </div>
                                      
                                      <Collapsible open={subservice.isOpen}>
                                        <CollapsibleContent className="p-3 pt-0 border-t mt-2">
                                          <div className="grid grid-cols-2 gap-4 py-2">
                                            <div>
                                              <Label className="text-sm text-gray-500">Standard Price</Label>
                                              <p>₹{subservice.standardPrice}</p>
                                            </div>
                                            <div>
                                              <Label className="text-sm text-gray-500">Express Price</Label>
                                              <p>₹{subservice.expressPrice}</p>
                                            </div>
                                          </div>
                                          
                                          <div className="flex justify-between items-center mb-2 mt-2">
                                            <h5 className="text-sm font-medium">Items</h5>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="h-7 text-xs"
                                              onClick={() => openAddItemDialog(service.id, subservice.id)}
                                            >
                                              <Plus className="h-3 w-3 mr-1" /> Add Item
                                            </Button>
                                          </div>
                                          
                                          {subservice.items.length > 0 ? (
                                            <div className="space-y-2">
                                              <div className="grid grid-cols-2 gap-2 px-2 py-1 bg-gray-50 text-xs font-medium">
                                                <div>Name</div>
                                                <div className="text-right">Price</div>
                                              </div>
                                              
                                              {subservice.items.map((item) => (
                                                <div key={item.id} className="grid grid-cols-2 gap-2 px-2 py-2 border-b text-sm">
                                                  <div>{item.name}</div>
                                                  <div className="text-right flex justify-end items-center gap-2">
                                                    ₹{item.price}
                                                    <Button
                                                      variant="ghost"
                                                      size="icon"
                                                      className="h-6 w-6 text-red-500"
                                                      onClick={() => deleteItem(service.id, subservice.id, item.id)}
                                                    >
                                                      <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          ) : (
                                            <p className="text-sm text-gray-500 italic">No items added yet</p>
                                          )}
                                        </CollapsibleContent>
                                      </Collapsible>
                                    </Card>
                                  ))}
                                  
                                  {service.subServices.length === 0 && (
                                    <p className="text-sm text-gray-500 italic">No subservices added yet</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Display Name</Label>
                <Input id="name" defaultValue="Skawsh Laundry Admin" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="admin@skawsh.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Time Zone</Label>
                <select id="timezone" className="w-full p-2 border rounded-md">
                  <option value="IST">(GMT+5:30) India Standard Time</option>
                  <option value="GMT">(GMT+0:00) Greenwich Mean Time</option>
                  <option value="EST">(GMT-5:00) Eastern Standard Time</option>
                </select>
              </div>
              <Separator className="my-4" />
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="font-medium">Email Notifications</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">New Order Alerts</h4>
                    <p className="text-sm text-gray-500">Receive notifications for new orders</p>
                  </div>
                  <div>
                    <input type="checkbox" id="new-order" defaultChecked className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Order Status Updates</h4>
                    <p className="text-sm text-gray-500">Receive notifications when order status changes</p>
                  </div>
                  <div>
                    <input type="checkbox" id="status-update" defaultChecked className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Customer Messages</h4>
                    <p className="text-sm text-gray-500">Receive notifications for new customer inquiries</p>
                  </div>
                  <div>
                    <input type="checkbox" id="customer-messages" defaultChecked className="h-4 w-4" />
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Service Dialog */}
      <Dialog open={isAddServiceDialogOpen} onOpenChange={setIsAddServiceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
            <DialogDescription>
              Create a new service for your laundry business
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-service-name">Service Name</Label>
              <Input
                id="new-service-name"
                value={newService.name}
                onChange={(e) => handleNewServiceChange('name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-service-desc">Description</Label>
              <Input
                id="new-service-desc"
                value={newService.description}
                onChange={(e) => handleNewServiceChange('description', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-service-price">Price</Label>
                <Input
                  id="new-service-price"
                  type="number"
                  value={newService.price}
                  onChange={(e) => handleNewServiceChange('price', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-service-unit">Unit</Label>
                <select
                  id="new-service-unit"
                  value={newService.unit}
                  onChange={(e) => handleNewServiceChange('unit', e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="kg">per kg</option>
                  <option value="piece">per piece</option>
                  <option value="meter">per meter</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddServiceDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addNewService}>
              Add Service
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Subservice Dialog */}
      <Dialog open={isAddSubserviceDialogOpen} onOpenChange={setIsAddSubserviceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Subservice</DialogTitle>
            <DialogDescription>
              Create a new subservice for the selected service
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-subservice-name">Subservice Name</Label>
              <Input
                id="new-subservice-name"
                value={newSubservice.name}
                onChange={(e) => handleNewSubserviceChange('name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-subservice-standard-price">Standard Price</Label>
              <Input
                id="new-subservice-standard-price"
                type="number"
                value={newSubservice.standardPrice}
                onChange={(e) => handleNewSubserviceChange('standardPrice', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-subservice-express-price">Express Price</Label>
              <Input
                id="new-subservice-express-price"
                type="number"
                value={newSubservice.expressPrice}
                onChange={(e) => handleNewSubserviceChange('expressPrice', e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddSubserviceDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addNewSubservice}>
              Add Subservice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Subservice Dialog */}
      <Dialog open={isEditSubserviceDialogOpen} onOpenChange={setIsEditSubserviceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Subservice</DialogTitle>
            <DialogDescription>
              Update the subservice details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-subservice-name">Subservice Name</Label>
              <Input
                id="edit-subservice-name"
                value={editSubservice.name}
                onChange={(e) => handleEditSubserviceChange('name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-subservice-standard-price">Standard Price</Label>
              <Input
                id="edit-subservice-standard-price"
                type="number"
                value={editSubservice.standardPrice}
                onChange={(e) => handleEditSubserviceChange('standardPrice', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-subservice-express-price">Express Price</Label>
              <Input
                id="edit-subservice-express-price"
                type="number"
                value={editSubservice.expressPrice}
                onChange={(e) => handleEditSubserviceChange('expressPrice', e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditSubserviceDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveSubserviceChanges}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Item Dialog */}
      <Dialog open={isAddItemDialogOpen} onOpenChange={setIsAddItemDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
            <DialogDescription>
              Create a new item for the selected subservice
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-item-name">Item Name</Label>
              <Input
                id="new-item-name"
                value={newItem.name}
                onChange={(e) => handleNewItemChange('name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-item-price">Price</Label>
              <Input
                id="new-item-price"
                type="number"
                value={newItem.price}
                onChange={(e) => handleNewItemChange('price', e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddItemDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addNewItem}>
              Add Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;
