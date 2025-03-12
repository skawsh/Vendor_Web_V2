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
  
  // Reset the newService state when dialog opens or closes
  useEffect(() => {
    if (!isAddServiceDialogOpen) {
      setNewService(defaultNewService);
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
        [field]: value
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

  // Updated to accept the id parameter
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
          items: [...(ss.items || []), {
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
    setNewService(defaultNewService);
    toast.success("Form reset for new service entry");
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
      currentSubserviceIndex
    },
    setters: {
      setNewSubservice,
      setEditSubservice,
      setNewItem,
      setEditItem,
      setNewServiceItem
    },
    handlers: {
      handleNewServiceChange,
      handleSubServiceChange,
      addSubServiceToForm,
      removeSubServiceFromForm,
      addItemToSubService,
      saveNewServiceItem,
      handleNewServiceItemChange,
      resetServiceForm
    }
  };
};
