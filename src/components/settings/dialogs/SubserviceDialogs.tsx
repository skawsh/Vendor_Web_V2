
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface SubserviceDialogsProps {
  isAddSubserviceDialogOpen: boolean;
  setIsAddSubserviceDialogOpen: (isOpen: boolean) => void;
  newSubservice: {
    name: string;
    parentServiceId: string;
    price?: string;
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
              <Input id="new-subservice-name" value={newSubservice.name} onChange={e => handleNewSubserviceChange('name', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-subservice-price">Price (Optional)</Label>
              <Input id="new-subservice-price" type="number" value={newSubservice.price || ''} onChange={e => handleNewSubserviceChange('price', e.target.value)} placeholder="Enter price (optional)" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddSubserviceDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addNewSubservice}>
              Add Subservice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditSubserviceDialogOpen} onOpenChange={setIsEditSubserviceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Subservice</DialogTitle>
            <DialogDescription>
              Update the subservice name
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
