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
const Settings = () => {
  const [services, setServices] = useState([{
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
  const [newSubservice, setNewSubservice] = useState({
    name: '',
    parentServiceId: ''
  });
  const [editSubservice, setEditSubservice] = useState({
    id: '',
    name: '',
    parentServiceId: ''
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
      parentServiceId: serviceId
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
      parentServiceId: serviceId
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
        name: editSubservice.name
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
  return <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        
      </div>

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
            {services.map(service => <Card key={service.id} className="border">
                <div className="p-3 flex justify-between items-center cursor-pointer hover:bg-gray-50" onClick={() => toggleService(service.id)}>
                  <div className="flex items-center gap-2">
                    {service.isOpen ? <ChevronDown className="h-5 w-5 text-gray-500" /> : <ChevronRight className="h-5 w-5 text-gray-500" />}
                    <div>
                      <h3 className="font-medium">{service.name}</h3>
                      <p className="text-xs text-gray-500">{service.subServices.length} subservice{service.subServices.length !== 1 ? 's' : ''}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={e => {
                  e.stopPropagation();
                  toggleEditService(service.id);
                }}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500" onClick={e => {
                  e.stopPropagation();
                  deleteService(service.id);
                }}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <Collapsible open={service.isOpen}>
                  <CollapsibleContent>
                    <div className="p-4 border-t">
                      {service.isEditing ? <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`service-name-${service.id}`}>Service Name</Label>
                              <Input id={`service-name-${service.id}`} value={service.name} onChange={e => handleServiceChange(service.id, 'name', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`service-price-${service.id}`}>Price</Label>
                              <div className="flex gap-2">
                                <Input id={`service-price-${service.id}`} type="number" value={service.price} onChange={e => handleServiceChange(service.id, 'price', e.target.value)} />
                                <select value={service.unit} onChange={e => handleServiceChange(service.id, 'unit', e.target.value)} className="px-2 py-1 border rounded-md w-24">
                                  <option value="kg">per kg</option>
                                  <option value="piece">per piece</option>
                                  <option value="meter">per meter</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`service-desc-${service.id}`}>Description</Label>
                            <Input id={`service-desc-${service.id}`} value={service.description} onChange={e => handleServiceChange(service.id, 'description', e.target.value)} />
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => toggleEditService(service.id)}>
                              <X className="h-4 w-4 mr-1" /> Cancel
                            </Button>
                            <Button onClick={() => saveServiceChanges(service.id)}>
                              <Save className="h-4 w-4 mr-1" /> Save
                            </Button>
                          </div>
                        </div> : <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              
                              
                            </div>
                          </div>
                          
                          <div className="mt-4 mx-0 my-0 px-0 py-0">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">Subservices</h4>
                              <Button variant="outline" size="sm" onClick={() => openAddSubserviceDialog(service.id)}>
                                <Plus className="h-4 w-4 mr-1" /> Add Subservice
                              </Button>
                            </div>
                            
                            <div className="space-y-3 ml-4">
                              {service.subServices.map(subservice => <Card key={subservice.id} className="border">
                                  <div className="p-2 flex justify-between items-center cursor-pointer hover:bg-gray-50" onClick={() => toggleSubservice(service.id, subservice.id)}>
                                    <div className="flex items-center gap-2">
                                      {subservice.isOpen ? <ChevronDown className="h-4 w-4 text-gray-500" /> : <ChevronRight className="h-4 w-4 text-gray-500" />}
                                      <div>
                                        <p className="font-medium text-sm">{subservice.name}</p>
                                        <div className="flex items-center gap-2">
                                          <p className="text-xs text-gray-500">{subservice.items.length} item{subservice.items.length !== 1 ? 's' : ''}</p>
                                          {subservice.price && <p className="text-xs text-blue-600">₹{subservice.price}</p>}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={e => {
                                e.stopPropagation();
                                openEditSubserviceDialog(service.id, subservice);
                              }}>
                                        <Edit className="h-3 w-3" />
                                      </Button>
                                      <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500" onClick={e => {
                                e.stopPropagation();
                                deleteSubservice(service.id, subservice.id);
                              }}>
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </div>
                                  
                                  <Collapsible open={subservice.isOpen}>
                                    <CollapsibleContent className="p-3 pt-0 border-t mt-2">                                          
                                      <div className="flex justify-between items-center mb-2 mt-2">
                                        <h5 className="text-sm font-medium">Items</h5>
                                        <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => openAddItemDialog(service.id, subservice.id)}>
                                          <Plus className="h-3 w-3 mr-1" /> Add Item
                                        </Button>
                                      </div>
                                      
                                      {subservice.items.length > 0 ? <div className="space-y-2">
                                          <div className="grid grid-cols-4 gap-2 px-2 py-1 bg-gray-50 text-xs font-medium">
                                            <div>Name</div>
                                            
                                            <div className="text-right">Standard Price</div>
                                            <div className="text-right">Express Price</div>
                                          </div>
                                          
                                          {subservice.items.map(item => <div key={item.id} className="grid grid-cols-4 gap-2 px-2 py-2 border-b text-sm">
                                              <div className="flex items-center">
                                                {item.name}
                                                <Button variant="ghost" size="icon" className="h-6 w-6 ml-2" onClick={() => openEditItemDialog(service.id, subservice.id, item)}>
                                                  <Edit className="h-3 w-3" />
                                                </Button>
                                              </div>
                                              <div className="text-right">₹{item.price}</div>
                                              <div className="text-right">₹{item.standardPrice || item.price}</div>
                                              <div className="text-right flex justify-end items-center gap-2">
                                                ₹{item.expressPrice || (item.price * 1.5).toFixed(0)}
                                                <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500" onClick={() => deleteItem(service.id, subservice.id, item.id)}>
                                                  <Trash2 className="h-3 w-3" />
                                                </Button>
                                              </div>
                                            </div>)}
                                        </div> : <p className="text-sm text-gray-500 italic">No items added yet</p>}
                                    </CollapsibleContent>
                                  </Collapsible>
                                </Card>)}
                              
                              {service.subServices.length === 0 && <p className="text-sm text-gray-500 italic">No subservices added yet</p>}
                            </div>
                          </div>
                        </div>}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </Card>)}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isAddServiceDialogOpen} onOpenChange={setIsAddServiceDialogOpen}>
        <DialogContent className="sm:max-w-md p-8 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-blue-500 text-2xl font-medium">Add Service</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-service-name" className="text-gray-700 font-medium">Service Name</Label>
              <Input id="new-service-name" value={newService.name} onChange={e => handleNewServiceChange('name', e.target.value)} placeholder="Service Name" />
            </div>
            
            <div className="space-y-4">
              <Label className="text-gray-700 font-medium">Sub Services</Label>
              <div className="space-y-6 border rounded-md p-6 bg-gray-50">
                {newService.subServices.map((subService, index) => <div key={subService.id} className="space-y-2">
                    <Label htmlFor={`sub-service-${subService.id}`} className="text-gray-700">Sub Service Name</Label>
                    <Input id={`sub-service-${subService.id}`} value={subService.name} onChange={e => handleSubServiceChange(subService.id, 'name', e.target.value)} placeholder="Sub service name" className="flex-1 bg-white border-gray-200 shadow-sm" />
                    
                    <Label htmlFor={`sub-service-price-${subService.id}`} className="text-gray-700 mt-2">Price (Optional)</Label>
                    <Input id={`sub-service-price-${subService.id}`} value={subService.price} onChange={e => handleSubServiceChange(subService.id, 'price', e.target.value)} placeholder="Enter price" type="number" className="flex-1 bg-white border-gray-200 shadow-sm" />
                    
                    <Button variant="removeSubService" onClick={() => removeSubServiceFromForm(subService.id)} className="mt-2 py-2 px-4 h-auto">
                      Remove Sub Service
                    </Button>
                  </div>)}
                <Button variant="addSubService" onClick={addSubServiceToForm} className="mt-4 py-2 px-4 h-auto">
                  Add Sub Service
                </Button>
              </div>
            </div>
          </div>
          <div className="pt-4 flex justify-start">
            <Button variant="saveService" onClick={addNewService} className="w-24 py-2 px-4 h-auto">
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
              <Input id="new-subservice-name" value={newSubservice.name} onChange={e => handleNewSubserviceChange('name', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-subservice-price">Price (Optional)</Label>
              <Input id="new-subservice-price" type="number" value={newSubservice.price || ''} onChange={e => handleNewSubserviceChange('price', e.target.value)} placeholder="Enter price (optional)" />
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

      <Dialog open={isEditSubserviceDialogOpen} onOpenChange={setIsEditSubserviceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Subservice</DialogTitle>
            <DialogDescription>
              Update the subservice name
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-subservice-name">Subservice Name</Label>
              <Input id="edit-subservice-name" value={editSubservice.name} onChange={e => handleEditSubserviceChange('name', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-subservice-price">Price (Optional)</Label>
              <Input id="edit-subservice-price" type="number" value={editSubservice.price || ''} onChange={e => handleEditSubserviceChange('price', e.target.value)} placeholder="Enter price (optional)" />
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
              <Input id="new-item-name" value={newItem.name} onChange={e => handleNewItemChange('name', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-item-price">Regular Price</Label>
              <Input id="new-item-price" type="number" value={newItem.price} onChange={e => handleNewItemChange('price', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-item-standard-price">Standard Price</Label>
              <Input id="new-item-standard-price" type="number" value={newItem.standardPrice} onChange={e => handleNewItemChange('standardPrice', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-item-express-price">Express Price</Label>
              <Input id="new-item-express-price" type="number" value={newItem.expressPrice} onChange={e => handleNewItemChange('expressPrice', e.target.value)} />
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

      <Dialog open={isEditItemDialogOpen} onOpenChange={setIsEditItemDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogDescription>
              Update the item details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-item-name" className="rounded-md">Item Name</Label>
              <Input id="edit-item-name" value={editItem.name} onChange={e => handleEditItemChange('name', e.target.value)} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-item-standard-price">Standard Price</Label>
              <Input id="edit-item-standard-price" type="number" value={editItem.standardPrice} onChange={e => handleEditItemChange('standardPrice', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-item-express-price">Express Price</Label>
              <Input id="edit-item-express-price" type="number" value={editItem.expressPrice} onChange={e => handleEditItemChange('expressPrice', e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditItemDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveItemChanges}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>;
};
export default Settings;