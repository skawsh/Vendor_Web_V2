
import React, { useState } from 'react';
import { AddSubserviceDialog } from './AddSubserviceDialog';
import { EditSubserviceDialog } from './EditSubserviceDialog';
import { AddItemToSubserviceDialog } from './AddItemToSubserviceDialog';

interface SubserviceDialogsProps {
  isAddSubserviceDialogOpen: boolean;
  setIsAddSubserviceDialogOpen: (isOpen: boolean) => void;
  newSubservice: {
    name: string;
    parentServiceId: string;
    price?: string;
    pricePerKg?: string;
    pricePerItem?: string;
    expressPricePerKg?: string;
    expressPricePerItem?: string;
  };
  handleNewSubserviceChange: (field: string, value: string) => void;
  addNewSubservice: () => void;
  isEditSubserviceDialogOpen: boolean;
  setIsEditSubserviceDialogOpen: (isOpen: boolean) => void;
  editSubservice: {
    id: string;
    name: string;
    parentServiceId: string;
    price?: string;
    pricePerKg?: string;
    pricePerItem?: string;
    expressPricePerKg?: string;
    expressPricePerItem?: string;
  };
  handleEditSubserviceChange: (field: string, value: string) => void;
  saveSubserviceChanges: () => void;
}

export const SubserviceDialogs: React.FC<SubserviceDialogsProps> = ({
  isAddSubserviceDialogOpen,
  setIsAddSubserviceDialogOpen,
  newSubservice,
  handleNewSubserviceChange,
  addNewSubservice,
  isEditSubserviceDialogOpen,
  setIsEditSubserviceDialogOpen,
  editSubservice,
  handleEditSubserviceChange,
  saveSubserviceChanges
}) => {
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    standardPrice: '',
    expressPrice: ''
  });

  const handleNewItemChange = (field: string, value: string) => {
    setNewItem(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddItem = () => {
    if (!newItem.name) {
      return;
    }
    setIsAddItemDialogOpen(false);
    setNewItem({
      name: '',
      standardPrice: '',
      expressPrice: ''
    });
  };

  return (
    <>
      <AddSubserviceDialog
        isOpen={isAddSubserviceDialogOpen}
        onOpenChange={setIsAddSubserviceDialogOpen}
        newSubservice={newSubservice}
        handleNewSubserviceChange={handleNewSubserviceChange}
        addNewSubservice={addNewSubservice}
      />
      
      <EditSubserviceDialog
        isOpen={isEditSubserviceDialogOpen}
        onOpenChange={setIsEditSubserviceDialogOpen}
        editSubservice={editSubservice}
        handleEditSubserviceChange={handleEditSubserviceChange}
        saveSubserviceChanges={saveSubserviceChanges}
      />
      
      <AddItemToSubserviceDialog
        isOpen={isAddItemDialogOpen}
        onOpenChange={setIsAddItemDialogOpen}
        newItem={newItem}
        handleNewItemChange={handleNewItemChange}
        handleAddItem={handleAddItem}
      />
    </>
  );
};
