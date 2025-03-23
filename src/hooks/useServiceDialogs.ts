
import { useDialogStates } from '@/hooks/useDialogStates';
import { useServiceForm } from '@/hooks/useServiceForm';
import { useServiceItems } from '@/hooks/useServiceItems';
import { useSubserviceForm } from '@/hooks/useSubserviceForm';
import { useItemForm } from '@/hooks/useItemForm';
import { toast } from 'sonner';

export const useServiceDialogs = () => {
  // Compose smaller hooks
  const dialogStates = useDialogStates();
  const serviceForm = useServiceForm(dialogStates.isAddServiceDialogOpen);
  const serviceItems = useServiceItems();
  const subserviceForm = useSubserviceForm();
  const itemForm = useItemForm();

  // Handle adding an item to a subservice
  const addItemToSubService = (subServiceId: string) => {
    serviceItems.setCurrentSubserviceIndex(subServiceId);
    serviceItems.setNewServiceItem({
      name: '',
      standardPrice: '',
      expressPrice: '',
    });
    dialogStates.setIsAddServiceItemDialogOpen(true);
  };

  // Handle saving a new service item
  const saveNewServiceItem = () => {
    if (!serviceItems.newServiceItem.name) {
      toast.error("Item name is required");
      return;
    }

    serviceForm.setNewService(prev => ({
      ...prev,
      subServices: prev.subServices.map(ss => 
        ss.id === serviceItems.currentSubserviceIndex ? {
          ...ss,
          items: [...(Array.isArray(ss.items) ? ss.items : []), {
            id: `temp-${Date.now()}`,
            name: serviceItems.newServiceItem.name,
            standardPrice: serviceItems.newServiceItem.standardPrice || '0',
            expressPrice: serviceItems.newServiceItem.expressPrice || '0',
            price: serviceItems.newServiceItem.standardPrice || '0',
            active: true
          }]
        } : ss
      )
    }));
    
    dialogStates.setIsAddServiceItemDialogOpen(false);
    serviceItems.setNewServiceItem({
      name: '',
      standardPrice: '',
      expressPrice: '',
    });
  };

  return {
    dialogStates,
    formStates: {
      ...serviceForm,
      ...subserviceForm,
      ...itemForm,
      ...serviceItems,
      newService: serviceForm.newService,
      pendingServices: serviceForm.pendingServices,
      expandedSubServices: serviceForm.expandedSubServices,
      isServiceExpanded: serviceForm.isServiceExpanded,
      isEditingService: serviceForm.isEditingService,
      editingServiceId: serviceForm.editingServiceId
    },
    setters: {
      setNewSubservice: subserviceForm.setNewSubservice,
      setEditSubservice: subserviceForm.setEditSubservice,
      setNewItem: itemForm.setNewItem,
      setEditItem: itemForm.setEditItem,
      setNewServiceItem: serviceItems.setNewServiceItem,
      setPendingServices: serviceForm.setPendingServices,
      setExpandedSubServices: serviceForm.setExpandedSubServices,
      setIsEditingService: serviceForm.setIsEditingService,
      setEditingServiceId: serviceForm.setEditingServiceId
    },
    handlers: {
      handleNewServiceChange: serviceForm.handleNewServiceChange,
      handleSubServiceChange: serviceForm.handleSubServiceChange,
      addSubServiceToForm: serviceForm.addSubServiceToForm,
      removeSubServiceFromForm: serviceForm.removeSubServiceFromForm,
      addItemToSubService,
      saveNewServiceItem,
      handleNewServiceItemChange: serviceItems.handleNewServiceItemChange,
      resetServiceForm: serviceForm.resetServiceForm,
      addAllPendingServices: serviceForm.addAllPendingServices,
      handleServiceCollapse: serviceForm.handleServiceCollapse,
      startEditingService: serviceForm.startEditingService
    }
  };
};
