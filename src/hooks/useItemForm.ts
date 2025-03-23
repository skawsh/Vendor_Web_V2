
import { useState } from 'react';
import { NewItem, EditItem } from '@/types/services';

export const useItemForm = () => {
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

  return {
    newItem,
    setNewItem,
    editItem,
    setEditItem
  };
};
