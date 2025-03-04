
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Plus, Minus, ChevronDown, ChevronUp, Edit, Trash2 } from "lucide-react";

// Mock data for laundry services
const laundryServices = [
  {
    id: 1,
    name: "Wash & Fold",
    subServices: [
      {
        id: 11,
        name: "Regular Wash",
        price: 100,
        clothingItems: [
          { id: 111, name: "T-shirt" },
          { id: 112, name: "Jeans" },
          { id: 113, name: "Towel" },
          { id: 114, name: "Bedsheet" },
        ]
      },
      {
        id: 12,
        name: "Premium Wash",
        price: 150,
        clothingItems: [
          { id: 121, name: "Shirt" },
          { id: 122, name: "Pants" },
          { id: 123, name: "Sweater" },
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Dry Clean",
    subServices: [
      {
        id: 21,
        name: "Regular Dry Clean",
        price: 200,
        clothingItems: [
          { id: 211, name: "Suit" },
          { id: 212, name: "Blazer" },
          { id: 213, name: "Winter Coat" },
        ]
      },
      {
        id: 22,
        name: "Premium Dry Clean",
        price: 300,
        clothingItems: [
          { id: 221, name: "Wedding Dress" },
          { id: 222, name: "Tuxedo" },
          { id: 223, name: "Ball Gown" },
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Wash & Iron",
    subServices: [
      {
        id: 31,
        name: "Standard Iron",
        price: 120,
        clothingItems: [
          { id: 311, name: "Shirt" },
          { id: 312, name: "Trousers" },
          { id: 313, name: "T-shirt" },
        ]
      },
      {
        id: 32,
        name: "Premium Press",
        price: 180,
        clothingItems: [
          { id: 321, name: "Formal Shirt" },
          { id: 322, name: "Dress Pants" },
          { id: 323, name: "Dress" },
        ]
      }
    ]
  }
];

const Settings = () => {
  // State to track expanded services and subservices
  const [expandedServices, setExpandedServices] = useState<number[]>([]);
  const [expandedSubServices, setExpandedSubServices] = useState<number[]>([]);
  const [expandedClothingSections, setExpandedClothingSections] = useState<number[]>([]);

  // Toggle service expansion
  const toggleService = (serviceId: number) => {
    setExpandedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId) 
        : [...prev, serviceId]
    );
  };

  // Toggle subservice expansion
  const toggleSubService = (subServiceId: number) => {
    setExpandedSubServices(prev => 
      prev.includes(subServiceId) 
        ? prev.filter(id => id !== subServiceId) 
        : [...prev, subServiceId]
    );
  };

  // Toggle clothing section expansion
  const toggleClothingSection = (subServiceId: number) => {
    setExpandedClothingSections(prev => 
      prev.includes(subServiceId) 
        ? prev.filter(id => id !== subServiceId) 
        : [...prev, subServiceId]
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Laundry Services Settings</h1>
      
      <div className="grid grid-cols-1 gap-6">
        <SectionCard title="Services">
          <div className="space-y-4">
            {laundryServices.map(service => (
              <ServiceItem 
                key={service.id}
                service={service}
                isExpanded={expandedServices.includes(service.id)}
                onToggle={() => toggleService(service.id)}
                expandedSubServices={expandedSubServices}
                toggleSubService={toggleSubService}
                expandedClothingSections={expandedClothingSections}
                toggleClothingSection={toggleClothingSection}
              />
            ))}
            <Button className="w-full mt-4 flex items-center justify-center gap-2">
              <Plus size={16} /> Add New Service
            </Button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

// Section Card Component
const SectionCard = ({ title, children }) => (
  <Card className="w-full">
    <CardHeader className="pb-2">
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

// Service Item Component
const ServiceItem = ({ 
  service, 
  isExpanded, 
  onToggle, 
  expandedSubServices, 
  toggleSubService,
  expandedClothingSections,
  toggleClothingSection
}) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Collapsible open={isExpanded}>
        <CollapsibleTrigger className="flex w-full justify-between items-center p-4 bg-slate-50 hover:bg-slate-100">
          <span className="font-medium">{service.name}</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                <Edit size={15} />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full text-red-500">
                <Trash2 size={15} />
              </Button>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </Button>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4 bg-white border-t">
          <div className="space-y-3">
            {service.subServices.map(subService => (
              <SubserviceItem 
                key={subService.id}
                subService={subService}
                isExpanded={expandedSubServices.includes(subService.id)}
                onToggle={() => toggleSubService(subService.id)}
                isClothingSectionExpanded={expandedClothingSections.includes(subService.id)}
                toggleClothingSection={() => toggleClothingSection(subService.id)}
              />
            ))}
            <Button variant="outline" className="w-full mt-2 flex items-center justify-center gap-2">
              <Plus size={16} /> Add Sub-service
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

// Subservice Item Component
const SubserviceItem = ({ 
  subService, 
  isExpanded, 
  onToggle,
  isClothingSectionExpanded,
  toggleClothingSection
}) => {
  return (
    <div className="border rounded-lg overflow-hidden ml-4">
      <Collapsible open={isExpanded}>
        <CollapsibleTrigger className="flex w-full justify-between items-center p-3 bg-slate-50 hover:bg-slate-100">
          <span className="font-medium">{subService.name}</span>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">₹{subService.price}</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-7 w-7 rounded-full">
                <Edit size={14} />
              </Button>
              <Button variant="outline" size="icon" className="h-7 w-7 rounded-full text-red-500">
                <Trash2 size={14} />
              </Button>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7 p-0">
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </Button>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="p-3 bg-white border-t">
          <div className="space-y-3">
            <div className="border rounded-lg overflow-hidden">
              <Collapsible open={isClothingSectionExpanded}>
                <CollapsibleTrigger className="flex w-full justify-between items-center p-2 bg-gray-100 hover:bg-gray-200">
                  <span className="font-medium text-sm">Clothing Items</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                    {isClothingSectionExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="p-2 bg-white border-t">
                  <div className="space-y-2">
                    {subService.clothingItems.map(item => (
                      <ClothingItem key={item.id} item={item} />
                    ))}
                    <Button variant="outline" className="w-full mt-2 flex items-center justify-center gap-2 text-xs py-1">
                      <Plus size={14} /> Add Clothing Item
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

// Clothing Item Component
const ClothingItem = ({ item }) => {
  return (
    <div className="flex justify-between items-center p-2 border rounded-md bg-gray-50">
      <span className="text-sm">{item.name}</span>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="h-6 w-6 rounded-full">
          <Edit size={12} />
        </Button>
        <Button variant="outline" size="icon" className="h-6 w-6 rounded-full text-red-500">
          <Trash2 size={12} />
        </Button>
      </div>
    </div>
  );
};

export default Settings;
