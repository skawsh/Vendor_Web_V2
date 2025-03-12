
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ItemDialogsProps {
  isAddItemDialogOpen: boolean;
  setIsAddItemDialogOpen: (isOpen: boolean) => void;
  newItem: {
    name: string;
    price: string;
    standardPrice: string;
    expressPrice: string;
    parentServiceId: string;
    parentSubserviceId: string;
  };
  handleNewItemChange: (field: string, value: string) => void;
  addNewItem: () => void;
  isEditItemDialogOpen: boolean;
  setIsEditItemDialogOpen: (isOpen: boolean) => void;
  editItem: {
    id: string;
    name: string;
    price: string | number;
    standardPrice: string | number;
    expressPrice: string | number;
    parentServiceId: string;
    parentSubserviceId: string;
  };
  handleEditItemChange: (field: string, value: string) => void;
  saveItemChanges: () => void;
}

export const ItemDialogs: React.FC<ItemDialogsProps> = ({
  isAddItemDialogOpen,
  setIsAddItemDialogOpen,
  newItem,
  handleNewItemChange,
  addNewItem,
  isEditItemDialogOpen,
  setIsEditItemDialogOpen,
  editItem,
  handleEditItemChange,
  saveItemChanges
}) => {
  return (
    <>
      <Dialog open={isAddItemDialogOpen} onOpenChange={setIsAddItemDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
            <DialogDescription>
              Create a new item for the selected subservice
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-item-name">Item Name</Label>
              <Input id="new-item-name" value={newItem.name} onChange={e => handleNewItemChange('name', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-item-price">Price</Label>
              <Input id="new-item-price" type="number" value={newItem.price} onChange={e => handleNewItemChange('price', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-item-standard-price">Standard Price</Label>
              <Input id="new-item-standard-price" type="number" value={newItem.standardPrice} onChange={e => handleNewItemChange('standardPrice', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-item-express-price">Express Price</Label>
              <Input id="new-item-express-price" type="number" value={newItem.expressPrice} onChange={e => handleNewItemChange('expressPrice', e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddItemDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addNewItem}>
              Add Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditItemDialogOpen} onOpenChange={setIsEditItemDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogDescription>
              Update the item details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-item-name" className="rounded-md">Item Name</Label>
              <Input id="edit-item-name" value={editItem.name} onChange={e => handleEditItemChange('name', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-item-price">Price</Label>
              <Input id="edit-item-price" type="number" value={editItem.price} onChange={e => handleEditItemChange('price', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-item-standard-price">Standard Price</Label>
              <Input id="edit-item-standard-price" type="number" value={editItem.standardPrice} onChange={e => handleEditItemChange('standardPrice', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-item-express-price">Express Price</Label>
              <Input id="edit-item-express-price" type="number" value={editItem.expressPrice} onChange={e => handleEditItemChange('expressPrice', e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditItemDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveItemChanges}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
