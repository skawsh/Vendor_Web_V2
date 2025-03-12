
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, Edit, Plus, Trash2, Check, X } from 'lucide-react';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { Service, Subservice } from '@/types/services';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';

interface SubserviceCardProps {
  service: Service;
  subservice: Subservice;
  toggleSubservice: (serviceId: string, subserviceId: string) => void;
  openEditSubserviceDialog: (serviceId: string, subservice: Subservice) => void;
  deleteSubservice: (serviceId: string, subserviceId: string) => void;
  openAddItemDialog: (serviceId: string, subserviceId: string) => void;
  openEditItemDialog: (serviceId: string, subserviceId: string, item: any) => void;
  deleteItem: (serviceId: string, subserviceId: string, itemId: string) => void;
  toggleSubserviceActive: (serviceId: string, subserviceId: string) => void;
  toggleItemActive?: (serviceId: string, subserviceId: string, itemId: string) => void;
}

export const SubserviceCard: React.FC<SubserviceCardProps> = ({
  service,
  subservice,
  toggleSubservice,
  openEditSubserviceDialog,
  deleteSubservice,
  openAddItemDialog,
  openEditItemDialog,
  deleteItem,
  toggleSubserviceActive,
  toggleItemActive
}) => {
  const [isEditingPrices, setIsEditingPrices] = useState(false);
  const [pricePerKg, setPricePerKg] = useState(subservice.pricePerKg?.toString() || "70");
  const [pricePerItem, setPricePerItem] = useState(subservice.pricePerItem?.toString() || "10");
  const [expressPricePerKg, setExpressPricePerKg] = useState(subservice.expressPricePerKg?.toString() || "100");
  const [expressPricePerItem, setExpressPricePerItem] = useState(subservice.expressPricePerItem?.toString() || "20");
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editedValues, setEditedValues] = useState<{
    name: string;
    standardPrice: string;
    expressPrice: string;
  }>({ name: '', standardPrice: '', expressPrice: '' });

  const handleSavePrices = () => {
    const updatedSubservice = {
      ...subservice,
      pricePerKg: parseFloat(pricePerKg),
      pricePerItem: parseFloat(pricePerItem),
      expressPricePerKg: parseFloat(expressPricePerKg),
      expressPricePerItem: parseFloat(expressPricePerItem)
    };
    openEditSubserviceDialog(service.id, updatedSubservice);
    setIsEditingPrices(false);
  };

  const startEditingItem = (item: any) => {
    setEditingItem(item.id);
    setEditedValues({
      name: item.name,
      standardPrice: item.standardPrice.toString(),
      expressPrice: item.expressPrice.toString()
    });
  };

  const cancelEditingItem = () => {
    setEditingItem(null);
    setEditedValues({ name: '', standardPrice: '', expressPrice: '' });
  };

  const saveItemEdit = (itemId: string) => {
    const updatedItem = {
      id: itemId,
      name: editedValues.name,
      price: parseFloat(editedValues.standardPrice), // Keep price field for compatibility
      standardPrice: parseFloat(editedValues.standardPrice),
      expressPrice: parseFloat(editedValues.expressPrice),
      parentServiceId: service.id,
      parentSubserviceId: subservice.id
    };
    openEditItemDialog(service.id, subservice.id, updatedItem);
    setEditingItem(null);
  };

  return (
    <Card key={subservice.id} className="border">
      <div className="p-2 flex justify-between items-center cursor-pointer hover:bg-gray-50" onClick={() => toggleSubservice(service.id, subservice.id)}>
        <div className="flex items-center gap-2">
          {subservice.isOpen ? <ChevronDown className="h-4 w-4 text-gray-500" /> : <ChevronRight className="h-4 w-4 text-gray-500" />}
          <div>
            <p className="font-medium text-sm">{subservice.name}</p>
            <div className="flex items-center gap-2">
              <p className="text-xs text-gray-500">{subservice.items.length} item{subservice.items.length !== 1 ? 's' : ''}</p>
              {subservice.price && <p className="text-xs text-blue-600">₹{subservice.price}</p>}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div 
            className="flex items-center gap-2 mr-2" 
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-xs text-gray-500">{subservice.active ? 'Active' : 'Inactive'}</span>
            <Switch 
              checked={subservice.active} 
              onCheckedChange={() => toggleSubserviceActive(service.id, subservice.id)}
            />
          </div>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={e => {
            e.stopPropagation();
            openEditSubserviceDialog(service.id, subservice);
          }}>
            <Edit className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500" onClick={e => {
            e.stopPropagation();
            deleteSubservice(service.id, subservice.id);
          }}>
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      <Collapsible open={subservice.isOpen}>
        <CollapsibleContent className="p-3 pt-0 border-t mt-2">
          {subservice.name === "Wash&Fold" && (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <div className="flex-1">Pricing Information</div>
                {!isEditingPrices ? (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsEditingPrices(true)}
                    className="h-7"
                  >
                    <Edit className="h-3 w-3 mr-1" /> Edit Prices
                  </Button>
                ) : (
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleSavePrices}
                      className="h-7 text-green-600"
                    >
                      <Check className="h-3 w-3 mr-1" /> Save
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setIsEditingPrices(false)}
                      className="h-7 text-red-500"
                    >
                      <X className="h-3 w-3 mr-1" /> Cancel
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600">Standard Price per KG:</p>
                    {!isEditingPrices ? (
                      <span className="font-medium">₹{subservice.pricePerKg || 70}</span>
                    ) : (
                      <Input
                        type="number"
                        value={pricePerKg}
                        onChange={(e) => setPricePerKg(e.target.value)}
                        className="w-20 h-7 text-right"
                      />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600">Express Price per KG:</p>
                    {!isEditingPrices ? (
                      <span className="font-medium">₹{subservice.expressPricePerKg || 100}</span>
                    ) : (
                      <Input
                        type="number"
                        value={expressPricePerKg}
                        onChange={(e) => setExpressPricePerKg(e.target.value)}
                        className="w-20 h-7 text-right"
                      />
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600">Standard Price per Item:</p>
                    {!isEditingPrices ? (
                      <span className="font-medium">₹{subservice.pricePerItem || 10}</span>
                    ) : (
                      <Input
                        type="number"
                        value={pricePerItem}
                        onChange={(e) => setPricePerItem(e.target.value)}
                        className="w-20 h-7 text-right"
                      />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600">Express Price per Item:</p>
                    {!isEditingPrices ? (
                      <span className="font-medium">₹{subservice.expressPricePerItem || 20}</span>
                    ) : (
                      <Input
                        type="number"
                        value={expressPricePerItem}
                        onChange={(e) => setExpressPricePerItem(e.target.value)}
                        className="w-20 h-7 text-right"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mb-2 mt-2">
            <h5 className="text-sm font-medium">Items</h5>
            <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => openAddItemDialog(service.id, subservice.id)}>
              <Plus className="h-3 w-3 mr-1" /> Add Item
            </Button>
          </div>
          
          {subservice.items.length > 0 ? (
            <div className="space-y-2">
              <div className="grid grid-cols-4 gap-2 px-2 py-1 bg-gray-50 text-xs font-medium">
                <div>Name</div>
                <div className="text-right">Standard Price</div>
                <div className="text-right">Express Price</div>
                <div className="text-right">Status</div>
              </div>
              
              {subservice.items.map(item => (
                <div key={item.id} className="grid grid-cols-4 gap-2 px-2 py-2 border-b text-sm">
                  {editingItem === item.id ? (
                    <>
                      <div className="flex items-center">
                        <Input
                          value={editedValues.name}
                          onChange={(e) => setEditedValues(prev => ({ ...prev, name: e.target.value }))}
                          className="h-7 text-sm"
                        />
                      </div>
                      <div className="text-right">
                        <Input
                          type="number"
                          value={editedValues.standardPrice}
                          onChange={(e) => setEditedValues(prev => ({ ...prev, standardPrice: e.target.value }))}
                          className="h-7 text-sm text-right"
                        />
                      </div>
                      <div className="text-right">
                        <Input
                          type="number"
                          value={editedValues.expressPrice}
                          onChange={(e) => setEditedValues(prev => ({ ...prev, expressPrice: e.target.value }))}
                          className="h-7 text-sm text-right"
                        />
                      </div>
                      <div className="text-right flex justify-end items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-green-500" onClick={() => saveItemEdit(item.id)}>
                          <Check className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500" onClick={cancelEditingItem}>
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center">
                        {item.name}
                        <Button variant="ghost" size="icon" className="h-6 w-6 ml-2" onClick={() => startEditingItem(item)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="text-right">₹{item.standardPrice}</div>
                      <div className="text-right">₹{item.expressPrice}</div>
                      <div className="text-right flex justify-end items-center gap-2">
                        <div 
                          className="flex items-center gap-2" 
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="text-xs text-gray-500">{item.active !== false ? 'Active' : 'Inactive'}</span>
                          <Switch 
                            checked={item.active !== false} 
                            onCheckedChange={() => toggleItemActive && toggleItemActive(service.id, subservice.id, item.id)}
                          />
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500" onClick={() => deleteItem(service.id, subservice.id, item.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : <p className="text-sm text-gray-500 italic">No items added yet</p>}
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
