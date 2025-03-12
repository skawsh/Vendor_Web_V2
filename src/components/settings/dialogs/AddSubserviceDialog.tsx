
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { AddItemToSubserviceDialog } from './AddItemToSubserviceDialog';

interface AddSubserviceDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  newSubservice: {
    name: string;
    parentServiceId: string;
    price?: string;
    pricePerKg?: string;
    pricePerItem?: string;
    expressPricePerKg?: string;
    expressPricePerItem?: string;
  };
  handleNewSubserviceChange: (field: string, value: string) => void;
  addNewSubservice: () => void;
}

export const AddSubserviceDialog: React.FC<AddSubserviceDialogProps> = ({
  isOpen,
  onOpenChange,
  newSubservice,
  handleNewSubserviceChange,
  addNewSubservice
}) => {
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const [items, setItems] = useState<Array<{
    name: string;
    standardPrice: string;
    expressPrice: string;
  }>>([]);
  const [newItem, setNewItem] = useState({
    name: '',
    standardPrice: '',
    expressPrice: ''
  });

  const handleNewItemChange = (field: string, value: string) => {
    setNewItem(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddItem = () => {
    if (!newItem.name) return;
    
    setItems(prev => [...prev, { ...newItem }]);
    setNewItem({
      name: '',
      standardPrice: '',
      expressPrice: ''
    });
    setIsAddItemDialogOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Subservice</DialogTitle>
            <DialogDescription>
              Create a new subservice for the selected service
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-subservice-name">Subservice Name</Label>
              <Input 
                id="new-subservice-name" 
                value={newSubservice.name} 
                onChange={e => handleNewSubserviceChange('name', e.target.value)} 
                className="w-full"
                placeholder="Enter subservice name"
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Pricing Details</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-price-per-kg">Standard Price per KG</Label>
                  <Input 
                    id="new-price-per-kg" 
                    type="number" 
                    value={newSubservice.pricePerKg || ''} 
                    onChange={e => handleNewSubserviceChange('pricePerKg', e.target.value)} 
                    placeholder="Price per KG" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-express-price-per-kg">Express Price per KG</Label>
                  <Input 
                    id="new-express-price-per-kg" 
                    type="number" 
                    value={newSubservice.expressPricePerKg || ''} 
                    onChange={e => handleNewSubserviceChange('expressPricePerKg', e.target.value)} 
                    placeholder="Express price per KG" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-price-per-item">Standard Price per Item</Label>
                  <Input 
                    id="new-price-per-item" 
                    type="number" 
                    value={newSubservice.pricePerItem || ''} 
                    onChange={e => handleNewSubserviceChange('pricePerItem', e.target.value)} 
                    placeholder="Price per item" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-express-price-per-item">Express Price per Item</Label>
                  <Input 
                    id="new-express-price-per-item" 
                    type="number" 
                    value={newSubservice.expressPricePerItem || ''} 
                    onChange={e => handleNewSubserviceChange('expressPricePerItem', e.target.value)} 
                    placeholder="Express price per item" 
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Clothing Items</h3>
                <Button 
                  onClick={() => setIsAddItemDialogOpen(true)} 
                  variant="outline" 
                  className="h-8 px-3 py-1 text-blue-500 border-blue-500 hover:bg-blue-50"
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Items
                </Button>
              </div>
              
              {items.length > 0 && (
                <div className="border rounded-md p-3 space-y-2">
                  {items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-2 border-b last:border-b-0">
                      <span>{item.name}</span>
                      <div className="flex gap-2 text-sm text-gray-500">
                        <span>Standard: ${item.standardPrice}</span>
                        <span>Express: ${item.expressPrice}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-md">
              Cancel
            </Button>
            <Button onClick={addNewSubservice} className="bg-blue-500 hover:bg-blue-600 rounded-md">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AddItemToSubserviceDialog
        isOpen={isAddItemDialogOpen}
        onOpenChange={setIsAddItemDialogOpen}
        newItem={newItem}
        handleNewItemChange={handleNewItemChange}
        handleAddItem={handleAddItem}
      />
    </>
  );
};
