
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
  Trash2,
  ToggleLeft,
  Info,
  User,
  MapPin,
  Building2,
  Store,
  CreditCard,
  ChevronUp,
  Shirt,
  Umbrella,
  ShoppingBag,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

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

  const [serviceStatus, setServiceStatus] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: false,
    5: true
  });

  const [subserviceStatus, setSubserviceStatus] = useState<Record<number, boolean>>({
    101: true,
    102: true,
    103: true,
    104: false,
    105: true,
    201: true,
    202: false,
    203: true,
    301: true,
    302: true,
    303: false,
    401: false,
    402: false,
    501: true,
    502: true
  });

  const [expandedInfoSections, setExpandedInfoSections] = useState<Record<string, boolean>>({
    'basic': false,
    'address': false,
    'business': false,
    'studio': false,
    'payment': false
  });

  const services = [
    { 
      id: 1, 
      name: 'Regular Laundry',
      icon: <Shirt className="h-5 w-5 text-blue-500" />,
      subserviceCount: 3,
      subservices: [
        { 
          id: 101, 
          name: 'Wash & Fold', 
          price: '₹59', 
          unit: 'per Kg',
        },
        { 
          id: 102, 
          name: 'Wash & Iron', 
          price: '₹79',
          unit: 'per Kg',
        },
        { 
          id: 103, 
          name: 'Express Laundry (24hr)', 
          price: '₹99',
          unit: 'per Kg',
        },
        { 
          id: 104, 
          name: 'Eco-Friendly Wash', 
          price: '₹89',
          unit: 'per Kg',
        }
      ]
    },
    { 
      id: 2, 
      name: 'Dry Cleaning',
      icon: <Umbrella className="h-5 w-5 text-blue-500" />,
      subserviceCount: 3,
      subservices: [
        { 
          id: 201, 
          name: 'Regular Dry Cleaning', 
          price: '₹199',
          unit: 'per piece',
        },
        { 
          id: 202, 
          name: 'Premium Dry Cleaning', 
          price: '₹299',
          unit: 'per piece',
        },
        { 
          id: 203, 
          name: 'Express Dry Cleaning', 
          price: '₹349',
          unit: 'per piece',
        }
      ]
    },
    { 
      id: 3, 
      name: 'Specialty Garments',
      icon: <ShoppingBag className="h-5 w-5 text-blue-500" />,
      subserviceCount: 3,
      subservices: [
        { 
          id: 301, 
          name: 'Wedding Attire', 
          price: '₹599',
          unit: 'per piece',
        },
        { 
          id: 302, 
          name: 'Silk & Delicates', 
          price: '₹399',
          unit: 'per piece',
        },
        { 
          id: 303, 
          name: 'Curtains & Drapes', 
          price: '₹199',
          unit: 'per square meter',
        }
      ]
    },
    { 
      id: 4, 
      name: 'Shoe & Accessory Care',
      icon: <ShoppingBag className="h-5 w-5 text-blue-500" />,
      subserviceCount: 2,
      subservices: [
        { 
          id: 401, 
          name: 'Shoe Cleaning', 
          price: '₹249',
          unit: 'per pair',
        },
        { 
          id: 402, 
          name: 'Bag Cleaning', 
          price: '₹349',
          unit: 'per piece',
        }
      ]
    },
    { 
      id: 5, 
      name: 'Home Textiles',
      icon: <ShoppingBag className="h-5 w-5 text-blue-500" />,
      subserviceCount: 2,
      subservices: [
        { 
          id: 501, 
          name: 'Bedding & Linens', 
          price: '₹149',
          unit: 'per Kg',
        },
        { 
          id: 502, 
          name: 'Carpet Cleaning', 
          price: '₹75',
          unit: 'per square foot',
        }
      ]
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

  const toggleInfoSection = (section: string) => {
    setExpandedInfoSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleServiceStatus = (serviceId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setServiceStatus(prev => {
      const newStatus = !prev[serviceId];
      toast.success(`${newStatus ? 'Enabled' : 'Disabled'} service`);
      return {
        ...prev,
        [serviceId]: newStatus
      };
    });
  };

  const toggleSubserviceStatus = (subserviceId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setSubserviceStatus(prev => {
      const newStatus = !prev[subserviceId];
      toast.success(`${newStatus ? 'Enabled' : 'Disabled'} subservice`);
      return {
        ...prev,
        [subserviceId]: newStatus
      };
    });
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
    <div className="container mx-auto py-6 px-4 md:px-6 space-y-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Saiteja Laundry</h1>
          <p className="text-sm text-muted-foreground">Manage your laundry studio settings</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Studio Information</h2>
        </div>

        <Card className="border shadow-sm">
          <Collapsible open={expandedInfoSections['basic']} className="w-full">
            <CollapsibleTrigger 
              onClick={() => toggleInfoSection('basic')}
              className="w-full"
            >
              <div className="flex justify-between items-center p-4 hover:bg-gray-50 transition w-full">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold text-base">Basic Information</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8"
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  {expandedInfoSections['basic'] ? 
                    <ChevronDown className="h-5 w-5 text-muted-foreground" /> : 
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  }
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="border-t">
              <div className="p-4 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Owner Name</Label>
                    <p className="text-sm font-medium">Saiteja Reddy</p>
                  </div>
                  <div>
                    <Label>Contact Phone</Label>
                    <p className="text-sm font-medium">+91 9876543210</p>
                  </div>
                  <div>
                    <Label>Email Address</Label>
                    <p className="text-sm font-medium">saiteja@example.com</p>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        <Card className="border shadow-sm">
          <Collapsible open={expandedInfoSections['address']} className="w-full">
            <CollapsibleTrigger 
              onClick={() => toggleInfoSection('address')}
              className="w-full"
            >
              <div className="flex justify-between items-center p-4 hover:bg-gray-50 transition w-full">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold text-base">Address Details</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8"
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  {expandedInfoSections['address'] ? 
                    <ChevronDown className="h-5 w-5 text-muted-foreground" /> : 
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  }
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="border-t">
              <div className="p-4 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Street Address</Label>
                    <p className="text-sm font-medium">123 Laundry Street</p>
                  </div>
                  <div>
                    <Label>City</Label>
                    <p className="text-sm font-medium">Hyderabad</p>
                  </div>
                  <div>
                    <Label>State</Label>
                    <p className="text-sm font-medium">Telangana</p>
                  </div>
                  <div>
                    <Label>Zip Code</Label>
                    <p className="text-sm font-medium">500081</p>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        <Card className="border shadow-sm">
          <Collapsible open={expandedInfoSections['business']} className="w-full">
            <CollapsibleTrigger 
              onClick={() => toggleInfoSection('business')}
              className="w-full"
            >
              <div className="flex justify-between items-center p-4 hover:bg-gray-50 transition w-full">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold text-base">Business Details</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8"
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  {expandedInfoSections['business'] ? 
                    <ChevronDown className="h-5 w-5 text-muted-foreground" /> : 
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  }
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="border-t">
              <div className="p-4 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Business Name</Label>
                    <p className="text-sm font-medium">Saiteja Laundry Services</p>
                  </div>
                  <div>
                    <Label>GST Number</Label>
                    <p className="text-sm font-medium">22AAAAA0000A1Z5</p>
                  </div>
                  <div>
                    <Label>Business Type</Label>
                    <p className="text-sm font-medium">Sole Proprietorship</p>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        <Card className="border shadow-sm">
          <Collapsible open={expandedInfoSections['studio']} className="w-full">
            <CollapsibleTrigger 
              onClick={() => toggleInfoSection('studio')}
              className="w-full"
            >
              <div className="flex justify-between items-center p-4 hover:bg-gray-50 transition w-full">
                <div className="flex items-center gap-3">
                  <Store className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold text-base">Studio Setup</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8"
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  {expandedInfoSections['studio'] ? 
                    <ChevronDown className="h-5 w-5 text-muted-foreground" /> : 
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  }
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="border-t">
              <div className="p-4 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Capacity</Label>
                    <p className="text-sm font-medium">500 kg per day</p>
                  </div>
                  <div>
                    <Label>Operating Hours</Label>
                    <p className="text-sm font-medium">9:00 AM to 8:00 PM</p>
                  </div>
                  <div>
                    <Label>Service Area</Label>
                    <p className="text-sm font-medium">10 km radius</p>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        <Card className="border shadow-sm">
          <Collapsible open={expandedInfoSections['payment']} className="w-full">
            <CollapsibleTrigger 
              onClick={() => toggleInfoSection('payment')}
              className="w-full"
            >
              <div className="flex justify-between items-center p-4 hover:bg-gray-50 transition w-full">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold text-base">Payment Details</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8"
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  {expandedInfoSections['payment'] ? 
                    <ChevronDown className="h-5 w-5 text-muted-foreground" /> : 
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  }
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="border-t">
              <div className="p-4 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Bank Name</Label>
                    <p className="text-sm font-medium">Indian Bank</p>
                  </div>
                  <div>
                    <Label>Account Number</Label>
                    <p className="text-sm font-medium">XXXX XXXX XXXX 4321</p>
                  </div>
                  <div>
                    <Label>UPI ID</Label>
                    <p className="text-sm font-medium">saiteja@upi</p>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      </div>

      <div className="space-y-4 mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Services Management</h2>
        </div>
        
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
            className="flex items-center gap-2 ml-4" 
            onClick={() => setAddServiceDialogOpen(true)}
          >
            <Plus size={16} />
            Add Service
          </Button>
        </div>

        <div className="space-y-3">
          {services.map(service => (
            <div key={service.id} className="w-full">
              <div className={`w-full bg-blue-50 rounded-md overflow-hidden ${!serviceStatus[service.id] ? 'opacity-70' : ''}`}>
                <div className="flex items-center justify-between px-4 py-4 w-full">
                  <div className="flex items-center gap-3 cursor-pointer flex-1" onClick={() => toggleServiceExpand(service.id)}>
                    <div className="bg-blue-100 rounded-full p-2">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{service.name}</h3>
                      <p className="text-sm text-gray-500">Sub services {service.subservices.length}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {serviceStatus[service.id] ? 'Active' : 'Inactive'}
                      </span>
                      <Switch 
                        checked={serviceStatus[service.id]} 
                        onCheckedChange={(checked) => {
                          setServiceStatus(prev => ({
                            ...prev,
                            [service.id]: checked
                          }));
                          toast.success(`${service.name} ${checked ? 'enabled' : 'disabled'}`);
                        }}
                      />
                    </div>
                    <div className="flex">
                      <Button 
                        variant="editIcon"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.info(`Editing ${service.name}`);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="deleteIcon" 
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.error(`This would delete service: ${service.name}`);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    {expandedServices[service.id] ? 
                      <ChevronUp className="h-5 w-5 text-gray-500 cursor-pointer" onClick={() => toggleServiceExpand(service.id)}/> : 
                      <ChevronDown className="h-5 w-5 text-gray-500 cursor-pointer" onClick={() => toggleServiceExpand(service.id)}/>
                    }
                  </div>
                </div>
              </div>

              {expandedServices[service.id] && (
                <div className="space-y-2 mt-2 pl-10">
                  {service.subservices.map(subservice => (
                    <div key={subservice.id} className="w-full">
                      <div className={`w-full bg-blue-50/50 border border-blue-100 rounded-md ${!subserviceStatus[subservice.id] ? 'opacity-70' : ''}`}>
                        <div className="flex items-center justify-between px-4 py-3 w-full">
                          <div className="flex-1">
                            <div>
                              <h4 className="font-medium text-base">{subservice.name}</h4>
                              <p className="text-sm text-gray-500">
                                {subservice.price} {subservice.unit}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">
                                {subserviceStatus[subservice.id] ? 'Active' : 'Inactive'}
                              </span>
                              <Switch 
                                checked={subserviceStatus[subservice.id]} 
                                onCheckedChange={(checked) => {
                                  setSubserviceStatus(prev => ({
                                    ...prev,
                                    [subservice.id]: checked
                                  }));
                                  toast.success(`${subservice.name} ${checked ? 'enabled' : 'disabled'}`);
                                }}
                              />
                            </div>
                            <div className="flex">
                              <Button 
                                variant="editIcon" 
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toast.info(`Editing ${subservice.name}`);
                                }}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="deleteIcon" 
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toast.error(`This would delete subservice: ${subservice.name}`);
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-2">
                    <Button 
                      variant="addSubService"
                      className="w-full py-2"
                      onClick={() => {
                        toast.info(`Add new subservice to ${service.name}`);
                      }}
                    >
                      <Plus className="h-4 w-4" />
                      Add New Subservice
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Dialog open={addServiceDialogOpen} onOpenChange={setAddServiceDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold text-blue-600 mb-4">Add Service</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="service-name" className="text-base">Service Name</Label>
              <Input 
                id="service-name" 
                placeholder="Service Name" 
                value={newServiceName}
                onChange={(e) => setNewServiceName(e.target.value)}
                className="border-2 rounded-md"
              />
            </div>
            
            <div className="space-y-3">
              <Label className="text-base">Sub Services</Label>
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
              className="flex items-center justify-center gap-1 w-full"
            >
              <Plus className="h-4 w-4" />
              Add Sub Service
            </Button>
            
            <div className="flex justify-end gap-3 mt-6">
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
