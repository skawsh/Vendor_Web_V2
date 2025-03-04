
import React, { useState } from 'react';
import { 
  Settings as SettingsIcon,
  Pencil,
  Search,
  Plus,
  ChevronRight,
  ChevronDown,
  Save,
  X,
  ArrowLeft,
  Trash2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

const Settings = () => {
  const [searchServiceQuery, setSearchServiceQuery] = useState('');
  const [expandedServices, setExpandedServices] = useState<Record<number, boolean>>({});
  const [expandedSubservices, setExpandedSubservices] = useState<Record<number, boolean>>({});
  const [addServiceDialogOpen, setAddServiceDialogOpen] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');
  const [subServices, setSubServices] = useState<{
    id: number;
    name: string;
    basePrice: string;
    priceUnit: string;
  }[]>([
    { id: 1, name: '', basePrice: '0', priceUnit: 'per piece' }
  ]);

  const services = [
    { 
      id: 1, 
      name: 'Core Laundry Services',
      subserviceCount: 3,
      subservices: [
        { 
          id: 101, 
          name: 'Wash & Fold', 
          price: '₹59', 
          unit: 'per Kg',
          itemCount: 5,
          items: [
            { id: 1, name: 'Shirt', standardPrice: '₹10', expressPrice: '₹15' },
            { id: 2, name: 'Pant', standardPrice: '₹20', expressPrice: '₹30' },
            { id: 3, name: 'Shorts', standardPrice: '₹30', expressPrice: '₹45' },
            { id: 4, name: 'T-Shirt', standardPrice: '₹15', expressPrice: '₹25' },
            { id: 5, name: 'Jeans', standardPrice: '₹35', expressPrice: '₹50' }
          ]
        },
        { 
          id: 102, 
          name: 'Dry Cleaning', 
          price: '₹99',
          unit: 'per piece',
          itemCount: 3,
          items: []
        },
        { 
          id: 103, 
          name: 'Ironing', 
          price: '₹10',
          unit: 'per piece',
          itemCount: 2,
          items: []
        }
      ]
    },
    { 
      id: 2, 
      name: 'Premium Laundry Services',
      subserviceCount: 2,
      subservices: []
    }
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

  const handleAddSubService = () => {
    setSubServices([...subServices, { 
      id: subServices.length + 1, 
      name: '', 
      basePrice: '0', 
      priceUnit: 'per piece' 
    }]);
  };

  const handleRemoveSubService = (id: number) => {
    if (subServices.length > 1) {
      setSubServices(subServices.filter(service => service.id !== id));
    } else {
      toast.error("You need at least one sub-service");
    }
  };

  const handleSubServiceNameChange = (id: number, value: string) => {
    setSubServices(subServices.map(service => 
      service.id === id ? { ...service, name: value } : service
    ));
  };

  const handleSubServiceBasePriceChange = (id: number, value: string) => {
    setSubServices(subServices.map(service => 
      service.id === id ? { ...service, basePrice: value } : service
    ));
  };

  const handleSubServicePriceUnitChange = (id: number, value: string) => {
    setSubServices(subServices.map(service => 
      service.id === id ? { ...service, priceUnit: value } : service
    ));
  };

  const handleSaveNewService = () => {
    if (!newServiceName.trim()) {
      toast.error("Service name is required");
      return;
    }

    if (subServices.some(service => !service.name.trim())) {
      toast.error("All sub-service names are required");
      return;
    }

    toast.success(`Service "${newServiceName}" added with ${subServices.length} sub-services`);
    setNewServiceName('');
    setSubServices([{ id: 1, name: '', basePrice: '0', priceUnit: 'per piece' }]);
    setAddServiceDialogOpen(false);
  };

  const handleEditItem = (id: number, type: 'service' | 'subservice' | 'item') => {
    toast.info(`Editing ${type} with ID: ${id}`);
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Saiteja Laundry - Services</h1>
          <p className="text-sm text-muted-foreground">Manage all laundry services offered by this studio</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search services, subservices or items..." 
              className="pl-10"
              value={searchServiceQuery}
              onChange={(e) => setSearchServiceQuery(e.target.value)}
            />
          </div>
          <Button 
            className="flex items-center gap-2" 
            onClick={() => setAddServiceDialogOpen(true)}
          >
            <Plus size={16} />
            Add Service
          </Button>
        </div>

        <div className="space-y-2">
          {services.map(service => (
            <div key={service.id} className="border rounded-lg overflow-hidden bg-white">
              <Collapsible open={expandedServices[service.id]}>
                <CollapsibleTrigger 
                  onClick={() => toggleServiceExpand(service.id)}
                  className="w-full"
                >
                  <div className="flex justify-between items-center p-4 hover:bg-gray-50 transition">
                    <div className="flex items-center gap-2">
                      {expandedServices[service.id] ? 
                        <ChevronDown className="h-5 w-5 text-muted-foreground" /> : 
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      }
                      <div>
                        <h3 className="font-semibold">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">{service.subserviceCount} subservices</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        {service.subserviceCount} Subservices
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditItem(service.id, 'service');
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="border-t">
                  <div className="p-4 space-y-2">
                    {service.subservices.map(subservice => (
                      <div key={subservice.id} className="border rounded-lg">
                        <Collapsible open={expandedSubservices[subservice.id]}>
                          <CollapsibleTrigger 
                            onClick={() => toggleSubserviceExpand(subservice.id)}
                            className="w-full"
                          >
                            <div className="flex justify-between items-center p-3 hover:bg-gray-50 transition">
                              <div className="flex items-center gap-2">
                                {expandedSubservices[subservice.id] ? 
                                  <ChevronDown className="h-4 w-4 text-muted-foreground" /> : 
                                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                }
                                <div>
                                  <h4 className="font-medium">{subservice.name}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {subservice.price} {subservice.unit} • {subservice.itemCount} items
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="gap-1"
                                >
                                  <Plus className="h-4 w-4" />
                                  Add Item
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditItem(subservice.id, 'subservice');
                                  }}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-8 w-8 text-red-500"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="border-t">
                            <div className="p-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {subservice.items.map(item => (
                                  <div key={item.id} className="border rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-4">
                                      <h5 className="font-medium">{item.name}</h5>
                                      <Button 
                                        variant="ghost" 
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => handleEditItem(item.id, 'item')}
                                      >
                                        <Pencil className="h-4 w-4" />
                                      </Button>
                                    </div>
                                    <div className="space-y-2">
                                      <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Standard</span>
                                        <span className="font-medium">{item.standardPrice}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Express</span>
                                        <span className="font-medium">{item.expressPrice}</span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <Button 
                                variant="outline"
                                className="mt-4 gap-1"
                              >
                                <Plus className="h-4 w-4" />
                                Add New Item
                              </Button>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    ))}
                    <Button 
                      variant="outline"
                      className="w-full gap-1"
                    >
                      <Plus className="h-4 w-4" />
                      Add New Subservice
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={addServiceDialogOpen} onOpenChange={setAddServiceDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold text-blue-600 mb-4">Add Service</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="service-name">Service Name</Label>
              <Input 
                id="service-name" 
                placeholder="Service Name" 
                value={newServiceName}
                onChange={(e) => setNewServiceName(e.target.value)}
                className="border-2 rounded-md"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Sub Services</Label>
              <div className="space-y-4">
                {subServices.map((service) => (
                  <div key={service.id} className="p-4 border rounded-md bg-gray-50">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor={`sub-service-${service.id}`}>Sub Service Name</Label>
                        <Input 
                          id={`sub-service-${service.id}`} 
                          placeholder="Sub service name" 
                          value={service.name}
                          onChange={(e) => handleSubServiceNameChange(service.id, e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`base-price-${service.id}`}>Base Price</Label>
                          <Input 
                            id={`base-price-${service.id}`} 
                            type="number"
                            min="0"
                            placeholder="0" 
                            value={service.basePrice}
                            onChange={(e) => handleSubServiceBasePriceChange(service.id, e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`price-unit-${service.id}`}>Price Unit</Label>
                          <Input 
                            id={`price-unit-${service.id}`} 
                            placeholder="per piece" 
                            value={service.priceUnit}
                            onChange={(e) => handleSubServicePriceUnitChange(service.id, e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </div>
                      
                      <Button 
                        variant="removeSubService"
                        onClick={() => handleRemoveSubService(service.id)}
                        className="flex items-center justify-center gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove Sub Service
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Button 
              variant="addSubService" 
              onClick={handleAddSubService}
              className="flex items-center justify-center gap-1"
            >
              <Plus className="h-4 w-4" />
              Add Sub Service
            </Button>
            
            <div className="flex justify-end gap-2 mt-6">
              <Button 
                variant="cancel" 
                onClick={() => setAddServiceDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSaveNewService}
              >
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;
