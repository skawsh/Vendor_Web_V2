
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus } from 'lucide-react';

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
      pricePerKg?: string;
      expressPricePerKg?: string;
      pricePerItem?: string;
      expressPricePerItem?: string;
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
      <DialogContent className="sm:max-w-md p-6 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-blue-500 text-2xl font-medium">Add Service</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] overflow-y-auto pr-4">
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-service-name" className="text-gray-700 font-medium">Service Name</Label>
              <Input id="new-service-name" value={newService.name} onChange={e => handleNewServiceChange('name', e.target.value)} placeholder="Service Name" />
            </div>
            
            {newService.subServices.map((subService, index) => (
              <div key={subService.id} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor={`sub-service-${subService.id}`} className="text-gray-700">Subservice Name</Label>
                  <Input 
                    id={`sub-service-${subService.id}`} 
                    value={subService.name} 
                    onChange={e => handleSubServiceChange(subService.id, 'name', e.target.value)} 
                    placeholder="Subservice name" 
                    className="w-full" 
                  />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-gray-700 font-medium">Pricing Details</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`price-per-kg-${subService.id}`} className="text-gray-700">Standard Price per KG</Label>
                      <Input 
                        id={`price-per-kg-${subService.id}`} 
                        type="number" 
                        value={subService.pricePerKg || ''} 
                        onChange={e => handleSubServiceChange(subService.id, 'pricePerKg', e.target.value)} 
                        placeholder="Price per KG" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`express-price-per-kg-${subService.id}`} className="text-gray-700">Express Price per KG</Label>
                      <Input 
                        id={`express-price-per-kg-${subService.id}`} 
                        type="number" 
                        value={subService.expressPricePerKg || ''} 
                        onChange={e => handleSubServiceChange(subService.id, 'expressPricePerKg', e.target.value)} 
                        placeholder="Express price per KG" 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`price-per-item-${subService.id}`} className="text-gray-700">Standard Price per Item</Label>
                      <Input 
                        id={`price-per-item-${subService.id}`} 
                        type="number" 
                        value={subService.pricePerItem || ''} 
                        onChange={e => handleSubServiceChange(subService.id, 'pricePerItem', e.target.value)} 
                        placeholder="Price per item" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`express-price-per-item-${subService.id}`} className="text-gray-700">Express Price per Item</Label>
                      <Input 
                        id={`express-price-per-item-${subService.id}`} 
                        type="number" 
                        value={subService.expressPricePerItem || ''} 
                        onChange={e => handleSubServiceChange(subService.id, 'expressPricePerItem', e.target.value)} 
                        placeholder="Express price per item" 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-gray-700 font-medium">Clothing Items</h3>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Plus className="h-4 w-4" /> Add Items
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <Button 
                    variant="outline" 
                    onClick={addSubServiceToForm} 
                    className="w-full py-2 h-auto"
                  >
                    Add Sub Service
                  </Button>
                  <Button 
                    variant="removeSubServiceBtn" 
                    onClick={() => removeSubServiceFromForm(subService.id)} 
                    className="w-full py-2 h-auto"
                  >
                    Remove Sub Service
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-6 flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="py-2 px-6 h-auto">
              Cancel
            </Button>
            <Button 
              variant="saveService" 
              onClick={addNewService} 
              className="py-2 px-6 h-auto"
            >
              Save
            </Button>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
