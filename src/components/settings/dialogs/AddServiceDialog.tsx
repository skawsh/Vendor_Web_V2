
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AddServiceDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newService: {
    name: string;
    description: string;
    price: string;
    expressPrice: string;
    unit: string;
    subServices: {
      name: string;
      price: string;
      id: string;
    }[];
  };
  handleNewServiceChange: (field: string, value: string) => void;
  handleSubServiceChange: (id: string, field: string, value: string) => void;
  addSubServiceToForm: () => void;
  removeSubServiceFromForm: (id: string) => void;
  addNewService: () => void;
}

export const AddServiceDialog: React.FC<AddServiceDialogProps> = ({
  isOpen,
  onOpenChange,
  newService,
  handleNewServiceChange,
  handleSubServiceChange,
  addSubServiceToForm,
  removeSubServiceFromForm,
  addNewService
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-8 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-blue-500 text-2xl font-medium">Add Service</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] overflow-y-auto pr-4">
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-service-name" className="text-gray-700 font-medium">Service Name</Label>
              <Input id="new-service-name" value={newService.name} onChange={e => handleNewServiceChange('name', e.target.value)} placeholder="Service Name" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="standard-price" className="text-gray-700 font-medium">Standard Price (Optional)</Label>
                <Input 
                  id="standard-price" 
                  type="number"
                  value={newService.price} 
                  onChange={e => handleNewServiceChange('price', e.target.value)} 
                  placeholder="Standard price" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="express-price" className="text-gray-700 font-medium">Express Price (Optional)</Label>
                <Input 
                  id="express-price" 
                  type="number"
                  value={newService.expressPrice} 
                  onChange={e => handleNewServiceChange('expressPrice', e.target.value)} 
                  placeholder="Express price" 
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <Label className="text-gray-700 font-medium">Sub Services</Label>
              <div className="space-y-6 border rounded-md p-6 bg-gray-50">
                {newService.subServices.map((subService, index) => (
                  <div key={subService.id} className="space-y-2">
                    <Label htmlFor={`sub-service-${subService.id}`} className="text-gray-700">Sub Service Name</Label>
                    <Input id={`sub-service-${subService.id}`} value={subService.name} onChange={e => handleSubServiceChange(subService.id, 'name', e.target.value)} placeholder="Sub service name" className="flex-1 bg-white border-gray-200 shadow-sm" />
                    
                    <Label htmlFor={`sub-service-price-${subService.id}`} className="text-gray-700 mt-2">Price (Optional)</Label>
                    <Input id={`sub-service-price-${subService.id}`} value={subService.price} onChange={e => handleSubServiceChange(subService.id, 'price', e.target.value)} placeholder="Enter price" type="number" className="flex-1 bg-white border-gray-200 shadow-sm" />
                    
                    <Button variant="outline" onClick={() => removeSubServiceFromForm(subService.id)} className="mt-2 py-2 px-4 h-auto">
                      Remove Sub Service
                    </Button>
                  </div>
                ))}
                <Button variant="outline" onClick={addSubServiceToForm} className="mt-4 py-2 px-4 h-auto">
                  Add Sub Service
                </Button>
              </div>
            </div>
          </div>
          <div className="pt-4 flex justify-start">
            <Button onClick={addNewService} className="w-24 py-2 px-4 h-auto">
              Save
            </Button>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
