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
  Zap,
  Clock,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Interface definitions for better type safety
interface SubServiceItem {
  id: number;
  name: string;
  quickWashPrice: string;
  standardWashPrice: string;
  unit: string;
}

interface SubService {
  id: number;
  name: string;
  price: string;
  unit: string;
  items?: SubServiceItem[];
}

interface Service {
  id: number;
  name: string;
  icon: React.ReactNode;
  subserviceCount: number;
  subservices: SubService[];
}

interface NewSubService {
  id: number;
  name: string;
  basePrice: string;
  priceUnit: string;
}

const Settings = () => {
  const [searchServiceQuery, setSearchServiceQuery] = useState('');
  const [expandedServices, setExpandedServices] = useState<Record<number, boolean>>({});
  const [expandedSubservices, setExpandedSubservices] = useState<Record<number, boolean>>({});
  const [addServiceDialogOpen, setAddServiceDialogOpen] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');
  const [nextServiceId, setNextServiceId] = useState(6); // Start after the last existing service ID
  const [nextSubserviceId, setNextSubserviceId] = useState(600); // Start with a higher number to avoid conflicts
  const [subServices, setSubServices] = useState<NewSubService[]>([
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

  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  
  // Initial services data state
  const [services, setServices] = useState<Service[]>([
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
          items: [
            { 
              id: 1001, 
              name: 'T-shirt', 
              quickWashPrice: '₹40', 
              standardWashPrice: '₹30', 
              unit: 'per piece' 
            },
            { 
              id: 1002, 
              name: 'Shirt', 
              quickWashPrice: '₹45', 
              standardWashPrice: '₹35', 
              unit: 'per piece' 
            },
            { 
              id: 1003, 
              name: 'Pants', 
              quickWashPrice: '₹50', 
              standardWashPrice: '₹40', 
              unit: 'per piece' 
            },
            { 
              id: 1004, 
              name: 'Jeans', 
              quickWashPrice: '₹55', 
              standardWashPrice: '₹45', 
              unit: 'per piece' 
            },
            { 
              id: 1005, 
              name: 'Shorts', 
              quickWashPrice: '₹35', 
              standardWashPrice: '₹25', 
              unit: 'per piece' 
            }
          ]
        },
        { 
          id: 102, 
          name: 'Wash & Iron', 
          price: '₹79',
          unit: 'per Kg',
          items: [
            { 
              id: 1006, 
              name: 'T-shirt', 
              quickWashPrice: '₹50', 
              standardWashPrice: '₹40', 
              unit: 'per piece' 
            },
            { 
              id: 1007, 
              name: 'Shirt', 
              quickWashPrice: '₹55', 
              standardWashPrice: '₹45', 
              unit: 'per piece' 
            },
            { 
              id: 1008, 
              name: 'Pants', 
              quickWashPrice: '₹60', 
              standardWashPrice: '₹50', 
              unit: 'per piece' 
            },
            { 
              id: 1009, 
              name: 'Jeans', 
              quickWashPrice: '₹65', 
              standardWashPrice: '₹55', 
              unit: 'per piece' 
            }
          ]
        },
        { 
          id: 103, 
          name: 'Express Laundry (24hr)', 
          price: '₹99',
          unit: 'per Kg',
          items: [
            { 
              id: 1010, 
              name: 'T-shirt', 
              quickWashPrice: '₹60', 
              standardWashPrice: '₹50', 
              unit: 'per piece' 
            },
            { 
              id: 1011, 
              name: 'Shirt', 
              quickWashPrice: '₹65', 
              standardWashPrice: '₹55', 
              unit: 'per piece' 
            },
            { 
              id: 1012, 
              name: 'Pants', 
              quickWashPrice: '₹70', 
              standardWashPrice: '₹60', 
              unit: 'per piece' 
            }
          ]
        },
        { 
          id: 104, 
          name: 'Eco-Friendly Wash', 
          price: '₹89',
          unit: 'per Kg',
          items: [
            { 
              id: 1013, 
              name: 'T-shirt', 
              quickWashPrice: '₹55', 
              standardWashPrice: '₹45', 
              unit: 'per piece' 
            },
            { 
              id: 1014, 
              name: 'Shirt', 
              quickWashPrice: '₹60', 
              standardWashPrice: '₹50', 
              unit: 'per piece' 
            },
            { 
              id: 1015, 
              name: 'Pants', 
              quickWashPrice: '₹65', 
              standardWashPrice: '₹55', 
              unit: 'per piece' 
            }
          ]
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
          items: [
            { 
              id: 2001, 
              name: 'Suit', 
              quickWashPrice: '₹499', 
              standardWashPrice: '₹399', 
              unit: 'per piece' 
            },
            { 
              id: 2002, 
              name: 'Blazer', 
              quickWashPrice: '₹399', 
              standardWashPrice: '₹299', 
              unit: 'per piece' 
            },
            { 
              id: 2003, 
              name: 'Formal Shirt', 
              quickWashPrice: '₹249', 
              standardWashPrice: '₹149', 
              unit: 'per piece' 
            },
            { 
              id: 2004, 
              name: 'Evening Gown', 
              quickWashPrice: '₹599', 
              standardWashPrice: '₹499', 
              unit: 'per piece' 
            }
          ]
        },
        { 
          id: 202, 
          name: 'Premium Dry Cleaning', 
          price: '₹299',
          unit: 'per piece',
          items: [
            { 
              id: 2005, 
              name: 'Designer Suit', 
              quickWashPrice: '₹699', 
              standardWashPrice: '₹599', 
              unit: 'per piece' 
            },
            { 
              id: 2006, 
              name: 'Silk Saree', 
              quickWashPrice: '₹499', 
              standardWashPrice: '₹399', 
              unit: 'per piece' 
            },
            { 
              id: 2007, 
              name: 'Cashmere Sweater', 
              quickWashPrice: '₹449', 
              standardWashPrice: '₹349', 
              unit: 'per piece' 
            }
          ]
        },
        { 
          id: 203, 
          name: 'Express Dry Cleaning', 
          price: '₹349',
          unit: 'per piece',
          items: [
            { 
              id: 2008, 
              name: 'Suit', 
              quickWashPrice: '₹599', 
              standardWashPrice: '₹499', 
              unit: 'per piece' 
            },
            { 
              id: 2009, 
              name: 'Dress', 
              quickWashPrice: '₹499', 
              standardWashPrice: '₹399', 
              unit: 'per piece' 
            },
            { 
              id: 2010, 
              name: 'Formal Pants', 
              quickWashPrice: '₹299', 
              standardWashPrice: '₹199', 
              unit: 'per piece' 
            }
          ]
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
          items: [
            { 
              id: 3001, 
              name: 'Wedding Gown', 
              quickWashPrice: '₹1699', 
              standardWashPrice: '₹1499', 
              unit: 'per piece' 
            },
            { 
              id: 3002, 
              name: 'Sherwani', 
              quickWashPrice: '₹1199', 
              standardWashPrice: '₹999', 
              unit: 'per piece' 
            },
            { 
              id: 3003, 
              name: 'Lehenga', 
              quickWashPrice: '₹1499', 
              standardWashPrice: '₹1299', 
              unit: 'per piece' 
            }
          ]
        },
        { 
          id: 302, 
          name: 'Silk & Delicates', 
          price: '₹399',
          unit: 'per piece',
          items: [
            { 
              id: 3004, 
              name: 'Silk Saree', 
              quickWashPrice: '₹599', 
              standardWashPrice: '₹499', 
              unit: 'per piece' 
            },
            { 
              id: 3005, 
              name: 'Pashmina Shawl', 
              quickWashPrice: '₹499', 
              standardWashPrice: '₹399', 
              unit: 'per piece' 
            },
            { 
              id: 3006, 
              name: 'Silk Tie', 
              quickWashPrice: '₹249', 
              standardWashPrice: '₹199', 
              unit: 'per piece' 
            }
          ]
        },
        { 
          id: 303, 
          name: 'Curtains & Drapes', 
          price: '₹199',
          unit: 'per square meter',
          items: [
            { 
              id: 3007, 
              name: 'Sheer Curtains', 
              quickWashPrice: '₹199', 
              standardWashPrice: '₹149', 
              unit: 'per sq meter' 
            },
            { 
              id: 3008, 
              name: 'Heavy Drapes', 
              quickWashPrice: '₹299', 
              standardWashPrice: '₹249', 
              unit: 'per sq meter' 
            },
            { 
              id: 3009, 
              name: 'Blackout Curtains', 
              quickWashPrice: '₹349', 
              standardWashPrice: '₹299', 
              unit: 'per sq meter' 
            }
          ]
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
          items: [
            { 
              id: 4001, 
              name: 'Leather Shoes', 
              quickWashPrice: '₹349', 
              standardWashPrice: '₹299', 
              unit: 'per pair' 
            },
            { 
              id: 4002, 
              name: 'Sneakers', 
              quickWashPrice: '₹299', 
              standardWashPrice: '₹249', 
              unit: 'per pair' 
            },
            { 
              id: 4003, 
              name: 'Suede Boots', 
              quickWashPrice: '₹399', 
              standardWashPrice: '₹349', 
              unit: 'per pair' 
            }
          ]
        },
        { 
          id: 402, 
          name: 'Bag Cleaning', 
          price: '₹349',
          unit: 'per piece',
          items: [
            { 
              id: 4004, 
              name: 'Leather Handbag', 
              quickWashPrice: '₹549', 
              standardWashPrice: '₹449', 
              unit: 'per piece' 
            },
            { 
              id: 4005, 
              name: 'Backpack', 
              quickWashPrice: '₹349', 
              standardWashPrice: '₹299', 
              unit: 'per piece' 
            },
            { 
              id: 4006, 
              name: 'Designer Purse', 
              quickWashPrice: '₹649', 
              standardWashPrice: '₹549', 
              unit: 'per piece' 
            }
          ]
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
          items: [
            { 
              id: 5001, 
              name: 'Bed Sheet (Single)', 
              quickWashPrice: '₹149', 
              standardWashPrice: '₹99', 
              unit: 'per piece' 
            },
            { 
              id: 5002, 
              name: 'Bed Sheet (Double)', 
              quickWashPrice: '₹199', 
              standardWashPrice: '₹149', 
              unit: 'per piece' 
            },
            { 
              id: 5003, 
              name: 'Duvet Cover', 
              quickWashPrice: '₹249', 
              standardWashPrice: '₹199', 
              unit: 'per piece' 
            },
            { 
              id: 5004, 
              name: 'Pillow Case', 
              quickWashPrice: '₹69', 
              standardWashPrice: '₹49', 
              unit: 'per piece' 
            }
          ]
        },
        { 
          id: 502, 
          name: 'Carpet Cleaning', 
          price: '₹75',
          unit: 'per square foot',
          items: [
            { 
              id: 5005, 
              name: 'Small Rug (up to 4x6)', 
              quickWashPrice: '₹699', 
              standardWashPrice: '₹599', 
              unit: 'per piece' 
            },
            { 
              id: 5006, 
              name: 'Medium Carpet (6x9)', 
              quickWashPrice: '₹1199', 
              standardWashPrice: '₹999', 
              unit: 'per piece' 
            },
            { 
              id: 5007, 
              name: 'Large Area Rug (9x12)', 
              quickWashPrice: '₹1699', 
              standardWashPrice: '₹1499', 
              unit: 'per piece' 
            }
          ]
        }
      ]
    }
  ]);

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

  const toggleItemsExpand = (subserviceId: number) => {
    setExpandedSubservices(prev => ({
      ...prev,
      [subserviceId]: !prev[subserviceId]
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

    // Create new service with subservices
    const newServiceId = nextServiceId;
    
    // Create subservices for the new service
    const newSubservices = subServices.map((subService, index) => {
      const subServiceId = nextSubserviceId + index;
      
      // Update subservice status state
      setSubserviceStatus(prev => ({
        ...prev,
        [subServiceId]: true
      }));
      
      return {
        id: subServiceId,
        name: subService.name,
        price: `₹${subService.basePrice}`,
        unit: subService.priceUnit,
        items: [] // Initially empty items array
      };
    });
    
    // Update services state with the new service
    const newService: Service = {
      id: newServiceId,
      name: newServiceName,
      icon: <ShoppingBag className="h-5 w-5 text-blue-500" />, // Default icon
      subserviceCount: subServices.length,
      subservices: newSubservices
    };
    
    setServices([...services, newService]);
    
    // Update service status
    setServiceStatus(prev => ({
      ...prev,
      [newServiceId]: true
    }));
    
    // Auto-expand the new service
    setExpandedServices(prev => ({
      ...prev,
      [newServiceId]: true
    }));
    
    // Increment IDs for next service
    setNextServiceId(prevId => prevId + 1);
    setNextSubserviceId(prevId => prevId + subServices.length);
    
    // Reset form
    setNewServiceName('');
    setSubServices([{ id: 1, name: '', basePrice: '0', priceUnit: 'per piece' }]);
    setAddServiceDialogOpen(false);
    
    toast.success(`Service "${newServiceName}" added with ${subServices.length} sub-services`);
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
                          <div className="flex-1 cursor-pointer" onClick={() => toggleItemsExpand(subservice.id)}>
                            <div>
                              <h4 className="font-medium text-base">{subservice.name}</h4>
                              <p className="text-sm text-gray-500">
                                {subservice.price} {subservice.unit} • {subservice.items?.length || 0} items
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
                            {expandedSubservices[subservice.id] ? 
                              <ChevronUp className="h-5 w-5 text-gray-500 cursor-pointer" onClick={() => toggleSubserviceExpand(subservice.id)} /> : 
                              <ChevronDown className="h-5 w-5 text-gray-500 cursor-pointer" onClick={() => toggleSubserviceExpand(subservice.id)} />
                            }
                          </div>
                        </div>
                        
                        {expandedSubservices[subservice.id] && subservice.items && (
                          <div className="border-t border-blue-100 p-3">
                            <div className="bg-white rounded-md overflow-hidden">
                              <Table>
                                <TableHeader>
                                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                                    <TableHead className="w-[40%]">Item Name</TableHead>
                                    <TableHead className="w-[25%]">
                                      <div className="flex items-center gap-1.5 justify-center">
                                        <Zap className="h-3.5 w-3.5 text-amber-500" />
                                        <span>Quick Wash</span>
                                      </div>
                                    </TableHead>
                                    <TableHead className="w-[25%]">
                                      <div className="flex items-center gap-1.5 justify-center">
                                        <Clock className="h-3.5 w-3.5 text-blue-500" />
                                        <span>Standard Wash</span>
                                      </div>
                                    </TableHead>
                                    <TableHead className="w-[10%] text-center">Actions</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {subservice.items.map(item => (
                                    <TableRow key={item.id}>
                                      <TableCell className="font-medium">{item.name}</TableCell>
                                      <TableCell className="text-center">
                                        <div className="flex justify-center">
                                          <Button variant="quickWash" className="pointer-events-none">
                                            {item.quickWashPrice}
                                          </Button>
                                        </div>
                                      </TableCell>
                                      <TableCell className="text-center">
                                        <div className="flex justify-center">
                                          <Button variant="standardWash" className="pointer-events-none">
                                            {item.standardWashPrice}
                                          </Button>
                                        </div>
                                      </TableCell>
                                      <TableCell className="text-center">
                                        <div className="flex justify-center gap-1">
                                          <Button 
                                            variant="editIcon" 
                                            size="icon"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleEditItem(item.id, 'item');
                                            }}
                                          >
                                            <Pencil className="h-3 w-3" />
                                          </Button>
                                          <Button 
                                            variant="deleteIcon" 
                                            size="icon"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              toast.error(`This would delete item: ${item.name}`);
                                            }}
                                          >
                                            <Trash2 className="h-3 w-3" />
                                          </Button>
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <Dialog open={addServiceDialogOpen} onOpenChange={setAddServiceDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
            <DialogDescription>
              Create a new service and add sub-services to it
            </DialogDescription>
          </DialogHeader>
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="serviceName">Service Name</Label>
                <Input 
                  id="serviceName" 
                  value={newServiceName} 
                  onChange={(e) => setNewServiceName(e.target.value)} 
                  placeholder="E.g., Premium Laundry"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Sub Services</Label>
                {subServices.map((subService, index) => (
                  <div key={subService.id} className="grid grid-cols-12 gap-3 items-center">
                    <div className="col-span-5">
                      <Input 
                        value={subService.name} 
                        onChange={(e) => handleSubServiceNameChange(subService.id, e.target.value)} 
                        placeholder="Sub-service name"
                      />
                    </div>
                    <div className="col-span-3">
                      <Input 
                        value={subService.basePrice} 
                        onChange={(e) => handleSubServiceBasePriceChange(subService.id, e.target.value)} 
                        placeholder="Price"
                        type="number"
                      />
                    </div>
                    <div className="col-span-3">
                      <Input 
                        value={subService.priceUnit} 
                        onChange={(e) => handleSubServicePriceUnitChange(subService.id, e.target.value)} 
                        placeholder="Unit"
                      />
                    </div>
                    <div className="col-span-1">
                      <Button 
                        variant="deleteIcon"
                        size="icon"
                        onClick={() => handleRemoveSubService(subService.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  onClick={handleAddSubService}
                  className="w-full mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Sub-service
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 p-6 pt-0">
            <Button 
              variant="outline" 
              onClick={() => setAddServiceDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveNewService}>
              Save Service
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;

