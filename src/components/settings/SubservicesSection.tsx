
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { SubserviceCard } from './SubserviceCard';
import { Service, Subservice } from '@/types/services';

interface SubservicesSectionProps {
  service: Service;
  openAddSubserviceDialog: (serviceId: string) => void;
  toggleSubservice: (serviceId: string, subserviceId: string) => void;
  openEditSubserviceDialog: (serviceId: string, subservice: Subservice) => void;
  deleteSubservice: (serviceId: string, subserviceId: string) => void;
  openAddItemDialog: (serviceId: string, subserviceId: string) => void;
  openEditItemDialog: (serviceId: string, subserviceId: string, item: any) => void;
  deleteItem: (serviceId: string, subserviceId: string, itemId: string) => void;
  toggleSubserviceActive: (serviceId: string, subserviceId: string) => void;
  toggleItemActive: (serviceId: string, subserviceId: string, itemId: string) => void;
}

export const SubservicesSection: React.FC<SubservicesSectionProps> = ({
  service,
  openAddSubserviceDialog,
  toggleSubservice,
  openEditSubserviceDialog,
  deleteSubservice,
  openAddItemDialog,
  openEditItemDialog,
  deleteItem,
  toggleSubserviceActive,
  toggleItemActive
}) => {
  return (
    <div className="mt-4 mx-0 my-0 px-0 py-0">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium">Subservices</h4>
        <Button variant="outline" size="sm" onClick={() => openAddSubserviceDialog(service.id)}>
          <Plus className="h-4 w-4 mr-1" /> Add Subservice
        </Button>
      </div>
      
      <div className="space-y-3 ml-4">
        {service.subServices.map(subservice => (
          <SubserviceCard
            key={subservice.id}
            service={service}
            subservice={subservice}
            toggleSubservice={toggleSubservice}
            openEditSubserviceDialog={openEditSubserviceDialog}
            deleteSubservice={deleteSubservice}
            openAddItemDialog={openAddItemDialog}
            openEditItemDialog={openEditItemDialog}
            deleteItem={deleteItem}
            toggleSubserviceActive={toggleSubserviceActive}
            toggleItemActive={toggleItemActive}
          />
        ))}
        
        {service.subServices.length === 0 && (
          <p className="text-sm text-gray-500 italic">No subservices added yet</p>
        )}
      </div>
    </div>
  );
};
