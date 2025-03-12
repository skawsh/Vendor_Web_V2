import { useState } from 'react';
import { toast } from 'sonner';
import { NewSubservice, EditSubservice, NewItem, EditItem } from '@/types/services';

export const useServiceDialogs = () => {
  const [isAddServiceDialogOpen, setIsAddServiceDialogOpen] = useState(false);
  const [isAddSubserviceDialogOpen, setIsAddSubserviceDialogOpen] = useState(false);
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const [isEditSubserviceDialogOpen, setIsEditSubserviceDialogOpen] = useState(false);
  const [isEditItemDialogOpen, setIsEditItemDialogOpen] = useState(false);
  
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
    expressPrice: '',
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
        id: String(prev.subServices.length)
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
      setIsEditItemDialogOpen
    },
    formStates: {
      newService,
      newSubservice,
      editSubservice,
      newItem,
      editItem
    },
    setters: {
      setNewSubservice,
      setEditSubservice,
      setNewItem,
      setEditItem
    },
    handlers: {
      handleNewServiceChange,
      handleSubServiceChange,
      addSubServiceToForm,
      removeSubServiceFromForm
    }
  };
};
