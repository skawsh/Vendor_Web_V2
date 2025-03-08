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

  return
