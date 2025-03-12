
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Plus, ChevronDown, ChevronUp, X } from 'lucide-react';

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
  const [expandedSubServices, setExpandedSubServices] = React.useState<Record<string, boolean>>({});
  const [isServiceExpanded, setIsServiceExpanded] = React.useState(true);

  const toggleSubService = (id: string) => {
    setExpandedSubServices(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Reset form data when dialog opens or closes
  useEffect(() => {
    if (!isOpen) {
      // Reset expandedSubServices state when dialog closes
      setExpandedSubServices({});
      setIsServiceExpanded(true);
    }
  }, [isOpen]);

  return <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-2xl p-0 bg-white rounded-2xl overflow-hidden">
          <DialogHeader className="bg-white p-6 border-b relative">
            <DialogTitle className="text-2xl font-semibold text-center text-blue-600">Add New Service</DialogTitle>
            <DialogDescription className="text-center text-gray-500 mt-1">
              Create a new service with subservices and items
            </DialogDescription>
            <DialogClose className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:text-gray-500 hover:bg-gray-100">
              <X className="h-5 w-5" />
            </DialogClose>
          </DialogHeader>
          
          <ScrollArea className="max-h-[70vh] overflow-y-auto py-6 px-6">
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="new-service-name" className="text-gray-700 font-medium text-base">Service Name</Label>
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                      onClick={() => setIsServiceExpanded(!isServiceExpanded)}
                    >
                      {isServiceExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <Collapsible open={isServiceExpanded} onOpenChange={setIsServiceExpanded}>
                  <Input 
                    id="new-service-name" 
                    value={newService.name} 
                    onChange={e => handleNewServiceChange('name', e.target.value)} 
                    placeholder="Enter service name"
                    className="border border-blue-200 focus:border-blue-400 rounded-lg mb-2"
                  />
                  <CollapsibleContent>
                    <div className="pt-2">
                      <Label htmlFor="new-service-description" className="text-gray-700 font-medium">Service Description</Label>
                      <Input 
                        id="new-service-description" 
                        value={newService.description} 
                        onChange={e => handleNewServiceChange('description', e.target.value)} 
                        placeholder="Enter service description"
                        className="border border-blue-200 focus:border-blue-400 rounded-lg mt-1"
                      />
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
              
              {newService.subServices.map((subService, index) => (
                <div key={subService.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor={`sub-service-${subService.id}`} className="text-gray-700 font-medium text-base">Subservice Name</Label>
                    <CollapsibleTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                        onClick={() => toggleSubService(subService.id)}
                      >
                        {expandedSubServices[subService.id] !== false ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  
                  <Collapsible 
                    open={expandedSubServices[subService.id] !== false}
                    onOpenChange={(open) => setExpandedSubServices(prev => ({ ...prev, [subService.id]: open }))}
                  >
                    <Input 
                      id={`sub-service-${subService.id}`} 
                      value={subService.name} 
                      onChange={e => handleSubServiceChange(subService.id, 'name', e.target.value)} 
                      placeholder="Enter subservice name"
                      className="border border-blue-200 focus:border-blue-400 rounded-lg mb-3"
                    />
                    
                    <CollapsibleContent className="space-y-4">
                      <div>
                        <h3 className="text-gray-700 font-medium mb-3">Pricing Details</h3>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div className="space-y-2">
                            <Label htmlFor={`price-per-kg-${subService.id}`} className="text-gray-600">Standard Price per KG</Label>
                            <Input 
                              id={`price-per-kg-${subService.id}`} 
                              type="number" 
                              value={subService.pricePerKg || ''} 
                              onChange={e => handleSubServiceChange(subService.id, 'pricePerKg', e.target.value)} 
                              placeholder="₹0.00"
                              className="border border-blue-200 focus:border-blue-400 rounded-lg"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`express-price-per-kg-${subService.id}`} className="text-gray-600">Express Price per KG</Label>
                            <Input 
                              id={`express-price-per-kg-${subService.id}`} 
                              type="number" 
                              value={subService.expressPricePerKg || ''} 
                              onChange={e => handleSubServiceChange(subService.id, 'expressPricePerKg', e.target.value)} 
                              placeholder="₹0.00"
                              className="border border-blue-200 focus:border-blue-400 rounded-lg"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`price-per-item-${subService.id}`} className="text-gray-600">Standard Price per Item</Label>
                            <Input 
                              id={`price-per-item-${subService.id}`} 
                              type="number" 
                              value={subService.pricePerItem || ''} 
                              onChange={e => handleSubServiceChange(subService.id, 'pricePerItem', e.target.value)} 
                              placeholder="₹0.00"
                              className="border border-blue-200 focus:border-blue-400 rounded-lg"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`express-price-per-item-${subService.id}`} className="text-gray-600">Express Price per Item</Label>
                            <Input 
                              id={`express-price-per-item-${subService.id}`} 
                              type="number" 
                              value={subService.expressPricePerItem || ''} 
                              onChange={e => handleSubServiceChange(subService.id, 'expressPricePerItem', e.target.value)} 
                              placeholder="₹0.00"
                              className="border border-blue-200 focus:border-blue-400 rounded-lg"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 border-t pt-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-gray-700 font-medium">Clothing Items</h3>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex items-center gap-1 text-blue-600 border-blue-200 hover:bg-blue-50 rounded-lg h-9" 
                            onClick={() => addItemToSubService(subService.id)}
                          >
                            <Plus className="h-4 w-4" /> Add Items
                          </Button>
                        </div>
                        
                        {subService.items && subService.items.length > 0 && (
                          <div className="mt-2 space-y-2">
                            {subService.items.map((item) => (
                              <div key={item.id} className="flex justify-between items-center p-3 bg-white rounded-md border border-gray-200">
                                <div>
                                  <p className="text-sm font-medium text-gray-700">{item.name}</p>
                                  <div className="flex text-xs text-gray-500 space-x-2">
                                    <span>Standard: ₹{item.standardPrice}</span>
                                    <span>Express: ₹{item.expressPrice}</span>
                                  </div>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-7 w-7 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full" 
                                  onClick={() => {
                                    handleSubServiceChange(subService.id, 'items', 
                                      JSON.stringify(subService.items?.filter(i => i.id !== item.id) || [])
                                    );
                                  }}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <Button 
                          variant="outline"
                          onClick={addSubServiceToForm}
                          className="w-full py-2 h-auto text-blue-600 border-blue-200 hover:bg-blue-50 rounded-lg"
                        >
                          Add Another Subservice
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => removeSubServiceFromForm(subService.id)}
                          className="w-full py-2 h-auto text-red-500 border-red-200 hover:bg-red-50 rounded-lg"
                        >
                          Remove Subservice
                        </Button>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              ))}
            </div>
            
            <div className="pt-6 space-y-4 mt-4">
              <Button 
                variant="outline"
                onClick={addSubServiceToForm}
                className="w-full py-3 h-auto bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium flex items-center justify-center"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Another Service
              </Button>
              
              <Button 
                onClick={addNewService}
                className="w-full py-3 h-auto bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
              >
                Save
              </Button>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddServiceItemDialogOpen} onOpenChange={setIsAddServiceItemDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-blue-600">Add New Item</DialogTitle>
            <DialogDescription>
              Add a new item to the selected subservice
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-item-name">Item Name</Label>
              <Input 
                id="new-item-name" 
                value={newServiceItem.name} 
                onChange={e => handleNewServiceItemChange('name', e.target.value)} 
                placeholder="Enter item name"
                className="border-blue-200 focus:border-blue-400 rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-item-standard-price">Standard Price</Label>
              <Input 
                id="new-item-standard-price" 
                type="number" 
                value={newServiceItem.standardPrice} 
                onChange={e => handleNewServiceItemChange('standardPrice', e.target.value)} 
                placeholder="₹0.00"
                className="border-blue-200 focus:border-blue-400 rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-item-express-price">Express Price</Label>
              <Input 
                id="new-item-express-price" 
                type="number" 
                value={newServiceItem.expressPrice} 
                onChange={e => handleNewServiceItemChange('expressPrice', e.target.value)} 
                placeholder="₹0.00"
                className="border-blue-200 focus:border-blue-400 rounded-lg"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button 
              variant="outline" 
              onClick={() => setIsAddServiceItemDialogOpen(false)}
              className="border-blue-200 text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              Cancel
            </Button>
            <Button 
              onClick={saveNewServiceItem} 
              className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
            >
              Add Item
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>;
};
