
import React from 'react';
import { User, MapPin, Building2, Store, CreditCard, Pencil, X, ChevronDown, ChevronRight, Save } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

// Define the structure of the studioInfo object
interface StudioInfo {
  basic: {
    ownerName: string;
    studioName: string;
    emailAddress: string;
    primaryNumber: string;
    secondaryNumber: string;
    isEditing: boolean;
  };
  address: {
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    latitude: string;
    longitude: string;
    isEditing: boolean;
  };
  business: {
    businessName: string;
    businessRegistrationNumber: string;
    gstNumber: string;
    panNumber: string;
    openingTime: string;
    closingTime: string;
    priceAdjustment: string;
    isEditing: boolean;
  };
  studio: {
    numberOfEmployees: string;
    dailyCapacity: string;
    specialEquipment: string;
    selectedWashCategory: string;
    isEditing: boolean;
  };
  payment: {
    accountHolderName: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    branchName: string;
    upiId: string;
    selectedPaymentSchedule: string;
    isEditing: boolean;
  };
}

interface StudioInfoSectionProps {
  studioInfo: StudioInfo;
  expandedInfoSections: Record<string, boolean>;
  toggleInfoSection: (section: string) => void;
  toggleEditSection: (section: keyof StudioInfo) => void;
  handleInfoChange: (section: keyof StudioInfo, field: string, value: string) => void;
  saveInfoChanges: (section: keyof StudioInfo) => void;
  cancelInfoEdit: (section: keyof StudioInfo) => void;
}

