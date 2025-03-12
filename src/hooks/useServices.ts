import { useState } from 'react';
import { Service, NewSubservice, EditSubservice, NewItem, EditItem } from '@/types/services';
import { toast } from 'sonner';

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([{
    id: '1',
    name: 'Core Laundry Services',
    isOpen: false,
    description: 'Complete laundry care for everyday garments',
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
    name: 'Dry Cleaning',
    isOpen: false,
    description: 'Professional dry cleaning for delicate fabrics',
    price: 250,
    unit: 'piece',
    isEditing: false,
    subServices: [{
      id: '2-1',
      name: 'Basic Dry Clean',
      isOpen: false,
      items: [{
        id: '2-1-1',
        name: 'Sweater',
        price: 180,
        standardPrice: 180,
        expressPrice: 250
      }, {
        id: '2-1-2',
        name: 'Winter Jacket',
        price: 350,
        standardPrice: 350,
        expressPrice: 450
      }]
    }, {
      id: '2-2',
      name: 'Premium Dry Clean',
      isOpen: false,
      items: [{
        id: '2-2-1',
        name: 'Wedding Dress',
        price: 1200,
        standardPrice: 1200,
        expressPrice: 1500
      }, {
        id: '2-2-2',
        name: 'Formal Suit',
        price: 800,
        standardPrice: 800,
        expressPrice: 1000
      }]
    }]
  }, {
    id: '3',
    name: 'Specialized Laundry Services',
    isOpen: false,
    description: 'Specialized care for unique garments and fabrics',
    price: 150,
    unit: 'piece',
    isEditing: false,
    subServices: [{
      id: '3-1',
      name: 'Stain Removal',
      isOpen: false,
      items: [{
        id: '3-1-1',
        name: 'Light Stains',
        price: 100,
        standardPrice: 100,
        expressPrice: 150
      }, {
        id: '3-1-2',
        name: 'Heavy Stains',
        price: 200,
        standardPrice: 200,
        expressPrice: 300
      }]
    }]
  }, {
    id: '4',
    name: 'Shoe Cleaning',
    isOpen: false,
    description: 'Professional cleaning for all types of shoes',
    price: 99,
    unit: 'pair',
    isEditing: false,
    subServices: [{
      id: '4-1',
      name: 'Basic Shoe Clean',
      isOpen: false,
      items: [{
        id: '4-1-1',
        name: 'Leather Shoes',
        price: 99,
        standardPrice: 99,
        expressPrice: 149
      }, {
        id: '4-1-2',
        name: 'Canvas Shoes',
        price: 79,
        standardPrice: 79,
        expressPrice: 119
      }]
    }]
  }, {
    id: '5',
    name: 'Sneaker Cleaning',
    isOpen: false,
    description: 'Specialized cleaning for sneakers and athletic footwear',
    price: 129,
    unit: 'pair',
    isEditing: false,
    subServices: [{
      id: '5-1',
      name: 'Premium Sneaker Care',
      isOpen: false,
      items: [{
        id: '5-1-1',
        name: 'Basic Clean',
        price: 129,
        standardPrice: 129,
        expressPrice: 189
      }, {
        id: '5-1-2',
        name: 'Deep Clean',
        price: 179,
        standardPrice: 179,
        expressPrice: 259
      }]
    }]
  }]);

  const toggleService = (serviceId: string) => {
    setServices(prevServices => prevServices.map(service => 
      service.id === serviceId ? { ...service, isOpen: !service.isOpen } : service
    ));
  };

  const toggleSubservice = (serviceId: string, subserviceId: string) => {
    setServices(prevServices => prevServices.map(service => 
      service.id === serviceId ? {
        ...service,
        subServices: service.subServices.map(subservice => 
          subservice.id === subserviceId ? {
            ...subservice,
            isOpen: !subservice.isOpen
          } : subservice
        )
      } : service
    ));
  };

  const toggleEditService = (serviceId: string) => {
    setServices(prevServices => prevServices.map(service => 
      service.id === serviceId ? { ...service, isEditing: !service.isEditing } : service
    ));
  };

  const handleServiceChange = (serviceId: string, field: string, value: any) => {
    setServices(prevServices => prevServices.map(service => 
      service.id === serviceId ? { ...service, [field]: value } : service
    ));
  };

  const saveServiceChanges = (serviceId: string) => {
    toggleEditService(serviceId);
    toast.success('Service updated successfully');
  };

  const deleteService = (serviceId: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      setServices(prev => prev.filter(service => service.id !== serviceId));
      toast.success('Service deleted successfully');
    }
  };

  const addNewService = (newService: any) => {
    if (!newService.name) {
      toast.error('Please enter a service name');
      return false;
    }
    if (!newService.subServices.some((ss: any) => ss.name.trim())) {
      toast.error('Please enter at least one sub-service name');
      return false;
    }
    
    const newId = (services.length + 1).toString();
    setServices(prev => [...prev, {
      id: newId,
      name: newService.name,
      description: newService.description || 'New service',
      price: parseFloat(newService.price) || 0,
      expressPrice: parseFloat(newService.expressPrice) || 0,
      unit: newService.unit,
      isOpen: false,
      isEditing: false,
      subServices: newService.subServices
        .filter((ss: any) => ss.name.trim())
        .map((ss: any, index: number) => ({
          id: `${newId}-${index + 1}`,
          name: ss.name,
          price: parseFloat(ss.price) || undefined,
          isOpen: false,
          items: []
        }))
    }]);
    return true;
  };

  const deleteSubservice = (serviceId: string, subserviceId: string) => {
    if (confirm('Are you sure you want to delete this subservice?')) {
      setServices(prev => prev.map(service => service.id === serviceId ? {
        ...service,
        subServices: service.subServices.filter(subservice => subservice.id !== subserviceId)
      } : service));
      toast.success('Subservice deleted successfully');
    }
  };

  const addNewSubservice = (newSubservice: NewSubservice) => {
    if (!newSubservice.name) {
      toast.error('Please fill all required fields');
      return false;
    }
    setServices(prev => prev.map(service => service.id === newSubservice.parentServiceId ? {
      ...service,
      subServices: [...service.subServices, {
        id: `${service.id}-${service.subServices.length + 1}`,
        name: newSubservice.name,
        price: newSubservice.price ? parseFloat(newSubservice.price) : undefined,
        isOpen: false,
        items: []
      }]
    } : service));
    return true;
  };

  const saveSubserviceChanges = (editSubservice: EditSubservice) => {
    if (!editSubservice.name) {
      toast.error('Please fill all required fields');
      return false;
    }
    setServices(prev => prev.map(service => service.id === editSubservice.parentServiceId ? {
      ...service,
      subServices: service.subServices.map(subservice => subservice.id === editSubservice.id ? {
        ...subservice,
        name: editSubservice.name,
        price: editSubservice.price ? parseFloat(editSubservice.price) : undefined
      } : subservice)
    } : service));
    return true;
  };

  const addNewItem = (newItem: NewItem) => {
    if (!newItem.name || !newItem.price || !newItem.standardPrice || !newItem.expressPrice) {
      toast.error('Please fill all required fields');
      return false;
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
    return true;
  };

  const saveItemChanges = (editItem: EditItem) => {
    if (!editItem.name || !editItem.price || !editItem.standardPrice || !editItem.expressPrice) {
      toast.error('Please fill all required fields');
      return false;
    }
    setServices(prev => prev.map(service => service.id === editItem.parentServiceId ? {
      ...service,
      subServices: service.subServices.map(subservice => subservice.id === editItem.parentSubserviceId ? {
        ...subservice,
        items: subservice.items.map(item => item.id === editItem.id ? {
          ...item,
          name: editItem.name,
          price: parseFloat(editItem.price as string),
          standardPrice: parseFloat(editItem.standardPrice as string),
          expressPrice: parseFloat(editItem.expressPrice as string)
        } : item)
      } : subservice)
    } : service));
    return true;
  };

  const deleteItem = (serviceId: string, subserviceId: string, itemId: string) => {
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

  return {
    services,
    toggleService,
    toggleSubservice,
    toggleEditService,
    handleServiceChange,
    saveServiceChanges,
    deleteService,
    addNewService,
    deleteSubservice,
    addNewSubservice,
    saveSubserviceChanges,
    addNewItem,
    saveItemChanges,
    deleteItem
  };
};
