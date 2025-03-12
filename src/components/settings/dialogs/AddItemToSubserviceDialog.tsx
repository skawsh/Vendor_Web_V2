
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface AddItemToSubserviceDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  newItem: {
    name: string;
    standardPrice: string;
    expressPrice: string;
  };
  handleNewItemChange: (field: string, value: string) => void;
  handleAddItem: () => void;
}

export const AddItemToSubserviceDialog: React.FC<AddItemToSubserviceDialogProps> = ({
  isOpen,
  onOpenChange,
  newItem,
  handleNewItemChange,
  handleAddItem
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
          <DialogDescription>
            Create a new item for the selected subservice
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="item-name">Item Name</Label>
            <Input
              id="item-name"
              value={newItem.name}
              onChange={(e) => handleNewItemChange('name', e.target.value)}
              placeholder="Enter item name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="standard-price">Standard Price</Label>
            <Input
              id="standard-price"
              type="number"
              value={newItem.standardPrice}
              onChange={(e) => handleNewItemChange('standardPrice', e.target.value)}
              placeholder="Enter standard price"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="express-price">Express Price</Label>
            <Input
              id="express-price"
              type="number"
              value={newItem.expressPrice}
              onChange={(e) => handleNewItemChange('expressPrice', e.target.value)}
              placeholder="Enter express price"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            variant="default"
            onClick={handleAddItem}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Add Item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
