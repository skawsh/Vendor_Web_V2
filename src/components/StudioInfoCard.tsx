
import React, { useState, useEffect } from 'react';
import { User, MapPin, Building2, Store, CreditCard, ChevronUp, ChevronDown, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface StudioInfoCardProps {
  title: string;
  icon: React.ReactNode;
  fields: { label: string; value: string; id: string }[];
}

const StudioInfoCard = ({ title, icon, fields }: StudioInfoCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Create the initial data structure from fields
  const initialFieldValues = fields.reduce((acc, field) => ({ ...acc, [field.id]: field.value }), {});
  
  // State for the form data (what's currently being edited)
  const [formData, setFormData] = useState<Record<string, string>>(initialFieldValues);
  
  // State for the saved data (what's been committed)
  const [savedData, setSavedData] = useState<Record<string, string>>(initialFieldValues);

  // Handle clicks on the card header to expand/collapse
  const toggleExpand = (e: React.MouseEvent) => {
    if (isEditing) return; // Don't toggle when editing
    setIsExpanded(!isExpanded);
  };

  // Start editing mode
  const startEditing = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Copy the current saved data to form data for editing
    setFormData({...savedData});
    setIsEditing(true);
    // Ensure the card is expanded when editing
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  // Cancel editing and revert changes
  const cancelEditing = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Revert form data to the last saved state
    setFormData({...savedData});
    setIsEditing(false);
  };

  // Handle input field changes
  const handleInputChange = (id: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Save the edited changes
  const saveChanges = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Update the saved data with current form values
    setSavedData({...formData});
    setIsEditing(false);
    toast.success(`${title} information updated successfully`);
  };

  return (
    <Card className="border shadow-sm overflow-hidden transition-all duration-300">
      <div 
        onClick={toggleExpand}
        className={`cursor-pointer bg-white hover:bg-gray-50 ${isEditing ? 'pointer-events-none' : ''}`}
      >
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-3">
            {icon}
            <h3 className="font-semibold text-base">{title}</h3>
          </div>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                <Button 
                  onClick={cancelEditing}
                  variant="outline"
                  size="sm"
                  className="h-8 flex items-center gap-1"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
                <Button 
                  onClick={saveChanges}
                  size="sm"
                  className="h-8 flex items-center gap-1"
                >
                  <Save className="h-4 w-4" />
                  Save
                </Button>
              </div>
            ) : (
              <Button 
                onClick={startEditing}
                variant="outline"
                size="sm"
                className="h-8"
              >
                Edit
              </Button>
            )}
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <CardContent className="border-t p-4 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.id} className={isEditing ? "space-y-2" : ""}>
                <Label htmlFor={field.id}>{field.label}</Label>
                {isEditing ? (
                  <Input
                    id={field.id}
                    value={formData[field.id]}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-sm font-medium">{savedData[field.id]}</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default StudioInfoCard;