const StudioInfoSection: React.FC<StudioInfoSectionProps> = ({
  studioInfo,
  expandedInfoSections,
  toggleInfoSection,
  toggleEditSection,
  handleInfoChange,
  saveInfoChanges,
  cancelInfoEdit
}) => {
  return (
    <Card className="md:col-span-3">
      <CardHeader>
        <CardTitle>Studio Information</CardTitle>
        <CardDescription>Manage your studio's business information and details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Basic Information */}
        <Card className="border shadow-sm">
          <Collapsible open={expandedInfoSections['basic']} className="w-full">
            <CollapsibleTrigger onClick={() => toggleInfoSection('basic')} className="w-full">
              <div className="flex justify-between items-center p-4 hover:bg-gray-50 transition w-full">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold text-base">Basic Information</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={e => {
                    e.stopPropagation();
                    toggleEditSection('basic');
                  }}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  {expandedInfoSections['basic'] ? <ChevronDown className="h-5 w-5 text-muted-foreground" /> : <ChevronRight className="h-5 w-5 text-muted-foreground" />}
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="border-t">
              <div className="p-4 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Owner Name</Label>
                    {studioInfo.basic.isEditing ? <Input value={studioInfo.basic.ownerName} onChange={e => handleInfoChange('basic', 'ownerName', e.target.value)} className="mt-1" /> : <p className="text-sm font-medium">{studioInfo.basic.ownerName}</p>}
                  </div>
                  <div>
                    <Label>Studio Name</Label>
                    {studioInfo.basic.isEditing ? <Input value={studioInfo.basic.studioName} onChange={e => handleInfoChange('basic', 'studioName', e.target.value)} className="mt-1" /> : <p className="text-sm font-medium">{studioInfo.basic.studioName}</p>}
                  </div>
                  <div>
                    <Label>Email</Label>
                    {studioInfo.basic.isEditing ? <Input value={studioInfo.basic.emailAddress} onChange={e => handleInfoChange('basic', 'emailAddress', e.target.value)} className="mt-1" /> : <p className="text-sm font-medium">{studioInfo.basic.emailAddress}</p>}
                  </div>
                  <div>
                    <Label>Primary Number</Label>
                    {studioInfo.basic.isEditing ? <Input value={studioInfo.basic.primaryNumber} onChange={e => handleInfoChange('basic', 'primaryNumber', e.target.value)} className="mt-1" /> : <p className="text-sm font-medium">{studioInfo.basic.primaryNumber}</p>}
                  </div>
                  <div>
                    <Label>Secondary Number</Label>
                    {studioInfo.basic.isEditing ? <Input value={studioInfo.basic.secondaryNumber} onChange={e => handleInfoChange('basic', 'secondaryNumber', e.target.value)} className="mt-1" /> : <p className="text-sm font-medium">{studioInfo.basic.secondaryNumber}</p>}
                  </div>
                </div>
                {studioInfo.basic.isEditing && <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={() => cancelInfoEdit('basic')}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button size="sm" onClick={() => saveInfoChanges('basic')}>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                </div>}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Address Details */}
        <Card className="border shadow-sm">
          <Collapsible open={expandedInfoSections['address']} className="w-full">
            <CollapsibleTrigger onClick={() => toggleInfoSection('address')} className="w-full">
              <div className="flex justify-between items-center p-4 hover:bg-gray-50 transition w-full">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold text-base">Address Details</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={e => {
                    e.stopPropagation();
                    toggleEditSection('address');
                  }}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  {expandedInfoSections['address'] ? <ChevronDown className="h-5 w-5 text-muted-foreground" /> : <ChevronRight className="h-5 w-5 text-muted-foreground" />}
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="border-t">
              <div className="p-4 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Street</Label>
                    {studioInfo.address.isEditing ? <Input value={studioInfo.address.streetAddress} onChange={e => handleInfoChange('address', 'streetAddress', e.target.value)} className="mt-1" /> : <p className="text-sm font-medium">{studioInfo.address.streetAddress}</p>}
                  </div>
                  <div>
                    <Label>City</Label>
                    {studioInfo.address.isEditing ? <Input value={studioInfo.address.city} onChange={e => handleInfoChange('address', 'city', e.target.value)} className="mt-1" /> : <p className="text-sm font-medium">{studioInfo.address.city}</p>}
                  </div>
                  <div>
                    <Label>State</Label>
                    {studioInfo.address.isEditing ? <Input value={studioInfo.address.state} onChange={e => handleInfoChange('address', 'state', e.target.value)} className="mt-1" /> : <p className="text-sm font-medium">{studioInfo.address.state}</p>}
                  </div>
                  <div>
                    <Label>Postal Code</Label>
                    {studioInfo.address.isEditing ? <Input value={studioInfo.address.zipCode} onChange={e => handleInfoChange('address', 'zipCode', e.target.value)} className="mt-1" /> : <p className="text-sm font-medium">{studioInfo.address.zipCode}</p>}
                  </div>
                  <div>
                    <Label>Latitude</Label>
                    {studioInfo.address.isEditing ? <Input value={studioInfo.address.latitude} onChange={e => handleInfoChange('address', 'latitude', e.target.value)} className="mt-1" /> : <p className="text-sm font-medium">{studioInfo.address.latitude}</p>}
                  </div>
                  <div>
                    <Label>Longitude</Label>
                    {studioInfo.address.isEditing ? <Input value={studioInfo.address.longitude} onChange={e => handleInfoChange('address', 'longitude', e.target.value)} className="mt-1" /> : <p className="text-sm font-medium">{studioInfo.address.longitude}</p>}
                  </div>
                </div>
                {studioInfo.address.isEditing && <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={() => cancelInfoEdit('address')}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button size="sm" onClick={() => saveInfoChanges('address')}>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                </div>}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Business Details */}
        <Card className="border shadow-sm">
          <Collapsible open={expandedInfoSections['business']} className="w-full">
            <CollapsibleTrigger onClick={() => toggleInfoSection('business')} className="w-full">
              <div className="flex justify-between items-center p-4 hover:bg-gray-50 transition w-full">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold text-base">Business Details</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={e => {
                    e.stopPropagation();
                    toggleEditSection('business');
                  }}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  {expandedInfoSections['business'] ? <ChevronDown className="h-5 w-5 text-muted-foreground" /> : <ChevronRight className="h-5 w-5 text-muted-foreground" />}
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="border-t">
              <div className="p-4 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Business Registration Number</Label>
                    {studioInfo.business.isEditing ? <Input value={studioInfo.business.businessRegistrationNumber} onChange={e => handleInfoChange('business', 'businessRegistrationNumber', e.target.value)} className="mt-1" /> : <p className="text-sm font-medium">{studioInfo.business.businessRegistrationNumber}</p>}
                  </div>
                  <div>
                    <Label>GST/VAT Number</Label>
                    {studioInfo.business.isEditing ? <Input value={studioInfo.business.gstNumber} onChange={e => handleInfoChange('business', 'gstNumber', e.target.value)} className="mt-1" /> : <p className="text-sm font-medium">{studioInfo.business.gstNumber}</p>}
                  </div>
                  <div>
                    <Label>PAN Number</Label>
                    {studioInfo.business.isEditing ? <Input value={studioInfo.business.panNumber} onChange={e => handleInfoChange('business', 'panNumber', e.target.value)} className="mt-1" /> : <p className="text-sm font-medium">{studioInfo.business.panNumber}</p>}
                  </div>
                  <div>
                    <Label>Opening Time</Label>
                    {studioInfo.business.isEditing ? <Input value={studioInfo.business.openingTime} onChange={e => handleInfoChange('business', 'openingTime', e.target.value)} className="mt-1" /> : <p className="text-sm font-medium">{studioInfo.business.openingTime}</p>}
                  </div>
                  <div>
                    <Label>Closing Time</Label>
                    {studioInfo.business.isEditing ? <Input value={studioInfo.business.closingTime} onChange={e => handleInfoChange('business', 'closingTime', e.target.value)} className="mt-1" /> : <p className="text-sm font-medium">{studioInfo.business.closingTime}</p>}
                  </div>
                  <div>
                    <Label>Price Adjustment %</Label>
                    {studioInfo.business.isEditing ? <Input value={studioInfo.business.priceAdjustment} onChange={e => handleInfoChange('business', 'priceAdjustment', e.target.value)} className="mt-1" /> : <p className="text-sm font-medium">{studioInfo.business.priceAdjustment}</p>}
                  </div>
                </div>
                {studioInfo.business.isEditing && <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={() => cancelInfoEdit('business')}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button size="sm" onClick={() => saveInfoChanges('business')}>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                </div>}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Studio Setup */}
        <Card className="border shadow-sm">
          <Collapsible open={expandedInfoSections['studio']} className="w-full">
            <CollapsibleTrigger onClick={() => toggleInfoSection('studio')} className="w-full">
              <div className="flex justify-between items-center p-4 hover:bg-gray-50 transition w-full">
                <div className="flex items-center gap-3">
                  <Store className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold text-base">Studio Setup</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={e => {
                    e.stopPropagation();
                    toggleEditSection('studio');
                  }}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  {expandedInfoSections['studio'] ? <ChevronDown className="h-5 w-5 text-muted-foreground" /> : <ChevronRight className="h-5 w-5 text-muted-foreground" />}
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="border-t">
              <div className="p-4 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Number of Employees</Label>
                    {studioInfo.studio.isEditing ? <Input value={studioInfo.studio.numberOfEmployees} onChange={e => handleInfoChange('studio', 'numberOfEmployees', e.target.value)} className="mt-1" /> : <p className="text-sm font-medium">{studioInfo.studio.numberOfEmployees}</p>}
                  </div>
                  <div>
                    <Label>Daily Capacity (In KG's)</Label>
                    {studioInfo.studio.isEditing ? <Input value={studioInfo.studio.dailyCapacity} onChange={e => handleInfoChange('studio', 'dailyCapacity', e.target.value)} className="mt-1" /> : <p className="text-sm font-medium">{studioInfo.studio.dailyCapacity}</p>}
                  </div>
                  <div>
                    <Label>Special Equipment</Label>
                    {studioInfo.studio.isEditing ? <Input value={studioInfo.studio.specialEquipment} onChange={e => handleInfoChange('studio', 'specialEquipment', e.target.value)} className="mt-1" /> : <p className="text-sm font-medium">{studioInfo.studio.specialEquipment}</p>}
                  </div>
                  <div>
                    <Label>Selected Wash Category</Label>
                    {studioInfo.studio.isEditing ? <Input value={studioInfo.studio.selectedWashCategory} onChange={e => handleInfoChange('studio', 'selectedWashCategory', e.target.value)} className="mt-1" /> : <p className="text-sm font-medium">{studioInfo.studio.selectedWashCategory}</p>}
                  </div>
                </div>
                {studioInfo.studio.isEditing && <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={() => cancelInfoEdit('studio')}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button size="sm" onClick={() => saveInfoChanges('studio')}>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                </div>}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Payment Details */}
        <Card className="border shadow-sm">
          <Collapsible open={expandedInfoSections['payment']} className="w-full">
            <CollapsibleTrigger onClick={() => toggleInfoSection('payment')} className="w-full">
              <div className="flex justify-between items-center p-4 hover:bg-gray-50 transition w-full">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold text-base">Payment Details</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={e => {
                    e.stopPropagation();
                    toggleEditSection('payment');
                  }}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  {expandedInfoSections['payment'] ? <ChevronDown className="h-5 w-5 text-muted-foreground" /> : <ChevronRight className="h-5 w-5 text-muted-foreground" />}
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="border-t">
              <div className="p-4 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Account Holder Name</Label>
                    {studioInfo.payment.isEditing ? <Input value={studioInfo.payment.accountHolderName} onChange={e => handleInfoChange('payment', 'accountHolderName', e.target.value)} className="mt-1" /> : <p className="text-sm font-medium">{studioInfo.payment.accountHolderName}</p>}
                  </div>
                  <div>
                    <Label>Bank Name</Label>
                    {studioInfo.payment.isEditing ? <Input value={studioInfo.payment.bankName} onChange={e => handleInfoChange('payment', 'bankName', e.target.value)} className="mt-1" /> : <p className="text-sm font-medium">{studioInfo.payment.bankName}</p>}
                  </div>
                  <div>
                    <Label>Account Number</Label>
                    {studioInfo.payment.isEditing ? <Input value={studioInfo.payment.accountNumber} onChange={e => handleInfoChange('payment', 'accountNumber', e.target.value)} className="mt-1" /> : <p className="text-sm font-medium">{studioInfo.payment.accountNumber}</p>}
                  </div>
                  <div>
                    <Label>IFSC Code</Label>
                    {studioInfo.payment.isEditing ? <Input value={studioInfo.payment.ifscCode} onChange={e => handleInfoChange('payment', 'ifscCode', e.target.value)} className="mt-1" /> : <p className="text-sm font-medium">{studioInfo.payment.ifscCode}</p>}
                  </div>
                  <div>
                    <Label>Branch Name</Label>
                    {studioInfo.payment.isEditing ? <Input value={studioInfo.payment.branchName} onChange={e => handleInfoChange('payment', 'branchName', e.target.value)} className="mt-1" /> : <p className="text-sm font-medium">{studioInfo.payment.branchName}</p>}
                  </div>
                  <div>
                    <Label>UPI ID</Label>
                    {studioInfo.payment.isEditing ? <Input value={studioInfo.payment.upiId} onChange={e => handleInfoChange('payment', 'upiId', e.target.value)} className="mt-1" /> : <p className="text-sm font-medium">{studioInfo.payment.upiId}</p>}
                  </div>
                  <div>
                    <Label>Selected Payment Schedule</Label>
                    {studioInfo.payment.isEditing ? <Input value={studioInfo.payment.selectedPaymentSchedule} onChange={e => handleInfoChange('payment', 'selectedPaymentSchedule', e.target.value)} className="mt-1" /> : <p className="text-sm font-medium">{studioInfo.payment.selectedPaymentSchedule}</p>}
                  </div>
                </div>
                {studioInfo.payment.isEditing && <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={() => cancelInfoEdit('payment')}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button size="sm" onClick={() => saveInfoChanges('payment')}>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                </div>}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      </CardContent>
    </Card>
  );
};

export default StudioInfoSection;
