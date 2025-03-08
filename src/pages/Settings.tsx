
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
  ListPlus,
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
  items: NewItem[];
}

interface NewItem {
  id: number;
  name: string;
  quickWashPrice: string;
  standardWashPrice: string;
  unit: string;
}

const Settings = () => {
  const [searchServiceQuery, setSearchServiceQuery] = useState('');
  const [expandedServices, setExpandedServices] = useState<Record<number, boolean>>({});
  const [expandedSubservices, setExpandedSubservices] = useState<Record<number, boolean>>({});
  const [addServiceDialogOpen, setAddServiceDialogOpen] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');
  const [nextServiceId, setNextServiceId] = useState(6);
  const [nextSubserviceId, setNextSubserviceId] = useState(600);
  const [nextItemId, setNextItemId] = useState(10000);

  const [addItemDialogOpen, setAddItemDialogOpen] = useState(false);
  const [selectedSubserviceId, setSelectedSubserviceId] = useState<number | null>(null);
  const [newItem, setNewItem] = useState<NewItem>({
    id: 0,
    name: '',
    quickWashPrice: '',
    standardWashPrice: '',
    unit: 'per piece',
  });

  const [subServices, setSubServices] = useState<NewSubService[]>([
    { 
      id: 1, 
      name: '', 
      basePrice: '0', 
      priceUnit: 'per piece',
      items: [] 
    }
  ]);

  const [expandedSubServiceItems, setExpandedSubServiceItems] = useState<Record<number, boolean>>({});

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

  // Add new state for edit subservice dialog
  const [editSubserviceDialogOpen, setEditSubserviceDialogOpen] = useState(false);
  const [editingSubservice, setEditingSubservice] = useState<SubService | null>(null);
  const [editingServiceId, setEditingServiceId] = useState<number | null>(null);
  const [newSubserviceName, setNewSubserviceName] = useState('');
  const [newSubservicePrice, setNewSubservicePrice] = useState('');
  const [newSubserviceUnit, setNewSubserviceUnit] = useState('per Kg');
  
  // Add new state for add subservice to existing service dialog
  const [addSubserviceDialogOpen, setAddSubserviceDialogOpen] = useState(false);
  const [addingToServiceId, setAddingToServiceId] = useState<number | null>(null);
  const [newSubserviceData, setNewSubserviceData] = useState({
    name: '',
    price: '',
    unit: 'per Kg'
  });

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

  const toggleSubServiceItemsExpand = (subServiceId: number) => {
    setExpandedSubServiceItems(prev => ({
      ...prev,
      [subServiceId]: !prev[subServiceId]
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
      priceUnit: 'per piece',
      items: []
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

  const handleAddItemToSubservice = (subServiceId: number) => {
    const newItemId = Math.max(0, ...subServices.flatMap(s => s.items ? s.items.map(i => i.id) : [0])) + 1;
    
    setSubServices(subServices.map(subService => 
      subService.id === subServiceId 
        ? { 
            ...subService, 
            items: [
              ...(subService.items || []), 
              { 
                id: newItemId, 
                name: '', 
                quickWashPrice: '0', 
                standardWashPrice: '0', 
                unit: subService.priceUnit 
              }
            ] 
          } 
        : subService
    ));
  };

  const handleRemoveItemFromSubservice = (subServiceId: number, itemId: number) => {
    setSubServices(subServices.map(subService => 
      subService.id === subServiceId 
        ? { 
            ...subService, 
            items: (subService.items || []).filter(item => item.id !== itemId) 
          } 
        : subService
    ));
  };

  const handleItemNameChange = (subServiceId: number, itemId: number, value: string) => {
    setSubServices(subServices.map(subService => 
      subService.id === subServiceId 
        ? { 
            ...subService, 
            items: (subService.items || []).map(item => 
              item.id === itemId ? { ...item, name: value } : item
            ) 
          } 
        : subService
    ));
  };

  const handleItemQuickWashPriceChange = (subServiceId: number, itemId: number, value: string) => {
    setSubServices(subServices.map(subService => 
      subService.id === subServiceId 
        ? { 
            ...subService, 
            items: (subService.items || []).map(item => 
              item.id === itemId ? { ...item, quickWashPrice: value } : item
            ) 
          } 
        : subService
    ));
  };

  const handleItemStandardWashPriceChange = (subServiceId: number, itemId: number, value: string) => {
    setSubServices(subServices.map(subService => 
      subService.id === subServiceId 
        ? { 
            ...subService, 
            items: (subService.items || []).map(item => 
              item.id === itemId ? { ...item, standardWashPrice: value } : item
            ) 
          } 
        : subService
    ));
  };

  const handleItemUnitChange = (subServiceId: number, itemId: number, value: string) => {
    setSubServices(subServices.map(subService => 
      subService.id === subServiceId 
        ? { 
            ...subService, 
            items: (subService.items || []).map(item => 
              item.id === itemId ? { ...item, unit: value } : item
            ) 
          } 
        : subService
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

    const invalidPricingSubServices = subServices.filter(subService => {
      const basePrice = parseFloat(subService.basePrice);
      const hasValidBasePrice = basePrice > 0;
      
      const hasValidItemPrices = subService.items && subService.items.some(item => {
        const quickWashPrice = parseFloat(item.quickWashPrice);
        const standardWashPrice = parseFloat(item.standardWashPrice);
        return quickWashPrice > 0 || standardWashPrice > 0;
      });
      
      return !hasValidBasePrice && !hasValidItemPrices;
    });

    if (invalidPricingSubServices.length > 0) {
      const subServiceNames = invalidPricingSubServices.map(s => s.name.trim() || 'Unnamed sub-service').join(', ');
      toast.error(`Please add a price for these sub-services or their items: ${subServiceNames}`);
      return;
    }

    const newServiceId = nextServiceId;
    
    const newSubservices = subServices.map((subService, index) => {
      const subServiceId = nextSubserviceId + index;
      
      setSubserviceStatus(prev => ({
        ...prev,
        [subServiceId]: true
      }));
      
      const itemsList = subService.items.map((item, itemIndex) => {
        const newItemId = nextItemId + itemIndex;
        return {
          id: newItemId,
          name: item.name,
          quickWashPrice: `₹${item.quickWashPrice}`,
          standardWashPrice: `₹${item.standardWashPrice}`,
          unit: item.unit
        };
      });
      
      return {
        id: subServiceId,
        name: subService.name,
        price: `₹${subService.basePrice}`,
        unit: subService.priceUnit,
        items: itemsList
      };
    });
    
    const newService: Service = {
      id: newServiceId,
      name: newServiceName,
      icon: <ShoppingBag className="h-5 w-5 text-blue-500" />,
      subserviceCount: subServices.length,
      subservices: newSubservices
    };
    
    setServices([...services, newService]);
    
    setServiceStatus(prev => ({
      ...prev,
      [newServiceId]: true
    }));
    
    setExpandedServices(prev => ({
      ...prev,
      [newServiceId]: true
    }));
    
    const totalItems = subServices.reduce((total, subService) => total + subService.items.length, 0);
    
    setNextServiceId(prevId => prevId + 1);
    setNextSubserviceId(prevId => prevId + subServices.length);
    setNextItemId(prevId => prevId + totalItems);
    
    setNewServiceName('');
    setSubServices([{ id: 1, name: '', basePrice: '0', priceUnit: 'per piece', items: [] }]);
    setAddServiceDialogOpen(false);
    
    toast.success(`Service "${newServiceName}" added with ${subServices.length} sub-services and ${totalItems} items`);
  };

  const handleOpenAddItemDialog = (subserviceId: number) => {
    setSelectedSubserviceId(subserviceId);
    setNewItem({
      id: nextItemId,
      name: '',
      quickWashPrice: '',
      standardWashPrice: '',
      unit: 'per piece',
    });
    setAddItemDialogOpen(true);
  };

  const handleSaveNewItem = () => {
    if (!newItem.name.trim()) {
      toast.error("Item name is required");
      return;
    }

    if (!selectedSubserviceId) return;

    const serviceWithSubservice = services.find(service => 
      service.subservices.some(subservice => subservice.id === selectedSubserviceId)
    );

    if (!serviceWithSubservice) return;

    const updatedServices = services.map(service => {
      if (service.id !== serviceWithSubservice.id) return service;

      const updatedSubservices = service.subservices.map(subservice => {
        if (subservice.id !== selectedSubserviceId) return subservice;

        const newItemWithPrices = {
          id: nextItemId,
          name: newItem.name,
          quickWashPrice: `₹${newItem.quickWashPrice || "0"}`,
          standardWashPrice: `₹${newItem.standardWashPrice || "0"}`,
          unit: newItem.unit
        };

        return {
          ...subservice,
          items: [...(subservice.items || []), newItemWithPrices]
        };
      });

      return {
        ...service,
        subservices: updatedSubservices
      };
    });

    setServices(updatedServices);
    setNextItemId(prevId => prevId + 1);
    setAddItemDialogOpen(false);
    toast.success(`Item "${newItem.name}" added successfully`);
  };

  // New function to open the edit subservice dialog
  const handleOpenEditSubserviceDialog = (serviceId: number, subservice: SubService) => {
    setEditingServiceId(serviceId);
    setEditingSubservice(subservice);
    setNewSubserviceName(subservice.name);
    setNewSubservicePrice(subservice.price.replace('₹', ''));
    setNewSubserviceUnit(subservice.unit);
    setEditSubserviceDialogOpen(true);
  };

  // New function to save the edited subservice
  const handleSaveEditedSubservice = () => {
    if (!newSubserviceName.trim()) {
      toast.error("Subservice name is required");
      return;
    }

    if (!editingServiceId || !editingSubservice) return;

    const updatedServices = services.map(service => {
      if (service.id !== editingServiceId) return service;

      const updatedSubservices = service.subservices.map(subservice => {
        if (subservice.id !== editingSubservice.id) return subservice;

        return {
          ...subservice,
          name: newSubserviceName,
          price: `₹${newSubservicePrice}`,
          unit: newSubserviceUnit
        };
      });

      return {
        ...service,
        subservices: updatedSubservices
      };
    });

    setServices(updatedServices);
    setEditSubserviceDialogOpen(false);
    toast.success(`Subservice "${newSubserviceName}" updated successfully`);
  };

  // New function to handle opening the add subservice dialog for an existing service
  const handleOpenAddSubserviceDialog = (serviceId: number) => {
    setAddingToServiceId(serviceId);
    setNewSubserviceData({
      name: '',
      price: '',
      unit: 'per Kg'
    });
    setAddSubserviceDialogOpen(true);
  };

  // New function to save a new subservice to an existing service
  const handleSaveNewSubservice = () => {
    if (!newSubserviceData.name.trim()) {
      toast.error("Subservice name is required");
      return;
    }

    if (!addingToServiceId) return;

    const newSubserviceId = nextSubserviceId;
    
    const updatedServices = services.map(service => {
      if (service.id !== addingToServiceId) return service;

      const newSubservice: SubService = {
        id: newSubserviceId,
        name: newSubserviceData.name,
        price: `₹${newSubserviceData.price || "0"}`,
        unit: newSubserviceData.unit,
        items: []
      };

      return {
        ...service,
        subserviceCount: service.subserviceCount + 1,
        subservices: [...service.subservices, newSubservice]
      };
    });

    setServices(updatedServices);
    
    setSubserviceStatus(prev => ({
      ...prev,
      [newSubserviceId]: true
    }));
    
    setNextSubserviceId(prevId => prevId + 1);
    setAddSubserviceDialogOpen(false);
    toast.success(`Subservice "${newSubserviceData.name}" added successfully`);
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex items-center mb-8">
        <SettingsIcon className="mr-2 h-6 w-6" />
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-blue-700 flex items-center">
              <Store className="mr-2 h-5 w-5" />
              Services
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-6">
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search services..."
                  className="pl-10"
                  value={searchServiceQuery}
                  onChange={(e) => setSearchServiceQuery(e.target.value)}
                />
              </div>
              <Button
                className="bg-blue-500 hover:bg-blue-600 ml-4"
                onClick={() => setAddServiceDialogOpen(true)}
              >
                <Plus className="mr-1 h-4 w-4" />
                Add Service
              </Button>
            </div>

            <div className="space-y-3">
              {services.filter(service => 
                searchServiceQuery === '' || 
                service.name.toLowerCase().includes(searchServiceQuery.toLowerCase())
              ).map(service => (
                <div key={service.id} className="border rounded-lg overflow-hidden">
                  <div 
                    className={`flex items-center justify-between p-4 cursor-pointer ${
                      expandedServices[service.id] ? 'bg-blue-50' : 'bg-white'
                    }`}
                    onClick={() => toggleServiceExpand(service.id)}
                  >
                    <div className="flex items-center">
                      <Button variant="serviceIcon" size="icon" className="mr-3 bg-blue-50">
                        {service.icon}
                      </Button>
                      <div>
                        <h3 className="font-medium text-gray-900">{service.name}</h3>
                        <p className="text-sm text-gray-500">{service.subserviceCount} sub-services</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 flex items-center">
                        <Switch 
                          id={`service-status-${service.id}`}
                          checked={serviceStatus[service.id] ?? false}
                          onCheckedChange={() => {}}
                          onClick={(e) => toggleServiceStatus(service.id, e)}
                        />
                        <Label htmlFor={`service-status-${service.id}`} className="ml-2">
                          {serviceStatus[service.id] ? 'Active' : 'Inactive'}
                        </Label>
                      </div>
                      {expandedServices[service.id] ? 
                        <ChevronUp className="h-5 w-5 text-gray-400" /> : 
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      }
                    </div>
                  </div>

                  <Collapsible open={expandedServices[service.id]}>
                    <CollapsibleContent>
                      <div className="p-4 bg-gray-50 border-t">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium text-sm text-gray-700">Sub Services</h4>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-blue-500 border-blue-200 hover:bg-blue-50"
                            onClick={() => handleOpenAddSubserviceDialog(service.id)}
                          >
                            <Plus className="mr-1 h-3 w-3" />
                            Add Sub-service
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          {service.subservices.map(subservice => (
                            <Collapsible key={subservice.id}>
                              <div 
                                className={`flex items-center justify-between p-3 bg-white border rounded-md cursor-pointer ${
                                  expandedSubservices[subservice.id] ? 'border-blue-300' : ''
                                }`}
                                onClick={() => toggleSubserviceExpand(subservice.id)}
                              >
                                <div className="flex items-center">
                                  <div>
                                    <div className="flex items-center">
                                      <h5 className="font-medium text-gray-800">{subservice.name}</h5>
                                      <span className="ml-2 text-sm text-blue-600 font-medium">{subservice.price}</span>
                                      <span className="ml-1 text-xs text-gray-500">{subservice.unit}</span>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                      {subservice.items?.length || 0} items
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center">
                                  <div className="flex items-center mr-3">
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 p-0 mx-1"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleOpenEditSubserviceDialog(service.id, subservice);
                                      }}
                                    >
                                      <Pencil className="h-3.5 w-3.5 text-blue-500" />
                                    </Button>
                                  </div>

                                  <div className="mr-3">
                                    <Switch 
                                      id={`subservice-status-${subservice.id}`}
                                      checked={subserviceStatus[subservice.id] ?? false}
                                      onCheckedChange={() => {}}
                                      onClick={(e) => toggleSubserviceStatus(subservice.id, e)}
                                    />
                                  </div>
                                  
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 px-2"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleOpenAddItemDialog(subservice.id);
                                    }}
                                  >
                                    <ListPlus className="h-3.5 w-3.5 text-blue-500 mr-1" />
                                    <span className="text-xs text-blue-500">Add Item</span>
                                  </Button>
                                  
                                  {expandedSubservices[subservice.id] ? 
                                    <ChevronUp className="h-5 w-5 text-gray-400 ml-1" /> : 
                                    <ChevronDown className="h-5 w-5 text-gray-400 ml-1" />
                                  }
                                </div>
                              </div>

                              <CollapsibleContent>
                                {(subservice.items?.length || 0) > 0 ? (
                                  <div className="mt-2 mb-4 px-2">
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>Item</TableHead>
                                          <TableHead>Quick Wash</TableHead>
                                          <TableHead>Standard Wash</TableHead>
                                          <TableHead>Unit</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {subservice.items?.map(item => (
                                          <TableRow key={item.id}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell quickWash>{item.quickWashPrice}</TableCell>
                                            <TableCell standardWash>{item.standardWashPrice}</TableCell>
                                            <TableCell>{item.unit}</TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </div>
                                ) : (
                                  <div className="p-4 text-center text-gray-500 text-sm">
                                    No items added yet
                                  </div>
                                )}
                              </CollapsibleContent>
                            </Collapsible>
                          ))}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialog for adding a new service */}
      <Dialog open={addServiceDialogOpen} onOpenChange={setAddServiceDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
            <DialogDescription>
              Create a new service and add sub-services to it
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="service-name" className="mb-2 block">Service Name</Label>
              <Input
                id="service-name"
                placeholder="e.g. Regular Laundry"
                value={newServiceName}
                onChange={(e) => setNewServiceName(e.target.value)}
              />
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Sub-services</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-blue-500"
                  onClick={handleAddSubService}
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add Sub-service
                </Button>
              </div>

              {subServices.map((subService, index) => (
                <div key={subService.id} className="mb-6 p-4 border rounded-md bg-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-sm">Sub-service {index + 1}</h4>
                    {subServices.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 h-8 w-8 p-0"
                        onClick={() => handleRemoveSubService(subService.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <Label className="mb-1 block text-xs">Name</Label>
                      <Input
                        placeholder="e.g. Wash & Fold"
                        value={subService.name}
                        onChange={(e) => handleSubServiceNameChange(subService.id, e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="mb-1 block text-xs">Base Price</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5">₹</span>
                        <Input
                          type="number"
                          min="0"
                          placeholder="59"
                          className="pl-7"
                          value={subService.basePrice}
                          onChange={(e) => handleSubServiceBasePriceChange(subService.id, e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="mb-1 block text-xs">Unit</Label>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={subService.priceUnit}
                        onChange={(e) => handleSubServicePriceUnitChange(subService.id, e.target.value)}
                      >
                        <option value="per Kg">per Kg</option>
                        <option value="per piece">per piece</option>
                        <option value="per square meter">per square meter</option>
                        <option value="per square foot">per square foot</option>
                        <option value="per pair">per pair</option>
                      </select>
                    </div>
                  </div>

                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className={`w-full justify-center text-sm ${
                          expandedSubServiceItems[subService.id] ? 'bg-gray-100' : ''
                        }`}
                        onClick={() => toggleSubServiceItemsExpand(subService.id)}
                      >
                        {expandedSubServiceItems[subService.id] ? (
                          <>
                            <ChevronUp className="mr-1 h-4 w-4" />
                            Hide Items
                          </>
                        ) : (
                          <>
                            <ChevronDown className="mr-1 h-4 w-4" />
                            Add Items (Optional)
                          </>
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="mt-4">
                        {(subService.items && subService.items.length > 0) ? (
                          <div className="space-y-3">
                            {subService.items.map((item, itemIndex) => (
                              <div key={item.id} className="grid grid-cols-12 gap-2 items-end bg-white p-2 rounded border">
                                <div className="col-span-3">
                                  <Label className="text-xs mb-1 block">Item Name</Label>
                                  <Input
                                    placeholder="e.g. T-shirt"
                                    value={item.name}
                                    onChange={(e) => handleItemNameChange(subService.id, item.id, e.target.value)}
                                  />
                                </div>
                                <div className="col-span-3">
                                  <Label className="text-xs mb-1 block">Quick Wash Price</Label>
                                  <div className="relative">
                                    <span className="absolute left-3 top-2.5">₹</span>
                                    <Input
                                      type="number"
                                      min="0"
                                      placeholder="40"
                                      className="pl-7"
                                      value={item.quickWashPrice}
                                      onChange={(e) => handleItemQuickWashPriceChange(subService.id, item.id, e.target.value)}
                                    />
                                  </div>
                                </div>
                                <div className="col-span-3">
                                  <Label className="text-xs mb-1 block">Standard Wash Price</Label>
                                  <div className="relative">
                                    <span className="absolute left-3 top-2.5">₹</span>
                                    <Input
                                      type="number"
                                      min="0"
                                      placeholder="30"
                                      className="pl-7"
                                      value={item.standardWashPrice}
                                      onChange={(e) => handleItemStandardWashPriceChange(subService.id, item.id, e.target.value)}
                                    />
                                  </div>
                                </div>
                                <div className="col-span-2">
                                  <Label className="text-xs mb-1 block">Unit</Label>
                                  <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={item.unit}
                                    onChange={(e) => handleItemUnitChange(subService.id, item.id, e.target.value)}
                                  >
                                    <option value="per piece">per piece</option>
                                    <option value="per Kg">per Kg</option>
                                    <option value="per pair">per pair</option>
                                    <option value="per sq meter">per sq meter</option>
                                    <option value="per sq foot">per sq foot</option>
                                  </select>
                                </div>
                                <div className="col-span-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-500 h-10 w-full p-0"
                                    onClick={() => handleRemoveItemFromSubservice(subService.id, item.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center p-4 bg-gray-100 rounded-md text-gray-500 text-sm">
                            No items added
                          </div>
                        )}

                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-3 w-full justify-center"
                          onClick={() => handleAddItemToSubservice(subService.id)}
                        >
                          <Plus className="mr-1 h-4 w-4" />
                          Add Item
                        </Button>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setAddServiceDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNewService}>
              <Save className="mr-1 h-4 w-4" />
              Save Service
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog for adding an item to a subservice */}
      <Dialog open={addItemDialogOpen} onOpenChange={setAddItemDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
            <DialogDescription>
              Add a new item to this sub-service
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="item-name" className="mb-2 block">Item Name</Label>
              <Input
                id="item-name"
                placeholder="e.g. T-shirt"
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="quick-wash-price" className="mb-2 block">Quick Wash Price</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5">₹</span>
                  <Input
                    id="quick-wash-price"
                    type="number"
                    min="0"
                    placeholder="40"
                    className="pl-7"
                    value={newItem.quickWashPrice}
                    onChange={(e) => setNewItem({...newItem, quickWashPrice: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="standard-wash-price" className="mb-2 block">Standard Wash Price</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5">₹</span>
                  <Input
                    id="standard-wash-price"
                    type="number"
                    min="0"
                    placeholder="30"
                    className="pl-7"
                    value={newItem.standardWashPrice}
                    onChange={(e) => setNewItem({...newItem, standardWashPrice: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="unit" className="mb-2 block">Unit</Label>
              <select
                id="unit"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newItem.unit}
                onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
              >
                <option value="per piece">per piece</option>
                <option value="per Kg">per Kg</option>
                <option value="per pair">per pair</option>
                <option value="per sq meter">per sq meter</option>
                <option value="per sq foot">per sq foot</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setAddItemDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNewItem}>
              <Save className="mr-1 h-4 w-4" />
              Save Item
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog for editing a subservice */}
      <Dialog open={editSubserviceDialogOpen} onOpenChange={setEditSubserviceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Sub-service</DialogTitle>
            <DialogDescription>
              Update the sub-service details
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="edit-subservice-name" className="mb-2 block">Name</Label>
              <Input
                id="edit-subservice-name"
                placeholder="e.g. Wash & Fold"
                value={newSubserviceName}
                onChange={(e) => setNewSubserviceName(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="edit-subservice-price" className="mb-2 block">Price</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5">₹</span>
                <Input
                  id="edit-subservice-price"
                  type="number"
                  min="0"
                  placeholder="59"
                  className="pl-7"
                  value={newSubservicePrice}
                  onChange={(e) => setNewSubservicePrice(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-subservice-unit" className="mb-2 block">Unit</Label>
              <select
                id="edit-subservice-unit"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newSubserviceUnit}
                onChange={(e) => setNewSubserviceUnit(e.target.value)}
              >
                <option value="per Kg">per Kg</option>
                <option value="per piece">per piece</option>
                <option value="per square meter">per square meter</option>
                <option value="per square foot">per square foot</option>
                <option value="per pair">per pair</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setEditSubserviceDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEditedSubservice}>
              <Save className="mr-1 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog for adding a new subservice to an existing service */}
      <Dialog open={addSubserviceDialogOpen} onOpenChange={setAddSubserviceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Sub-service</DialogTitle>
            <DialogDescription>
              Add a new sub-service to this service
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="new-subservice-name" className="mb-2 block">Name</Label>
              <Input
                id="new-subservice-name"
                placeholder="e.g. Express Laundry"
                value={newSubserviceData.name}
                onChange={(e) => setNewSubserviceData({...newSubserviceData, name: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="new-subservice-price" className="mb-2 block">Price</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5">₹</span>
                <Input
                  id="new-subservice-price"
                  type="number"
                  min="0"
                  placeholder="99"
                  className="pl-7"
                  value={newSubserviceData.price}
                  onChange={(e) => setNewSubserviceData({...newSubserviceData, price: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="new-subservice-unit" className="mb-2 block">Unit</Label>
              <select
                id="new-subservice-unit"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newSubserviceData.unit}
                onChange={(e) => setNewSubserviceData({...newSubserviceData, unit: e.target.value})}
              >
                <option value="per Kg">per Kg</option>
                <option value="per piece">per piece</option>
                <option value="per square meter">per square meter</option>
                <option value="per square foot">per square foot</option>
                <option value="per pair">per pair</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setAddSubserviceDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNewSubservice}>
              <Save className="mr-1 h-4 w-4" />
              Add Sub-service
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;
