
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, X } from 'lucide-react';

interface ServiceEditFormProps {
  service: {
    id: string;
    name: string;
    price: string | number;
    unit: string;
    description: string;
  };
  handleServiceChange: (serviceId: string, field: string, value: any) => void;
  toggleEditService: (serviceId: string) => void;
  saveServiceChanges: (serviceId: string) => void;
}

export const ServiceEditForm: React.FC<ServiceEditFormProps> = ({
  service,
  handleServiceChange,
  toggleEditService,
  saveServiceChanges
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`service-name-${service.id}`}>Service Name</Label>
        <Input 
          id={`service-name-${service.id}`} 
          value={service.name} 
          onChange={e => handleServiceChange(service.id, 'name', e.target.value)} 
        />
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
  );
};
