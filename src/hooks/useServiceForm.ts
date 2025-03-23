import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { tryParseJSON } from '@/utils/jsonHelpers';

// Default service template
const defaultNewService = {
  name: '',
  description: '',
  price: '',
  expressPrice: '',
  unit: 'kg',
  subServices: [{
    name: '',
    price: '',
    id: '0',
    pricePerKg: '',
    expressPricePerKg: '',
    pricePerItem: '',
    expressPricePerItem: '',
    items: []
  }]
};

export const useServiceForm = (isAddServiceDialogOpen: boolean) => {
  const [newService, setNewService] = useState(defaultNewService);
  const [pendingServices, setPendingServices] = useState<typeof defaultNewService[]>([]);
  const [isEditingService, setIsEditingService] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [expandedSubServices, setExpandedSubServices] = useState<Record<string, boolean>>({});
  const [isServiceExpanded, setIsServiceExpanded] = useState(true);
  
  // Reset the newService state when dialog opens or closes
  useEffect(() => {
    if (!isAddServiceDialogOpen) {
      setNewService(defaultNewService);
      setPendingServices([]);
      setIsEditingService(false);
      setEditingServiceId(null);
    }
  }, [isAddServiceDialogOpen]);
  
  const handleNewServiceChange = (field: string, value: string) => {
    setNewService(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubServiceChange = (id: string, field: string, value: string) => {
    setNewService(prev => ({
      ...prev,
      subServices: prev.subServices.map(ss => ss.id === id ? {
        ...ss,
        [field]: field === 'items' ? tryParseJSON(value, []) : value
      } : ss)
    }));
  };

  const addSubServiceToForm = () => {
    setNewService(prev => ({
      ...prev,
      subServices: [...prev.subServices, {
        name: '',
        price: '',
        id: String(prev.subServices.length),
        pricePerKg: '',
        expressPricePerKg: '',
        pricePerItem: '',
        expressPricePerItem: '',
        items: []
      }]
    }));
  };

  const removeSubServiceFromForm = (id: string) => {
    if (newService.subServices.length <= 1) {
      toast.error("You need at least one sub-service");
      return;
    }
    setNewService(prev => ({
      ...prev,
      subServices: prev.subServices.filter(ss => ss.id !== id)
    }));
  };

  // Function to reset the form and keep the dialog open
  const resetServiceForm = () => {
    // Save the current service to pendingServices if it has a name
    if (newService.name && newService.subServices.some(ss => ss.name.trim())) {
      setPendingServices(prev => [...prev, newService]);
    }
    
    // Reset for new service
    setNewService(defaultNewService);
    setIsEditingService(false);
    setEditingServiceId(null);
    toast.success("Form reset for new service entry");
  };

  // Function to add all pending services at once
  const addAllPendingServices = (addNewServiceFn: (service: any) => boolean) => {
    let allSuccessful = true;
    
    // Add all pending services
    pendingServices.forEach(service => {
      const success = addNewServiceFn(service);
      if (!success) {
        allSuccessful = false;
      }
    });
    
    // Add current service if it has data
    if (newService.name && newService.subServices.some(ss => ss.name.trim())) {
      const success = addNewServiceFn(newService);
      if (!success) {
        allSuccessful = false;
      }
    }
    
    return allSuccessful;
  };

  // Function to set editing mode and service
  const startEditingService = (service: any) => {
    setIsEditingService(true);
    setEditingServiceId(service.id);
    
    // Populate form with service data
    setNewService({
      ...defaultNewService,
      name: service.name,
      subServices: service.subServices.map((ss: any) => ({
        ...ss,
        items: Array.isArray(ss.items) ? ss.items : []
      }))
    });
  };

  // Function to handle service expand/collapse
  const handleServiceCollapse = (open: boolean) => {
    setIsServiceExpanded(open);
    // When collapsing the service, collapse all subservices as well
    if (!open) {
      setExpandedSubServices({});
    }
  };

  return {
    newService,
    setNewService,
    pendingServices,
    setPendingServices,
    isEditingService,
    setIsEditingService,
    editingServiceId,
    setEditingServiceId,
    expandedSubServices,
    setExpandedSubServices,
    isServiceExpanded,
    defaultNewService,
    handleNewServiceChange,
    handleSubServiceChange,
    addSubServiceToForm,
    removeSubServiceFromForm,
    resetServiceForm,
    addAllPendingServices,
    startEditingService,
    handleServiceCollapse
  };
};
