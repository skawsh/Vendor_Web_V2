
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { NewSubservice, EditSubservice, NewItem, EditItem } from '@/types/services';

export const useServiceDialogs = () => {
  const [isAddServiceDialogOpen, setIsAddServiceDialogOpen] = useState(false);
  const [isAddSubserviceDialogOpen, setIsAddSubserviceDialogOpen] = useState(false);
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const [isEditSubserviceDialogOpen, setIsEditSubserviceDialogOpen] = useState(false);
  const [isEditItemDialogOpen, setIsEditItemDialogOpen] = useState(false);
  const [isAddServiceItemDialogOpen, setIsAddServiceItemDialogOpen] = useState(false);
  const [currentSubserviceIndex, setCurrentSubserviceIndex] = useState<string>('0');
  const [isEditingService, setIsEditingService] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);

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
  
  const [newService, setNewService] = useState(defaultNewService);
  // Store multiple services being created
  const [pendingServices, setPendingServices] = useState<typeof defaultNewService[]>([]);
  
  // Reset the newService state when dialog opens or closes
  useEffect(() => {
    if (!isAddServiceDialogOpen) {
      setNewService(defaultNewService);
      setPendingServices([]);
      setIsEditingService(false);
      setEditingServiceId(null);
    }
  }, [isAddServiceDialogOpen]);
  
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
  
  const [newItem, setNewItem] = useState<NewItem>({
    name: '',
    price: '',
    standardPrice: '',
    expressPrice: '',
    parentServiceId: '',
    parentSubserviceId: ''
  });
  
  const [editItem, setEditItem] = useState<EditItem>({
    id: '',
    name: '',
    price: '',
    standardPrice: '',
    expressPrice: '',
    parentServiceId: '',
    parentSubserviceId: ''
  });

  const [newServiceItem, setNewServiceItem] = useState({
    name: '',
    standardPrice: '',
    expressPrice: '',
  });

  // Added state to manage expanded subservices in the service dialog
  const [expandedSubServices, setExpandedSubServices] = useState<Record<string, boolean>>({});
  const [isServiceExpanded, setIsServiceExpanded] = useState(true);

  // Function to handle service expand/collapse
  const handleServiceCollapse = (open: boolean) => {
    setIsServiceExpanded(open);
    // When collapsing the service, collapse all subservices as well
    if (!open) {
      setExpandedSubServices({});
    }
  };

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

  // Helper function to safely parse JSON with a fallback value
  const tryParseJSON = (jsonString: string, fallback: any = null) => {
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      console.error('Error parsing JSON:', e);
      return fallback;
    }
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

  const addItemToSubService = (subServiceId: string) => {
    setCurrentSubserviceIndex(subServiceId);
    setNewServiceItem({
      name: '',
      standardPrice: '',
      expressPrice: '',
    });
    setIsAddServiceItemDialogOpen(true);
  };

  const saveNewServiceItem = () => {
    if (!newServiceItem.name) {
      toast.error("Item name is required");
      return;
    }

    setNewService(prev => ({
      ...prev,
      subServices: prev.subServices.map(ss => 
        ss.id === currentSubserviceIndex ? {
          ...ss,
          items: [...(Array.isArray(ss.items) ? ss.items : []), {
            id: `temp-${Date.now()}`,
            name: newServiceItem.name,
            standardPrice: newServiceItem.standardPrice || '0',
            expressPrice: newServiceItem.expressPrice || '0',
            price: newServiceItem.standardPrice || '0',
            active: true
          }]
        } : ss
      )
    }));
    
    setIsAddServiceItemDialogOpen(false);
    setNewServiceItem({
      name: '',
      standardPrice: '',
      expressPrice: '',
    });
  };

  const handleNewServiceItemChange = (field: string, value: string) => {
    setNewServiceItem(prev => ({
      ...prev,
      [field]: value
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

  return {
    dialogStates: {
      isAddServiceDialogOpen,
      setIsAddServiceDialogOpen,
      isAddSubserviceDialogOpen,
      setIsAddSubserviceDialogOpen,
      isAddItemDialogOpen,
      setIsAddItemDialogOpen,
      isEditSubserviceDialogOpen,
      setIsEditSubserviceDialogOpen,
      isEditItemDialogOpen,
      setIsEditItemDialogOpen,
      isAddServiceItemDialogOpen,
      setIsAddServiceItemDialogOpen
    },
    formStates: {
      newService,
      newSubservice,
      editSubservice,
      newItem,
      editItem,
      newServiceItem,
      currentSubserviceIndex,
      pendingServices,
      expandedSubServices,
      isServiceExpanded,
      isEditingService,
      editingServiceId
    },
    setters: {
      setNewSubservice,
      setEditSubservice,
      setNewItem,
      setEditItem,
      setNewServiceItem,
      setPendingServices,
      setExpandedSubServices,
      setIsEditingService,
      setEditingServiceId
    },
    handlers: {
      handleNewServiceChange,
      handleSubServiceChange,
      addSubServiceToForm,
      removeSubServiceFromForm,
      addItemToSubService,
      saveNewServiceItem,
      handleNewServiceItemChange,
      resetServiceForm,
      addAllPendingServices,
      handleServiceCollapse,
      startEditingService
    }
  };
};
