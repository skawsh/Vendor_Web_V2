
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface EditSubserviceDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  editSubservice: {
    id: string;
    name: string;
    parentServiceId: string;
    price?: string;
    pricePerKg?: string;
    pricePerItem?: string;
    expressPricePerKg?: string;
    expressPricePerItem?: string;
  };
  handleEditSubserviceChange: (field: string, value: string) => void;
  saveSubserviceChanges: () => void;
}

export const EditSubserviceDialog: React.FC<EditSubserviceDialogProps> = ({
  isOpen,
  onOpenChange,
  editSubservice,
  handleEditSubserviceChange,
  saveSubserviceChanges
}) => {
  const isWashFold = editSubservice.name === 'Wash&Fold';

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Subservice</DialogTitle>
          <DialogDescription>
            Update the subservice details
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-subservice-name">Subservice Name</Label>
            <Input 
              id="edit-subservice-name" 
              value={editSubservice.name} 
              onChange={e => handleEditSubserviceChange('name', e.target.value)} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-subservice-price">Price (Optional)</Label>
            <Input 
              id="edit-subservice-price" 
              type="number" 
              value={editSubservice.price || ''} 
              onChange={e => handleEditSubserviceChange('price', e.target.value)} 
              placeholder="Enter price (optional)" 
            />
          </div>
          
          {isWashFold && (
            <div className="space-y-4 mt-4">
              <h3 className="text-sm font-medium">Pricing Details</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-price-per-kg">Standard Price per KG</Label>
                  <Input 
                    id="edit-price-per-kg" 
                    type="number" 
                    value={editSubservice.pricePerKg || ''} 
                    onChange={e => handleEditSubserviceChange('pricePerKg', e.target.value)} 
                    placeholder="Price per KG" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-express-price-per-kg">Express Price per KG</Label>
                  <Input 
                    id="edit-express-price-per-kg" 
                    type="number" 
                    value={editSubservice.expressPricePerKg || ''} 
                    onChange={e => handleEditSubserviceChange('expressPricePerKg', e.target.value)} 
                    placeholder="Express price per KG" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-price-per-item">Standard Price per Item</Label>
                  <Input 
                    id="edit-price-per-item" 
                    type="number" 
                    value={editSubservice.pricePerItem || ''} 
                    onChange={e => handleEditSubserviceChange('pricePerItem', e.target.value)} 
                    placeholder="Price per item" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-express-price-per-item">Express Price per Item</Label>
                  <Input 
                    id="edit-express-price-per-item" 
                    type="number" 
                    value={editSubservice.expressPricePerItem || ''} 
                    onChange={e => handleEditSubserviceChange('expressPricePerItem', e.target.value)} 
                    placeholder="Express price per item" 
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={saveSubserviceChanges}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
