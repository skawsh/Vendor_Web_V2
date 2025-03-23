
import { useState } from 'react';
import { NewSubservice, EditSubservice } from '@/types/services';

export const useSubserviceForm = () => {
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

  return {
    newSubservice,
    setNewSubservice,
    editSubservice,
    setEditSubservice
  };
};
