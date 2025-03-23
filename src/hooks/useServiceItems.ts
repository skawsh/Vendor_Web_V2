
import { useState } from 'react';

export const useServiceItems = () => {
  const [currentSubserviceIndex, setCurrentSubserviceIndex] = useState<string>('0');
  const [newServiceItem, setNewServiceItem] = useState({
    name: '',
    standardPrice: '',
    expressPrice: '',
  });

  const handleNewServiceItemChange = (field: string, value: string) => {
    setNewServiceItem(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return {
    currentSubserviceIndex,
    setCurrentSubserviceIndex,
    newServiceItem,
    setNewServiceItem,
    handleNewServiceItemChange
  };
};
