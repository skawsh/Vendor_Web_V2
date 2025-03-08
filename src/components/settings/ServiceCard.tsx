
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronDown, ChevronRight, Edit, Plus, Save, Trash2, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { SubserviceCard } from './SubserviceCard';
import { Service } from '@/types/services';

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
  deleteService
}) => {
  return (
    <Card key={service.id} className="border">
      <div className="p-3 flex justify-between items-center cursor-pointer hover:bg-gray-50" onClick={() => toggleService(service.id)}>
        <div className="flex items-center gap-2">
          {service.isOpen ? <ChevronDown className="h-5 w-5 text-gray-500" /> : <ChevronRight className="h-5 w-5 text-gray-500" />}
          <div>
            <h3 className="font-medium">{service.name}</h3>
            <p className="text-xs text-gray-500">{service.subServices.length} subservice{service.subServices.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={e => {
            e.stopPropagation();
            toggleEditService(service.id);
          }}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-red-500" onClick={e => {
            e.stopPropagation();
            deleteService(service.id);
          }}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Collapsible open={service.isOpen}>
        <CollapsibleContent>
          <div className="p-4 border-t">
            {service.isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`service-name-${service.id}`}>Service Name</Label>
                    <Input id={`service-name-${service.id}`} value={service.name} onChange={e => handleServiceChange(service.id, 'name', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`service-price-${service.id}`}>Price</Label>
                    <div className="flex gap-2">
                      <Input id={`service-price-${service.id}`} type="number" value={service.price} onChange={e => handleServiceChange(service.id, 'price', e.target.value)} />
                      <select value={service.unit} onChange={e => handleServiceChange(service.id, 'unit', e.target.value)} className="px-2 py-1 border rounded-md w-24">
                        <option value="kg">per kg</option>
                        <option value="piece">per piece</option>
                        <option value="meter">per meter</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`service-desc-${service.id}`}>Description</Label>
                  <Input id={`service-desc-${service.id}`} value={service.description} onChange={e => handleServiceChange(service.id, 'description', e.target.value)} />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => toggleEditService(service.id)}>
                    <X className="h-4 w-4 mr-1" /> Cancel
                  </Button>
                  <Button onClick={() => saveServiceChanges(service.id)}>
                    <Save className="h-4 w-4 mr-1" /> Save
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    
                  </div>
                </div>
                
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
                      />
                    ))}
                    
                    {service.subServices.length === 0 && <p className="text-sm text-gray-500 italic">No subservices added yet</p>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
