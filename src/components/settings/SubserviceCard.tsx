
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, Edit, Plus, Trash2 } from 'lucide-react';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { Service, Subservice } from '@/types/services';
import { Switch } from '@/components/ui/switch';

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
  toggleSubserviceActive
}) => {
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
          <div className="flex justify-between items-center mb-2 mt-2">
            <h5 className="text-sm font-medium">Items</h5>
            <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => openAddItemDialog(service.id, subservice.id)}>
              <Plus className="h-3 w-3 mr-1" /> Add Item
            </Button>
          </div>

          {/* Pricing information section - moved from table */}
          <div className="bg-blue-50 p-3 rounded-md mb-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h6 className="text-xs font-medium text-blue-700 mb-1">Standard Pricing</h6>
                <div className="flex gap-4">
                  {subservice.pricePerKg ? (
                    <p className="text-xs">
                      <span className="font-medium">Price/KG:</span> ₹{subservice.pricePerKg}
                    </p>
                  ) : null}
                  {subservice.pricePerItem ? (
                    <p className="text-xs">
                      <span className="font-medium">Price/Item:</span> ₹{subservice.pricePerItem}
                    </p>
                  ) : null}
                </div>
              </div>
              <div>
                <h6 className="text-xs font-medium text-blue-700 mb-1">Express Pricing</h6>
                <div className="flex gap-4">
                  {subservice.pricePerKg ? (
                    <p className="text-xs">
                      <span className="font-medium">Price/KG:</span> ₹{(subservice.pricePerKg * 1.5).toFixed(0)}
                    </p>
                  ) : null}
                  {subservice.pricePerItem ? (
                    <p className="text-xs">
                      <span className="font-medium">Price/Item:</span> ₹{(subservice.pricePerItem * 1.5).toFixed(0)}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          
          {subservice.items.length > 0 ? (
            <div className="space-y-2">
              <div className="grid grid-cols-4 gap-2 px-2 py-1 bg-gray-50 text-xs font-medium">
                <div>Name</div>
                <div className="text-right">Price</div>
                <div className="text-right">Standard Price</div>
                <div className="text-right">Express Price</div>
              </div>
              
              {subservice.items.map(item => (
                <div key={item.id} className="grid grid-cols-4 gap-2 px-2 py-2 border-b text-sm">
                  <div className="flex items-center">
                    {item.name}
                    <Button variant="ghost" size="icon" className="h-6 w-6 ml-2" onClick={() => openEditItemDialog(service.id, subservice.id, item)}>
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="text-right">₹{item.price}</div>
                  <div className="text-right">₹{item.standardPrice || item.price}</div>
                  <div className="text-right flex justify-end items-center gap-2">
                    ₹{item.expressPrice || (item.price * 1.5).toFixed(0)}
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500" onClick={() => deleteItem(service.id, subservice.id, item.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : <p className="text-sm text-gray-500 italic">No items added yet</p>}
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
