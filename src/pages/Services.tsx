import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ServiceCard } from '@/components/settings/ServiceCard';
import { AddServiceDialog } from '@/components/settings/dialogs/AddServiceDialog';
import { SubserviceDialogs } from '@/components/settings/dialogs/SubserviceDialogs';
import { ItemDialogs } from '@/components/settings/dialogs/ItemDialogs';
import { useServices } from '@/hooks/useServices';
import { useServiceDialogs } from '@/hooks/useServiceDialogs';

const Services = () => {
  const {
    services,
    toggleService,
    toggleSubservice,
    toggleEditService,
    handleServiceChange,
    saveServiceChanges,
    deleteService,
    addNewService,
    deleteSubservice,
    addNewSubservice,
    saveSubserviceChanges,
    addNewItem,
    saveItemChanges,
    deleteItem,
    toggleServiceActive,
    toggleSubserviceActive,
    toggleItemActive
  } = useServices();

  const {
    dialogStates,
    formStates,
    setters,
    handlers
  } = useServiceDialogs();

  const openAddServiceDialog = () => {
    dialogStates.setIsAddServiceDialogOpen(true);
  };

  const openAddSubserviceDialog = (serviceId: string) => {
    setters.setNewSubservice({
      name: '',
      parentServiceId: serviceId,
      price: ''
    });
    dialogStates.setIsAddSubserviceDialogOpen(true);
  };

  const openEditSubserviceDialog = (serviceId: string, subservice: any) => {
    setters.setEditSubservice({
      id: subservice.id,
      name: subservice.name,
      parentServiceId: serviceId,
      price: subservice.price?.toString() || ''
    });
    dialogStates.setIsEditSubserviceDialogOpen(true);
  };

  const openAddItemDialog = (serviceId: string, subserviceId: string) => {
    setters.setNewItem({
      name: '',
      price: '',
      standardPrice: '',
      expressPrice: '',
      parentServiceId: serviceId,
      parentSubserviceId: subserviceId
    });
    dialogStates.setIsAddItemDialogOpen(true);
  };

  const openEditItemDialog = (serviceId: string, subserviceId: string, item: any) => {
    setters.setEditItem({
      id: item.id,
      name: item.name,
      price: item.price,
      standardPrice: item.standardPrice || item.price,
      expressPrice: item.expressPrice || item.price * 1.5,
      parentServiceId: serviceId,
      parentSubserviceId: subserviceId
    });
    dialogStates.setIsEditItemDialogOpen(true);
  };

  const handleAddNewService = () => {
    if (addNewService(formStates.newService)) {
      dialogStates.setIsAddServiceDialogOpen(false);
    }
  };

  const handleAddNewSubservice = () => {
    if (addNewSubservice(formStates.newSubservice)) {
      dialogStates.setIsAddSubserviceDialogOpen(false);
    }
  };

  const handleSaveSubserviceChanges = () => {
    if (saveSubserviceChanges(formStates.editSubservice)) {
      dialogStates.setIsEditSubserviceDialogOpen(false);
    }
  };

  const handleAddNewItem = () => {
    if (addNewItem(formStates.newItem)) {
      dialogStates.setIsAddItemDialogOpen(false);
    }
  };

  const handleSaveItemChanges = () => {
    if (saveItemChanges(formStates.editItem)) {
      dialogStates.setIsEditItemDialogOpen(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Services</h1>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Service Management</CardTitle>
            <CardDescription>
              Manage your services, subservices, and item details
            </CardDescription>
          </div>
          <Button onClick={openAddServiceDialog} className="flex items-center gap-1">
            <Plus className="h-4 w-4" /> Add Service
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {services.map(service => (
              <ServiceCard
                key={service.id}
                service={service}
                toggleService={toggleService}
                toggleEditService={toggleEditService}
                handleServiceChange={handleServiceChange}
                saveServiceChanges={saveServiceChanges}
                openAddSubserviceDialog={openAddSubserviceDialog}
                openEditSubserviceDialog={openEditSubserviceDialog}
                deleteSubservice={deleteSubservice}
                toggleSubservice={toggleSubservice}
                openAddItemDialog={openAddItemDialog}
                openEditItemDialog={openEditItemDialog}
                deleteItem={deleteItem}
                deleteService={deleteService}
                toggleServiceActive={toggleServiceActive}
                toggleSubserviceActive={toggleSubserviceActive}
                toggleItemActive={toggleItemActive}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <AddServiceDialog
        isOpen={dialogStates.isAddServiceDialogOpen}
        onOpenChange={dialogStates.setIsAddServiceDialogOpen}
        newService={formStates.newService}
        handleNewServiceChange={handlers.handleNewServiceChange}
        handleSubServiceChange={handlers.handleSubServiceChange}
        addSubServiceToForm={handlers.addSubServiceToForm}
        removeSubServiceFromForm={handlers.removeSubServiceFromForm}
        addNewService={handleAddNewService}
      />
      
      <SubserviceDialogs
        isAddSubserviceDialogOpen={dialogStates.isAddSubserviceDialogOpen}
        setIsAddSubserviceDialogOpen={dialogStates.setIsAddSubserviceDialogOpen}
        newSubservice={formStates.newSubservice}
        handleNewSubserviceChange={(field, value) => setters.setNewSubservice(prev => ({ ...prev, [field]: value }))}
        addNewSubservice={handleAddNewSubservice}
        isEditSubserviceDialogOpen={dialogStates.isEditSubserviceDialogOpen}
        setIsEditSubserviceDialogOpen={dialogStates.setIsEditSubserviceDialogOpen}
        editSubservice={formStates.editSubservice}
        handleEditSubserviceChange={(field, value) => setters.setEditSubservice(prev => ({ ...prev, [field]: value }))}
        saveSubserviceChanges={handleSaveSubserviceChanges}
      />
      
      <ItemDialogs
        isAddItemDialogOpen={dialogStates.isAddItemDialogOpen}
        setIsAddItemDialogOpen={dialogStates.setIsAddItemDialogOpen}
        newItem={formStates.newItem}
        handleNewItemChange={(field, value) => setters.setNewItem(prev => ({ ...prev, [field]: value }))}
        addNewItem={handleAddNewItem}
        isEditItemDialogOpen={dialogStates.isEditItemDialogOpen}
        setIsEditItemDialogOpen={dialogStates.setIsEditItemDialogOpen}
        editItem={formStates.editItem}
        handleEditItemChange={(field, value) => setters.setEditItem(prev => ({ ...prev, [field]: value }))}
        saveItemChanges={handleSaveItemChanges}
      />
    </div>
  );
};

export default Services;
