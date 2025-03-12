
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Plus, ChevronDown, ChevronUp, X, Trash } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

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
  const [expandedSubServices, setExpandedSubServices] = useState<Record<string, boolean>>({});
  const [isServiceExpanded, setIsServiceExpanded] = useState(true);
  const [services, setServices] = useState<
    Array<{
      id: string;
      name: string;
      subServices: Array<{
        id: string;
        name: string;
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
      }>;
    }>
  >([]);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  // Reset all subservices visibility when main service is collapsed
  const handleServiceCollapse = (open: boolean) => {
    setIsServiceExpanded(open);
    if (!open) {
      setExpandedSubServices({});
    }
  };

  // Add current service to the list and prepare for a new one
  const handleAddAnotherService = () => {
    if (!newService.name || !newService.subServices.some(ss => ss.name)) {
      return;
    }

    // Add current service to the list
    setServices(prev => [...prev, { 
      id: `service-${Date.now()}`,
      name: newService.name,
      subServices: newService.subServices
    }]);

    // Reset form for new service
    handleNewServiceChange('name', '');
    newService.subServices.forEach(ss => {
      removeSubServiceFromForm(ss.id);
    });
    addSubServiceToForm();
    
    setCurrentServiceIndex(prev => prev + 1);
    setIsServiceExpanded(true);
    setExpandedSubServices({});
  };

  const handleRemoveService = (index: number) => {
    setServices(prev => prev.filter((_, i) => i !== index));
  };

  const handleSaveAllServices = () => {
    // First add the current service if it has data
    if (newService.name && newService.subServices.some(ss => ss.name)) {
      setServices(prev => [...prev, { 
        id: `service-${Date.now()}`,
        name: newService.name,
        subServices: newService.subServices
      }]);
    }

    // Save all services
    services.forEach(() => {
      addNewService();
    });

    // Close dialog
    onOpenChange(false);
  };

  // Reset form data when dialog opens or closes
  useEffect(() => {
    if (!isOpen) {
      setExpandedSubServices({});
      setIsServiceExpanded(true);
      setServices([]);
      setCurrentServiceIndex(0);
    }
  }, [isOpen]);

  return <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-2xl p-0 bg-white rounded-2xl overflow-hidden">
          <DialogHeader className="bg-white p-6 border-b">
            <DialogTitle className="text-2xl font-semibold text-center text-blue-600">Add New Services</DialogTitle>
            <DialogDescription className="text-center text-gray-500 mt-1">
              Create multiple services with subservices and items
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="max-h-[70vh] overflow-y-auto py-6 px-6">
            {/* Already added services */}
            {services.length > 0 && (
              <div className="mb-6 space-y-4">
                <h3 className="text-lg font-medium text-gray-800">Added Services</h3>
                {services.map((service, index) => (
                  <div 
                    key={service.id} 
                    className="relative p-4 border border-blue-100 rounded-lg bg-blue-50"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-blue-600">{service.name}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-full text-red-500 hover:bg-red-50"
                        onClick={() => handleRemoveService(index)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Subservices: {service.subServices.filter(ss => ss.name).length}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Current service form */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <Collapsible open={isServiceExpanded} onOpenChange={handleServiceCollapse}>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="new-service-name" className="text-gray-700 font-medium text-base">Service Name</Label>
                    <CollapsibleTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                      >
                        {isServiceExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  
                  <Input 
                    id="new-service-name" 
                    value={newService.name} 
                    onChange={e => handleNewServiceChange('name', e.target.value)} 
                    placeholder="Enter service name"
                    className="border border-blue-200 focus:border-blue-400 rounded-lg mb-2"
                  />
                </Collapsible>
              </div>
              
              {isServiceExpanded && newService.subServices.map((subService, index) => (
                <div key={subService.id} className="bg-gray-50 rounded-lg p-4">
                  <Collapsible 
                    open={expandedSubServices[subService.id] !== false}
                    onOpenChange={(open) => setExpandedSubServices(prev => ({ ...prev, [subService.id]: open }))}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor={`sub-service-${subService.id}`} className="text-gray-700 font-medium text-base">Subservice Name</Label>
                      <CollapsibleTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                        >
                          {expandedSubServices[subService.id] !== false ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    
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
                onClick={handleAddAnotherService}
                className="w-full py-3 h-auto bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium flex items-center justify-center"
                disabled={!newService.name || !newService.subServices.some(ss => ss.name)}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Service & Create Another
              </Button>
              
              <Button 
                onClick={handleSaveAllServices}
                className="w-full py-3 h-auto bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                disabled={(services.length === 0 && (!newService.name || !newService.subServices.some(ss => ss.name)))}
              >
                Save {services.length + (newService.name && newService.subServices.some(ss => ss.name) ? 1 : 0)} Services
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

