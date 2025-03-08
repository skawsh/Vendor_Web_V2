<lov-code>
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
