import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronDown, ChevronRight, Edit, Plus, Save, Trash2, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Item {
  id: string;
  name: string;
  price: number;
  standardPrice: number;
  expressPrice: number;
}

interface Subservice {
  id: string;
  name: string;
  isOpen: boolean;
  price?: number;
  items: Item[];
}

interface Service {
  id: string;
  name: string;
  isOpen: boolean;
  description: string;
  price: number;
  unit: string;
  isEditing: boolean;
  subServices: Subservice[];
}

interface NewSubservice {
  name: string;
  parentServiceId: string;
  price?: string;
}

interface EditSubservice {
  id: string;
  name: string;
  parentServiceId: string;
  price?: string;
}

const Settings = () => {
  const [services, setServices] = useState<Service[]>([{
    id: '1',
    name: 'Wash & Fold',
    isOpen: false,
    description: 'Garments are washed and folded neatly',
    price: 49,
    unit: 'kg',
    isEditing: false,
    subServices: [{
      id: '1-1',
      name: 'Regular Wash',
      isOpen: false,
      items: [{
        id: '1-1-1',
        name: 'T-shirt',
        price: 40,
        standardPrice: 40,
        expressPrice: 60
      }, {
        id: '1-1-2',
        name: 'Jeans',
        price: 50,
        standardPrice: 50,
        expressPrice: 70
      }]
    }, {
      id: '1-2',
      name: 'Premium Wash',
      isOpen: false,
      items: [{
        id: '1-2-1',
        name: 'Dress Shirt',
        price: 60,
        standardPrice: 60,
        expressPrice: 90
      }, {
        id: '1-2-2',
        name: 'Trousers',
        price: 70,
        standardPrice: 70,
        expressPrice: 100
      }]
    }]
  }, {
    id: '2',
    name: 'Wash & Iron',
    isOpen: false,
    description: 'Garments are washed and ironed to perfection',
    price: 69,
    unit: 'kg',
    isEditing: false,
    subServices: [{
      id: '2-1',
      name: 'Regular Service',
      isOpen: false,
      items: [{
        id: '2-1-1',
        name: 'Shirt',
        price: 55,
        standardPrice: 55,
        expressPrice: 75
      }, {
        id: '2-1-2',
        name: 'Pants',
        price: 65,
        standardPrice: 65,
        expressPrice: 85
      }]
    }, {
      id: '2-2',
      name: 'Premium Service',
      isOpen: false,
      items: [{
        id: '2-2-1',
        name: 'Blazer',
        price: 120,
        standardPrice: 120,
        expressPrice: 160
      }, {
        id: '2-2-2',
        name: 'Suit',
        price: 200,
        standardPrice: 200,
        expressPrice: 260
      }]
    }]
  }, {
    id: '3',
    name: 'Dry Clean',
    isOpen: false,
    description: 'Specialized cleaning for delicate fabrics',
    price: 250,
    unit: 'piece',
    isEditing: false,
    subServices: [{
      id: '3-1',
      name: 'Basic Dry Clean',
      isOpen: false,
      items: [{
        id: '3-1-1',
        name: 'Sweater',
        price: 180,
        standardPrice: 180,
        expressPrice: 250
      }, {
        id: '3-1-2',
        name: 'Winter Jacket',
        price: 350,
        standardPrice: 350,
        expressPrice: 450
      }]
    }, {
      id: '3-2',
      name: 'Premium Dry Clean',
      isOpen: false,
      items: [{
        id: '3-2-1',
        name: 'Wedding Dress',
        price: 1200,
        standardPrice: 1200,
        expressPrice: 1500
      }, {
        id: '3-2-2',
        name: 'Formal Suit',
        price: 800,
        standardPrice: 800,
        expressPrice: 1000
      }]
    }]
  }]);
  const [isAddServiceDialogOpen, setIsAddServiceDialogOpen] = useState(false);
  const [isAddSubserviceDialogOpen, setIsAddSubserviceDialogOpen] = useState(false);
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const [isEditSubserviceDialogOpen, setIsEditSubserviceDialogOpen] = useState(false);
  const [isEditItemDialogOpen, setIsEditItemDialogOpen] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
    unit: 'kg',
    subServices: [{
      name: '',
      price: '',
      id: '0'
    }]
  });
  const [newSubservice, setNewSubservice] = useState<NewSubservice>({
    name: '',
    parentServiceId: '',
    price: ''
  });
  const [editSubservice, setEditSubservice] = useState<EditSubservice>({
    id: '',
    name: '',
    parentServiceId: '',
    price: ''
  });
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    standardPrice: '',
    expressPrice: '',
    parentServiceId: '',
    parentSubserviceId: ''
  });
  const [editItem, setEditItem] = useState({
    id: '',
    name: '',
    price: '',
    standardPrice: '',
    expressPrice: '',
    parentServiceId: '',
    parentSubserviceId: ''
  });

  const toggleService = serviceId => {
    setServices(prevServices => prevServices.map(service => service.id === serviceId ? {
      ...service,
      isOpen: !service.isOpen
    } : service));
  };

  const toggleSubservice = (serviceId, subserviceId) => {
    setServices(prevServices => prevServices.map(service => service.id === serviceId ? {
      ...service,
      subServices: service.subServices.map(subservice => subservice.id === subserviceId ? {
        ...subservice,
        isOpen: !subservice.isOpen
      } : subservice)
    } : service));
  };

  const toggleEditService = serviceId => {
    setServices(prevServices => prevServices.map(service => service.id === serviceId ? {
      ...service,
      isEditing: !service.isEditing
    } : service));
  };

  const handleServiceChange = (serviceId, field, value) => {
    setServices(prevServices => prevServices.map(service => service.id === serviceId ? {
      ...service,
      [field]: value
    } : service));
  };

  const saveServiceChanges = serviceId => {
    toggleEditService(serviceId);
    toast.success('Service updated successfully');
  };

  const openAddServiceDialog = () => {
    setNewService({
      name: '',
      description: '',
      price: '',
      unit: 'kg',
      subServices: [{
        name: '',
        price: '',
        id: '0'
      }]
    });
    setIsAddServiceDialogOpen(true);
  };

  const handleNewServiceChange = (field, value) => {
    setNewService(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSubServiceToForm = () => {
    setNewService(prev => ({
      ...prev,
      subServices: [...prev.subServices, {
        name: '',
        price: '',
        id: String(prev.subServices.length)
      }]
    }));
  };

  const removeSubServiceFromForm = id => {
    if (newService.subServices.length <= 1) {
      toast.error("You need at least one sub-service");
      return;
    }
    setNewService(prev => ({
      ...prev,
      subServices: prev.subServices.filter(ss => ss.id !== id)
    }));
  };

  const handleSubServiceChange = (id, field, value) => {
    setNewService(prev => ({
      ...prev,
      subServices: prev.subServices.map(ss => ss.id === id ? {
        ...ss,
        [field]: value
      } : ss)
    }));
  };

  const addNewService = () => {
    if (!newService.name) {
      toast.error('Please enter a service name');
      return;
    }
    if (!newService.subServices.some(ss => ss.name.trim())) {
      toast.error('Please enter at least one sub-service name');
      return;
    }
    const newId = (services.length + 1).toString();
    setServices(prev => [...prev, {
      id: newId,
      name: newService.name,
      description: newService.description || 'New service',
      price: parseFloat(newService.price) || 0,
      unit: newService.unit,
      isOpen: false,
      isEditing: false,
      subServices: newService.subServices.filter(ss => ss.name.trim()).map((ss, index) => ({
        id: `${newId}-${index + 1}`,
        name: ss.name,
        price: parseFloat(ss.price) || 0,
        isOpen: false,
        items: []
      }))
    }]);
    setIsAddServiceDialogOpen(false);
    toast.success('Service added successfully');
  };

  const openAddSubserviceDialog = serviceId => {
    setNewSubservice({
      name: '',
      parentServiceId: serviceId,
      price: ''
    });
    setIsAddSubserviceDialogOpen(true);
  };

  const handleNewSubserviceChange = (field, value) => {
    setNewSubservice(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addNewSubservice = () => {
    if (!newSubservice.name) {
      toast.error('Please fill all required fields');
      return;
    }
    setServices(prev => prev.map(service => service.id === newSubservice.parentServiceId ? {
      ...service,
      subServices: [...service.subServices, {
        id: `${service.id}-${service.subServices.length + 1}`,
        name: newSubservice.name,
        isOpen: false,
        price: newSubservice.price ? parseFloat(newSubservice.price) : undefined,
        items: []
      }]
    } : service));
    setIsAddSubserviceDialogOpen(false);
    toast.success('Subservice added successfully');
  };

  const openEditSubserviceDialog = (serviceId, subservice) => {
    setEditSubservice({
      id: subservice.id,
      name: subservice.name,
      parentServiceId: serviceId,
      price: subservice.price ? String(subservice.price) : ''
    });
    setIsEditSubserviceDialogOpen(true);
  };

  const handleEditSubserviceChange = (field, value) => {
    setEditSubservice(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveSubserviceChanges = () => {
    if (!editSubservice.name) {
      toast.error('Please fill all required fields');
      return;
    }
    setServices(prev => prev.map(service => service.id === editSubservice.parentServiceId ? {
      ...service,
      subServices: service.subServices.map(subservice => subservice.id === editSubservice.id ? {
        ...subservice,
        name: editSubservice.name,
        price: editSubservice.price ? parseFloat(editSubservice.price) : undefined
      } : subservice)
    } : service));
    setIsEditSubserviceDialogOpen(false);
    toast.success('Subservice updated successfully');
  };

  const openAddItemDialog = (serviceId, subserviceId) => {
    setNewItem({
      name: '',
      price: '',
      standardPrice: '',
      expressPrice: '',
      parentServiceId: serviceId,
      parentSubserviceId: subserviceId
    });
    setIsAddItemDialogOpen(true);
  };

  const handleNewItemChange = (field, value) => {
    setNewItem(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addNewItem = () => {
    if (!newItem.name || !newItem.price || !newItem.standardPrice || !newItem.expressPrice) {
      toast.error('Please fill all required fields');
      return;
    }
    setServices(prev => prev.map(service => service.id === newItem.parentServiceId ? {
      ...service,
      subServices: service.subServices.map(subservice => subservice.id === newItem.parentSubserviceId ? {
        ...subservice,
        items: [...subservice.items, {
          id: `${subservice.id}-${subservice.items.length + 1}`,
          name: newItem.name,
          price: parseFloat(newItem.price),
          standardPrice: parseFloat(newItem.standardPrice),
          expressPrice: parseFloat(newItem.expressPrice)
        }]
      } : subservice)
    } : service));
    setIsAddItemDialogOpen(false);
    toast.success('Item added successfully');
  };

  const openEditItemDialog = (serviceId, subserviceId, item) => {
    setEditItem({
      id: item.id,
      name: item.name,
      price: item.price,
      standardPrice: item.standardPrice || item.price,
      expressPrice: item.expressPrice || item.price * 1.5,
      parentServiceId: serviceId,
      parentSubserviceId: subserviceId
    });
    setIsEditItemDialogOpen(true);
  };

  const handleEditItemChange = (field, value) => {
    setEditItem(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveItemChanges = () => {
    if (!editItem.name || !editItem.price || !editItem.standardPrice || !editItem.expressPrice) {
      toast.error('Please fill all required fields');
      return;
    }
    setServices(prev => prev.map(service => service.id === editItem.parentServiceId ? {
      ...service,
      subServices: service.subServices.map(subservice => subservice.id === editItem.parentSubserviceId ? {
        ...subservice,
        items: subservice.items.map(item => item.id === editItem.id ? {
          ...item,
          name: editItem.name,
          price: parseFloat(editItem.price),
          standardPrice: parseFloat(editItem.standardPrice),
          expressPrice: parseFloat(editItem.expressPrice)
        } : item)
      } : subservice)
    } : service));
    setIsEditItemDialogOpen(false);
    toast.success('Item updated successfully');
  };

  const deleteService = serviceId => {
    if (confirm('Are you sure you want to delete this service?')) {
      setServices(prev => prev.filter(service => service.id !== serviceId));
      toast.success('Service deleted successfully');
    }
  };

  const deleteSubservice = (serviceId, subserviceId) => {
    if (confirm('Are you sure you want to delete this subservice?')) {
      setServices(prev => prev.map(service => service.id === serviceId ? {
        ...service,
        subServices: service.subServices.filter(subservice => subservice.id !== subserviceId)
      } : service));
      toast.success('Subservice deleted successfully');
    }
  };

  const deleteItem = (serviceId, subserviceId, itemId) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setServices(prev => prev.map(service => service.id === serviceId ? {
        ...service,
        subServices: service.subServices.map(subservice => subservice.id === subserviceId ? {
          ...subservice,
          items: subservice.items.filter(item => item.id !== itemId)
        } : subservice)
      } : service));
      toast.success('Item deleted successfully');
    }
  };

  const saveAllChanges = () => {
    toast.success('All changes saved successfully');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Services & Pricing</h1>
          <p className="text-gray-500">Manage your laundry services and pricing</p>
        </div>
        <div className="flex gap-4">
          <Button onClick={openAddServiceDialog} className="flex items-center gap-2">
            <Plus size={16} /> Add Service
          </Button>
          <Button onClick={saveAllChanges} variant="outline" className="flex items-center gap-2">
            <Save size={16} /> Save All Changes
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {services.map(service => (
          <Card key={service.id} className="overflow-hidden">
            <CardHeader className="bg-gray-50 p-4">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  {service.isEditing ? (
                    <div className="space-y-2">
                      <div>
                        <Label htmlFor={`service-name-${service.id}`}>Service Name</Label>
                        <Input
                          id={`service-name-${service.id}`}
                          value={service.name}
                          onChange={e => handleServiceChange(service.id, 'name', e.target.value)}
                          className="max-w-md"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`service-desc-${service.id}`}>Description</Label>
                        <Input
                          id={`service-desc-${service.id}`}
                          value={service.description}
                          onChange={e => handleServiceChange(service.id, 'description', e.target.value)}
                          className="max-w-md"
                        />
                      </div>
                      <div className="flex gap-4">
                        <div className="w-32">
                          <Label htmlFor={`service-price-${service.id}`}>Price</Label>
                          <Input
                            id={`service-price-${service.id}`}
                            value={service.price}
                            onChange={e => handleServiceChange(service.id, 'price', parseFloat(e.target.value) || 0)}
                            type="number"
                          />
                        </div>
                        <div className="w-32">
                          <Label htmlFor={`service-unit-${service.id}`}>Unit</Label>
                          <Input
                            id={`service-unit-${service.id}`}
                            value={service.unit}
                            onChange={e => handleServiceChange(service.id, 'unit', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <CardTitle className="text-xl">{service.name}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                      <div className="mt-1 text-sm">
                        <span className="font-medium">₹{service.price}</span> per {service.unit}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {service.isEditing ? (
                    <Button onClick={() => saveServiceChanges(service.id)}>
                      <Save size={16} className="mr-2" /> Save
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => toggleEditService(service.id)}
                        className="h-8 w-8"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => deleteService(service.id)}
                        className="h-8 w-8 text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleService(service.id)}
                    className="h-8 w-8"
                  >
                    {service.isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <Collapsible open={service.isOpen}>
              <CardContent className="p-0">
                <div className="p-4 border-t">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Sub-services</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openAddSubserviceDialog(service.id)}
                      className="flex items-center gap-1 text-xs"
                    >
                      <Plus size={14} /> Add Sub-service
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {service.subServices.map(subservice => (
                      <Card key={subservice.id} className="overflow-hidden border shadow-sm">
                        <div className="flex justify-between items-center p-3 bg-gray-50">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleSubservice(service.id, subservice.id)}
                              className="h-6 w-6"
                            >
                              {subservice.isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            </Button>
                            <h4 className="font-medium text-sm">
                              {subservice.name}
                              {subservice.price && <span className="ml-2 text-gray-500">₹{subservice.price}</span>}
                            </h4>
                          </div>
                          <div className="flex items-center gap-1">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-7 w-7">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <circle cx="12" cy="12" r="1" />
                                    <circle cx="12" cy="5" r="1" />
                                    <circle cx="12" cy="19" r="1" />
                                  </svg>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuItem onClick={() => openEditSubserviceDialog(service.id, subservice)}>
                                  <Edit size={14} className="mr-2" /> Edit Subservice
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => deleteSubservice(service.id, subservice.id)}
                                  className="text-red-500 hover:text-red-600"
                                >
                                  <Trash2 size={14} className="mr-2" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        <Collapsible open={subservice.isOpen}>
                          <CardContent className="p-3 pt-0">
                            <div className="pt-3 border-t">
                              <div className="flex justify-between items-center mb-2">
                                <h5 className="text-xs font-medium text-gray-500">ITEMS</h5>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openAddItemDialog(service.id, subservice.id)}
                                  className="h-6 flex items-center gap-1 text-xs"
                                >
                                  <Plus size={12} /> Add Item
                                </Button>
                              </div>
                              <div className="space-y-2">
                                {subservice.items.length === 0 && (
                                  <p className="text-sm text-gray-500">No items added yet</p>
                                )}
                                {subservice.items.map(item => (
                                  <div
                                    key={item.id}
                                    className="flex justify-between items-center p-2 rounded-md hover:bg-gray-50"
                                  >
                                    <div>
                                      <p className="text-sm font-medium">{item.name}</p>
                                      <p className="text-xs text-gray-500">
                                        Standard: ₹{item.standardPrice} | Express: ₹{item.expressPrice}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => openEditItemDialog(service.id, subservice.id, item)}
                                        className="h-6 w-6"
                                      >
                                        <Edit size={12} />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => deleteItem(service.id, subservice.id, item.id)}
                                        className="h-6 w-6 text-red-500 hover:text-red-700"
                                      >
                                        <Trash2 size={12} />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Collapsible>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Collapsible>
          </Card>
        ))}
      </div>

      <Dialog open={isAddServiceDialogOpen} onOpenChange={setIsAddServiceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
            <DialogDescription>Create a new laundry service with sub-services</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="service-name">Service Name *</Label>
              <Input
                id="service-name"
                value={newService.name}
                onChange={e => handleNewServiceChange('name', e.target.value)}
                placeholder="e.g. Dry Cleaning"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service-description">Description</Label>
              <Input
                id="service-description"
                value={newService.description}
                onChange={e => handleNewServiceChange('description', e.target.value)}
                placeholder="Brief description of service"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="service-price">Base Price</Label>
                <Input
                  id="service-price"
                  type="number"
                  value={newService.price}
                  onChange={e => handleNewServiceChange('price', e.target.value)}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service-unit">Unit</Label>
                <Input
                  id="service-unit"
                  value={newService.unit}
                  onChange={e => handleNewServiceChange('unit', e.target.value)}
                  placeholder="kg, piece, etc."
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Sub-services *</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={addSubServiceToForm}
                  className="h-6 flex items-center gap-1 text-xs"
                >
                  <Plus size={12} /> Add Another
                </Button>
              </div>
              <div className="space-y-3">
                {newService.subServices.map((ss, index) => (
                  <div key={ss.id} className="flex gap-2 items-start">
                    <div className="flex-1">
                      <Input
                        value={ss.name}
                        onChange={e => handleSubServiceChange(ss.id, 'name', e.target.value)}
                        placeholder={`Sub-service name ${index + 1}`}
                      />
                    </div>
                    <div className="w-1/3">
                      <Input
                        type="number"
                        value={ss.price}
                        onChange={e => handleSubServiceChange(ss.id, 'price', e.target.value)}
                        placeholder="Price (optional)"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSubServiceFromForm(ss.id)}
                      className="h-8 w-8 text-red-500 mt-1"
                    >
                      <X size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddServiceDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addNewService}>Add Service</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddSubserviceDialogOpen} onOpenChange={setIsAddSubserviceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Sub-service</DialogTitle>
            <DialogDescription>Create a new sub-service for the selected service</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="subservice-name">Sub-service Name *</Label>
              <Input
                id="subservice-name"
                value={newSubservice.name}
                onChange={e => handleNewSubserviceChange('name', e.target.value)}
                placeholder="e.g. Premium Service"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subservice-price">Price (Optional)</Label>
              <Input
                id="subservice-price"
                type="number"
                value={newSubservice.price}
                onChange={e => handleNewSubserviceChange('price', e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddSubserviceDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addNewSubservice}>Add Sub-service</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditSubserviceDialogOpen} onOpenChange={setIsEditSubserviceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Sub-service</DialogTitle>
            <DialogDescription>Update the sub-service details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="edit-subservice-name">Sub-service Name *</Label>
              <Input
                id="edit-subservice-name"
                value={editSubservice.name}
                onChange={e => handleEditSubserviceChange('name', e.target.value)}
                placeholder="e.g. Premium Service"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-subservice-price">Price (Optional)</Label>
              <Input
                id="edit-subservice-price"
                type="number"
                value={editSubservice.price}
                onChange={e => handleEditSubserviceChange('price', e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditSubserviceDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveSubserviceChanges}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddItemDialogOpen} onOpenChange={setIsAddItemDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
            <DialogDescription>Create a new item for the selected sub-service</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="item-name">Item Name *</Label>
              <Input
                id="item-name"
                value={newItem.name}
                onChange={e => handleNewItemChange('name', e.target.value)}
                placeholder="e.g. Shirt"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="item-price">Default Price *</Label>
              <Input
                id="item-price"
                type="number"
                value={newItem.price}
                onChange={e => handleNewItemChange('price', e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="item-standard-price">Standard Price *</Label>
                <Input
                  id="item-standard-price"
                  type="number"
                  value={newItem.standardPrice}
                  onChange={e => handleNewItemChange('standardPrice', e.target.value)}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="item-express-price">Express Price *</Label>
                <Input
                  id="item-express-price"
                  type="number"
                  value={newItem.expressPrice}
                  onChange={e => handleNewItemChange('expressPrice', e.target.value)}
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddItemDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addNewItem}>Add Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditItemDialogOpen} onOpenChange={setIsEditItemDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogDescription>Update the item details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="edit-item-name">Item Name *</Label>
              <Input
                id="edit-item-name"
                value={editItem.name}
                onChange={e => handleEditItemChange('name', e.target.value)}
                placeholder="e.g. Shirt"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-item-price">Default Price *</Label>
              <Input
                id="edit-item-price"
                type="number"
                value={editItem.price}
                onChange={e => handleEditItemChange('price', e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-item-standard-price">Standard Price *</Label>
                <Input
                  id="edit-item-standard-price"
                  type="number"
                  value={editItem.standardPrice}
                  onChange={e => handleEditItemChange('standardPrice', e.target.value)}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-item-express-price">Express Price *</Label>
                <Input
                  id="edit-item-express-price"
                  type="number"
                  value={editItem.expressPrice}
                  onChange={e => handleEditItemChange('expressPrice', e.target.value)}
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditItemDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveItemChanges}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;
