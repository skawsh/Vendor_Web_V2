
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

interface SubserviceDialogsProps {
  isAddSubserviceDialogOpen: boolean;
  setIsAddSubserviceDialogOpen: (isOpen: boolean) => void;
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
  isEditSubserviceDialogOpen: boolean;
  setIsEditSubserviceDialogOpen: (isOpen: boolean) => void;
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

export const SubserviceDialogs: React.FC<SubserviceDialogsProps> = ({
  isAddSubserviceDialogOpen,
  setIsAddSubserviceDialogOpen,
  newSubservice,
  handleNewSubserviceChange,
  addNewSubservice,
  isEditSubserviceDialogOpen,
  setIsEditSubserviceDialogOpen,
  editSubservice,
  handleEditSubserviceChange,
  saveSubserviceChanges
}) => {
  const isWashFold = editSubservice.name === 'Wash&Fold';

  return (
    <>
      <Dialog open={isAddSubserviceDialogOpen} onOpenChange={setIsAddSubserviceDialogOpen}>
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

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Clothing Items</h3>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Plus className="h-4 w-4" /> Add Items
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddSubserviceDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addNewSubservice}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditSubserviceDialogOpen} onOpenChange={setIsEditSubserviceDialogOpen}>
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
              <Input id="edit-subservice-name" value={editSubservice.name} onChange={e => handleEditSubserviceChange('name', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-subservice-price">Price (Optional)</Label>
              <Input id="edit-subservice-price" type="number" value={editSubservice.price || ''} onChange={e => handleEditSubserviceChange('price', e.target.value)} placeholder="Enter price (optional)" />
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
            <Button variant="outline" onClick={() => setIsEditSubserviceDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveSubserviceChanges}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
