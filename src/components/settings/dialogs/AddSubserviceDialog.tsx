
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

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
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
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
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={addNewSubservice}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
