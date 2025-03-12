
import React from 'react';
import { Card } from '@/components/ui/card';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { Service } from '@/types/services';
import { ServiceHeader } from './ServiceHeader';
import { ServiceEditForm } from './ServiceEditForm';
import { SubservicesSection } from './SubservicesSection';

interface ServiceCardProps {
  service: Service;
  toggleService: (serviceId: string) => void;
  toggleEditService: (serviceId: string) => void;
  handleServiceChange: (serviceId: string, field: string, value: any) => void;
  saveServiceChanges: (serviceId: string) => void;
  openAddSubserviceDialog: (serviceId: string) => void;
  openEditSubserviceDialog: (serviceId: string, subservice: any) => void;
  deleteSubservice: (serviceId: string, subserviceId: string) => void;
  toggleSubservice: (serviceId: string, subserviceId: string) => void;
  openAddItemDialog: (serviceId: string, subserviceId: string) => void;
  openEditItemDialog: (serviceId: string, subserviceId: string, item: any) => void;
  deleteItem: (serviceId: string, subserviceId: string, itemId: string) => void;
  deleteService: (serviceId: string) => void;
  toggleServiceActive: (serviceId: string) => void;
  toggleSubserviceActive: (serviceId: string, subserviceId: string) => void;
  toggleItemActive: (serviceId: string, subserviceId: string, itemId: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  toggleService,
  toggleEditService,
  handleServiceChange,
  saveServiceChanges,
  openAddSubserviceDialog,
  openEditSubserviceDialog,
  deleteSubservice,
  toggleSubservice,
  openAddItemDialog,
  openEditItemDialog,
  deleteItem,
  deleteService,
  toggleServiceActive,
  toggleSubserviceActive,
  toggleItemActive
}) => {
  // Handler to collapse all subservices when toggling service
  const handleToggleService = (serviceId: string) => {
    // When collapsing, ensure all subservices collapse too
    if (service.isOpen) {
      // Collapse all subservices first
      service.subServices.forEach(subservice => {
        if (subservice.isOpen) {
          toggleSubservice(serviceId, subservice.id);
        }
      });
    }
    
    // Then toggle the service itself
    toggleService(serviceId);
  };

  return (
    <Card key={service.id} className="border">
      <ServiceHeader 
        service={service}
        toggleService={handleToggleService}
        toggleEditService={toggleEditService}
        deleteService={deleteService}
        toggleServiceActive={toggleServiceActive}
      />
      
      <Collapsible open={service.isOpen}>
        <CollapsibleContent>
          <div className="p-4 border-t">
            {service.isEditing ? (
              <ServiceEditForm 
                service={service}
                handleServiceChange={handleServiceChange}
                toggleEditService={toggleEditService}
                saveServiceChanges={saveServiceChanges}
              />
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div></div>
                </div>
                
                <SubservicesSection 
                  service={service}
                  openAddSubserviceDialog={openAddSubserviceDialog}
                  toggleSubservice={toggleSubservice}
                  openEditSubserviceDialog={openEditSubserviceDialog}
                  deleteSubservice={deleteSubservice}
                  openAddItemDialog={openAddItemDialog}
                  openEditItemDialog={openEditItemDialog}
                  deleteItem={deleteItem}
                  toggleSubserviceActive={toggleSubserviceActive}
                  toggleItemActive={toggleItemActive}
                />
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
