
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Trash2 } from 'lucide-react';

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
      items?: Array<{
        id: string;
        name: string;
        standardPrice: string;
        expressPrice: string;
        price: string;
        active: boolean;
      }>;
    }[];
  };
  handleNewServiceChange: (field: string, value: string) => void;
  handleSubServiceChange: (id: string, field: string, value: string) => void;
  addSubServiceToForm: () => void;
  removeSubServiceFromForm: (id: string) => void;
  addNewService: () => void;
  addItemToSubService: (subServiceId: string) => void;
  isAddServiceItemDialogOpen: boolean;
  setIsAddServiceItemDialogOpen: (open: boolean) => void;
  newServiceItem: {
    name: string;
    standardPrice: string;
    expressPrice: string;
  };
  handleNewServiceItemChange: (field: string, value: string) => void;
  saveNewServiceItem: () => void;
}

export const AddServiceDialog: React.FC<AddServiceDialogProps> = ({
  isOpen,
  onOpenChange,
  newService,
  handleNewServiceChange,
  handleSubServiceChange,
  addSubServiceToForm,
  removeSubServiceFromForm,
  addNewService,
  addItemToSubService,
  isAddServiceItemDialogOpen,
  setIsAddServiceItemDialogOpen,
  newServiceItem,
  handleNewServiceItemChange,
  saveNewServiceItem
}) => {
  return (
    <>
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
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-1"
                        onClick={() => addItemToSubService(subService.id)}
                      >
                        <Plus className="h-4 w-4" /> Add Items
                      </Button>
                    </div>
                    
                    {subService.items && subService.items.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {subService.items.map((item, itemIndex) => (
                          <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                            <div>
                              <p className="text-sm font-medium">{item.name}</p>
                              <div className="flex text-xs text-gray-500 space-x-2">
                                <span>Standard: ₹{item.standardPrice}</span>
                                <span>Express: ₹{item.expressPrice}</span>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-7 w-7 p-0"
                              onClick={() => {
                                handleSubServiceChange(
                                  subService.id, 
                                  'items', 
                                  JSON.stringify(subService.items?.filter((_, idx) => idx !== itemIndex) || [])
                                );
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
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

      <Dialog open={isAddServiceItemDialogOpen} onOpenChange={setIsAddServiceItemDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
            <p className="text-sm text-gray-500 mt-1">Create a new item for the selected subservice</p>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-item-name">Item Name</Label>
              <Input 
                id="new-item-name" 
                value={newServiceItem.name} 
                onChange={(e) => handleNewServiceItemChange('name', e.target.value)} 
                placeholder="Enter item name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-item-standard-price">Standard Price</Label>
              <Input 
                id="new-item-standard-price" 
                type="number" 
                value={newServiceItem.standardPrice} 
                onChange={(e) => handleNewServiceItemChange('standardPrice', e.target.value)} 
                placeholder="Enter standard price"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-item-express-price">Express Price</Label>
              <Input 
                id="new-item-express-price" 
                type="number" 
                value={newServiceItem.expressPrice} 
                onChange={(e) => handleNewServiceItemChange('expressPrice', e.target.value)} 
                placeholder="Enter express price"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button 
              variant="outline" 
              onClick={() => setIsAddServiceItemDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={saveNewServiceItem}
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              Add Item
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
