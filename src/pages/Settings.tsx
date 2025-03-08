
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

  const [editSubserviceDialogOpen, setEditSubserviceDialogOpen] = useState(false);
  const [editingSubservice, setEditingSubservice] = useState<SubService | null>(null);
  const [editingServiceId, setEditingServiceId] = useState<number | null>(null);
  const [editedSubserviceName, setEditedSubserviceName] = useState('');
  const [editedSubservicePrice, setEditedSubservicePrice] = useState('');
  const [editedSubserviceUnit, setEditedSubserviceUnit] = useState('');

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

    const formattedItem: SubServiceItem = {
      id: newItem.id,
      name: newItem.name,
      quickWashPrice: newItem.quickWashPrice ? `₹${newItem.quickWashPrice}` : '₹0',
      standardWashPrice: newItem.standardWashPrice ? `₹${newItem.standardWashPrice}` : '₹0',
      unit: newItem.unit
    };

    const updatedServices = services.map(service => {
      if (service.id === serviceWithSubservice.id) {
        return {
          ...service,
          subservices: service.subservices.map(subservice => {
            if (subservice.id === selectedSubserviceId) {
              return {
                ...subservice,
                items: [...(subservice.items || []), formattedItem]
              };
            }
            return subservice;
          })
        };
      }
      return service;
    });

    setServices(updatedServices);
    setNextItemId(prevId => prevId + 1);
    setAddItemDialogOpen(false);
    
    setExpandedSubservices(prev => ({
      ...prev,
      [selectedSubserviceId]: true
    }));

    toast.success(`Item "${newItem.name}" added successfully`);
  };

  const handleOpenEditSubserviceDialog = (serviceId: number, subservice: SubService, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingServiceId(serviceId);
    setEditingSubservice(subservice);
    setEditedSubserviceName(subservice.name);
    setEditedSubservicePrice(subservice.price.replace('₹', ''));
    setEditedSubserviceUnit(subservice.unit);
    setEditSubserviceDialogOpen(true);
  };

  const handleSaveEditedSubservice = () => {
    if (!editedSubserviceName.trim()) {
      toast.error("Subservice name is required");
      return;
    }

    if (!editingServiceId || !editingSubservice) return;

    const updatedServices = services.map(service => {
      if (service.id === editingServiceId) {
        return {
          ...service,
          subservices: service.subservices.map(subservice => {
            if (subservice.id === editingSubservice.id) {
              return {
                ...subservice,
                name: editedSubserviceName,
                price: `₹${editedSubservicePrice}`,
                unit: editedSubserviceUnit
              };
            }
            return subservice;
          })
        };
      }
      return service;
    });

    setServices(updatedServices);
    setEditSubserviceDialogOpen(false);
    setEditingSubservice(null);
    setEditingServiceId(null);

    toast.success(`Subservice "${editedSubserviceName}" updated successfully`);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <SettingsIcon className="h-6 w-6" />
          Services & Pricing
        </h1>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              type="search"
              placeholder="Search services..."
              className="pl-8 min-w-[240px]"
              value={searchServiceQuery}
              onChange={(e) => setSearchServiceQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => setAddServiceDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader className="py-3">
          <CardTitle className="flex items-center justify-between">
            <span className="text-lg">Services ({services.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pt-0">
          {services.filter(service => 
            service.name.toLowerCase().includes(searchServiceQuery.toLowerCase())
          ).map(service => (
            <Collapsible
              key={service.id}
              open={expandedServices[service.id]}
              className="border-b"
            >
              <CollapsibleTrigger asChild>
                <div 
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleServiceExpand(service.id)}
                >
                  <div className="flex items-center gap-3">
                    {service.icon}
                    <span className="font-medium">{service.name}</span>
                    <span className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-0.5">
                      {service.subserviceCount} sub-services
                    </span>
                    {!serviceStatus[service.id] && (
                      <span className="text-xs bg-red-100 text-red-800 rounded-full px-2 py-0.5">
                        Disabled
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={serviceStatus[service.id]} 
                      onCheckedChange={() => {}} 
                      onClick={(e) => toggleServiceStatus(service.id, e)}
                    />
                    {expandedServices[service.id] ? (
                      <ChevronUp className="h-4 w-4 text-slate-500" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-slate-500" />
                    )}
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-4 pb-2">
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Sub-service Name</TableHead>
                          <TableHead>Base Price</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Items</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {service.subservices.map(subservice => (
                          <TableRow key={subservice.id}>
                            <TableCell className="font-medium">
                              {subservice.name}
                            </TableCell>
                            <TableCell>
                              {subservice.price} {subservice.unit}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Switch 
                                  checked={subserviceStatus[subservice.id] || false} 
                                  onCheckedChange={() => {}} 
                                  onClick={(e) => toggleSubserviceStatus(subservice.id, e)}
                                />
                                <span className={`text-xs ${subserviceStatus[subservice.id] ? 'text-green-600' : 'text-red-600'}`}>
                                  {subserviceStatus[subservice.id] ? 'Active' : 'Disabled'}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="ml-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleSubserviceExpand(subservice.id);
                                }}
                              >
                                {(subservice.items?.length || 0)} items
                                {expandedSubservices[subservice.id] ? (
                                  <ChevronUp className="h-4 w-4 ml-1" />
                                ) : (
                                  <ChevronDown className="h-4 w-4 ml-1" />
                                )}
                              </Button>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={(e) => handleOpenEditSubserviceDialog(service.id, subservice, e)}
                                >
                                  <Pencil className="h-3.5 w-3.5 mr-1" />
                                  Edit
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleOpenAddItemDialog(subservice.id)}
                                >
                                  <Plus className="h-3.5 w-3.5 mr-1" />
                                  Add Item
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  {/* Items Detail Expanded View */}
                  {service.subservices.map(subservice => (
                    expandedSubservices[subservice.id] && (
                      <div key={`items-${subservice.id}`} className="mt-4 border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium">{subservice.name} Items</h3>
                        </div>
                        
                        {subservice.items && subservice.items.length > 0 ? (
                          <div className="border rounded-lg overflow-hidden">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Item Name</TableHead>
                                  <TableHead>Quick Wash</TableHead>
                                  <TableHead>Standard Wash</TableHead>
                                  <TableHead>Unit</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {subservice.items.map(item => (
                                  <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.quickWashPrice}</TableCell>
                                    <TableCell>{item.standardWashPrice}</TableCell>
                                    <TableCell>{item.unit}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        ) : (
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-slate-500">No items added to this subservice</p>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="mt-2"
                              onClick={() => handleOpenAddItemDialog(subservice.id)}
                            >
                              <Plus className="h-3.5 w-3.5 mr-1" />
                              Add Item
                            </Button>
                          </div>
                        )}
                      </div>
                    )
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </CardContent>
      </Card>

      {/* Add Service Dialog */}
      <Dialog open={addServiceDialogOpen} onOpenChange={setAddServiceDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
            <DialogDescription>
              Add a new service with sub-services and items
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="serviceName">Service Name</Label>
              <Input
                id="serviceName"
                placeholder="e.g. Premium Laundry"
                value={newServiceName}
                onChange={(e) => setNewServiceName(e.target.value)}
              />
            </div>
            
            <div className="pt-4">
              <h3 className="font-medium mb-4">Sub-services</h3>
              
              {subServices.map((subService, index) => (
                <div key={subService.id} className="border rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Sub-service #{index + 1}</h4>
                    {subServices.length > 1 && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRemoveSubService(subService.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-1" />
                        Remove
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid gap-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`subServiceName-${subService.id}`}>Name</Label>
                        <Input
                          id={`subServiceName-${subService.id}`}
                          placeholder="e.g. Wash & Fold"
                          value={subService.name}
                          onChange={(e) => handleSubServiceNameChange(subService.id, e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`basePrice-${subService.id}`}>Base Price</Label>
                        <Input
                          id={`basePrice-${subService.id}`}
                          type="number"
                          placeholder="0"
                          value={subService.basePrice}
                          onChange={(e) => handleSubServiceBasePriceChange(subService.id, e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`priceUnit-${subService.id}`}>Price Unit</Label>
                        <select
                          id={`priceUnit-${subService.id}`}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={subService.priceUnit}
                          onChange={(e) => handleSubServicePriceUnitChange(subService.id, e.target.value)}
                        >
                          <option value="per piece">per piece</option>
                          <option value="per Kg">per Kg</option>
                          <option value="per pound">per pound</option>
                          <option value="per pair">per pair</option>
                          <option value="per square meter">per square meter</option>
                          <option value="per square foot">per square foot</option>
                        </select>
                      </div>
                    </div>
                    
                    {/* Items Section */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-sm font-medium">Items</h5>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAddItemToSubservice(subService.id)}
                        >
                          <Plus className="h-3.5 w-3.5 mr-1" />
                          Add Item
                        </Button>
                      </div>
                      
                      <Collapsible 
                        open={expandedSubServiceItems[subService.id]}
                        className="border rounded-lg overflow-hidden"
                      >
                        <CollapsibleTrigger asChild>
                          <div 
                            className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 border-b"
                            onClick={() => toggleSubServiceItemsExpand(subService.id)}
                          >
                            <span className="text-sm">
                              {subService.items && subService.items.length > 0 
                                ? `${subService.items.length} Items` 
                                : "No Items Added"}
                            </span>
                            {expandedSubServiceItems[subService.id] ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </div>
                        </CollapsibleTrigger>
                        
                        <CollapsibleContent>
                          {subService.items && subService.items.length > 0 ? (
                            <div className="p-3">
                              {subService.items.map((item, itemIndex) => (
                                <div key={item.id} className="border rounded p-3 mb-3">
                                  <div className="flex items-center justify-between mb-2">
                                    <h6 className="text-sm font-medium">Item #{itemIndex + 1}</h6>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleRemoveItemFromSubservice(subService.id, item.id)}
                                    >
                                      <Trash2 className="h-3.5 w-3.5 text-red-500" />
                                    </Button>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 gap-2 mb-2">
                                    <div className="space-y-1">
                                      <Label htmlFor={`itemName-${item.id}`} className="text-xs">Name</Label>
                                      <Input
                                        id={`itemName-${item.id}`}
                                        placeholder="e.g. T-shirt"
                                        value={item.name}
                                        onChange={(e) => handleItemNameChange(subService.id, item.id, e.target.value)}
                                        className="h-8 text-sm"
                                      />
                                    </div>
                                  </div>
                                  
                                  <div className="grid grid-cols-3 gap-2 mb-2">
                                    <div className="space-y-1">
                                      <Label htmlFor={`quickWash-${item.id}`} className="text-xs">Quick Wash</Label>
                                      <Input
                                        id={`quickWash-${item.id}`}
                                        type="number"
                                        placeholder="0"
                                        value={item.quickWashPrice}
                                        onChange={(e) => handleItemQuickWashPriceChange(subService.id, item.id, e.target.value)}
                                        className="h-8 text-sm"
                                      />
                                    </div>
                                    
                                    <div className="space-y-1">
                                      <Label htmlFor={`standardWash-${item.id}`} className="text-xs">Standard Wash</Label>
                                      <Input
                                        id={`standardWash-${item.id}`}
                                        type="number"
                                        placeholder="0"
                                        value={item.standardWashPrice}
                                        onChange={(e) => handleItemStandardWashPriceChange(subService.id, item.id, e.target.value)}
                                        className="h-8 text-sm"
                                      />
                                    </div>
                                    
                                    <div className="space-y-1">
                                      <Label htmlFor={`unit-${item.id}`} className="text-xs">Unit</Label>
                                      <select
                                        id={`unit-${item.id}`}
                                        className="flex h-8 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={item.unit}
                                        onChange={(e) => handleItemUnitChange(subService.id, item.id, e.target.value)}
                                      >
                                        <option value="per piece">per piece</option>
                                        <option value="per Kg">per Kg</option>
                                        <option value="per pound">per pound</option>
                                        <option value="per pair">per pair</option>
                                        <option value="per sq meter">per sq meter</option>
                                        <option value="per sq foot">per sq foot</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="p-4 text-center">
                              <p className="text-slate-500 text-sm">No items added yet</p>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="mt-2"
                                onClick={() => handleAddItemToSubservice(subService.id)}
                              >
                                <Plus className="h-3.5 w-3.5 mr-1" />
                                Add First Item
                              </Button>
                            </div>
                          )}
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleAddSubService}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Sub-service
              </Button>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setAddServiceDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNewService}>
              <Save className="h-4 w-4 mr-2" />
              Save Service
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Add Item Dialog */}
      <Dialog open={addItemDialogOpen} onOpenChange={setAddItemDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
            <DialogDescription>
              Add a new item to the selected sub-service
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="itemName">Item Name</Label>
              <Input
                id="itemName"
                placeholder="e.g. T-shirt"
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quickWashPrice">Quick Wash Price</Label>
                <Input
                  id="quickWashPrice"
                  type="number"
                  placeholder="0"
                  value={newItem.quickWashPrice}
                  onChange={(e) => setNewItem({...newItem, quickWashPrice: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="standardWashPrice">Standard Wash Price</Label>
                <Input
                  id="standardWashPrice"
                  type="number"
                  placeholder="0"
                  value={newItem.standardWashPrice}
                  onChange={(e) => setNewItem({...newItem, standardWashPrice: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <select
                id="unit"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newItem.unit}
                onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
              >
                <option value="per piece">per piece</option>
                <option value="per Kg">per Kg</option>
                <option value="per pound">per pound</option>
                <option value="per pair">per pair</option>
                <option value="per sq meter">per sq meter</option>
                <option value="per sq foot">per sq foot</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setAddItemDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNewItem}>
              <Save className="h-4 w-4 mr-2" />
              Save Item
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Edit Subservice Dialog */}
      <Dialog open={editSubserviceDialogOpen} onOpenChange={setEditSubserviceDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Sub-service</DialogTitle>
            <DialogDescription>
              Update the details of this sub-service
            </DialogDescription>
          </DialogHeader>
          
          {editingSubservice && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="editSubserviceName">Name</Label>
                <Input
                  id="editSubserviceName"
                  value={editedSubserviceName}
                  onChange={(e) => setEditedSubserviceName(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editSubservicePrice">Base Price</Label>
                  <Input
                    id="editSubservicePrice"
                    type="number"
                    value={editedSubservicePrice}
                    onChange={(e) => setEditedSubservicePrice(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="editSubserviceUnit">Unit</Label>
                  <select
                    id="editSubserviceUnit"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={editedSubserviceUnit}
                    onChange={(e) => setEditedSubserviceUnit(e.target.value)}
                  >
                    <option value="per piece">per piece</option>
                    <option value="per Kg">per Kg</option>
                    <option value="per pound">per pound</option>
                    <option value="per pair">per pair</option>
                    <option value="per square meter">per square meter</option>
                    <option value="per square foot">per square foot</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setEditSubserviceDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEditedSubservice}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;
