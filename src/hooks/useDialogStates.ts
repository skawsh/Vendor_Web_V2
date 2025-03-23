
import { useState, useEffect } from 'react';

export const useDialogStates = () => {
  const [isAddServiceDialogOpen, setIsAddServiceDialogOpen] = useState(false);
  const [isAddSubserviceDialogOpen, setIsAddSubserviceDialogOpen] = useState(false);
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const [isEditSubserviceDialogOpen, setIsEditSubserviceDialogOpen] = useState(false);
  const [isEditItemDialogOpen, setIsEditItemDialogOpen] = useState(false);
  const [isAddServiceItemDialogOpen, setIsAddServiceItemDialogOpen] = useState(false);
  
  return {
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
  };
};
