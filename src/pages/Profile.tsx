import React, { useState } from 'react';
import { UserCircle, Mail, Phone, MapPin, Building, Calendar, Save, Edit2, User, LogOut, Pencil, X, ChevronDown, ChevronRight, Building2, Store, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useAuth } from '@/context/AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '+91 98765 43210',
    address: '123 Laundry Lane, Mumbai, Maharashtra',
    studio: 'Skawsh Laundry Studio',
    joinDate: 'January 15, 2023'
  });

  const [studioInfo, setStudioInfo] = useState({
    basic: {
      ownerName: 'Saiteja Samala',
      studioName: 'Saiteja Laundry',
      emailAddress: 'saitejasamala0808@gmail.com',
      primaryNumber: '8099830308',
      secondaryNumber: '9000135876',
      isEditing: false
    },
    address: {
      streetAddress: '1-23/45, Main Street',
      city: 'Hyderabad',
      state: 'Telangana',
      zipCode: '500081',
      latitude: '17.3850',
      longitude: '78.4867',
      isEditing: false
    },
    business: {
      businessName: 'Saiteja Laundry Services',
      businessRegistrationNumber: 'UADJFDFJ4427287',
      gstNumber: 'GST9876541',
      panNumber: 'ABCDE1234F',
      openingTime: '09:00 AM',
      closingTime: '09:00 PM',
      priceAdjustment: '10%',
      isEditing: false
    },
    studio: {
      numberOfEmployees: '2',
      dailyCapacity: '100',
      specialEquipment: 'Special dry cleaning',
      selectedWashCategory: 'Standard Wash, Express Wash',
      isEditing: false
    },
    payment: {
      accountHolderName: 'Saiteja Samala',
      bankName: 'HDFC',
      accountNumber: '50107846646453',
      ifscCode: 'HDFC00236898',
      branchName: 'Gachibowli Phase-2',
      upiId: 'saitejasamala@upi',
      selectedPaymentSchedule: 'Daily Payment',
      isEditing: false
    }
  });
  const [expandedInfoSections, setExpandedInfoSections] = useState<Record<string, boolean>>({
    'basic': false,
    'address': false,
    'business': false,
    'studio': false,
    'payment': false
  });

  const handleInputChange = e => {
    const {
      name,
      value
    } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully', {
      description: 'Your profile information has been saved.'
    });
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const toggleEditSection = (section: keyof typeof studioInfo) => {
    setStudioInfo(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        isEditing: !prev[section].isEditing
      }
    }));
  };

  const handleInfoChange = (section: keyof typeof studioInfo, field: string, value: string) => {
    setStudioInfo(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const saveInfoChanges = (section: keyof typeof studioInfo) => {
    setStudioInfo(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        isEditing: false
      }
    }));
    toast.success(`${section.charAt(0).toUpperCase() + section.slice(1)} information updated successfully`);
  };

  const cancelInfoEdit = (section: keyof typeof studioInfo) => {
    setStudioInfo(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        isEditing: false
      }
    }));
    toast.info('Edit canceled');
  };

  const toggleInfoSection = (section: string) => {
    setExpandedInfoSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return <div className="container mx-auto p-4 md:p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-1 flex items-center gap-2">
          <UserCircle className="h-8 w-8 text-primary" />
          Profile
        </h1>
        <p className="text-muted-foreground">Manage your account details</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        

        {/* Edit Profile */}
        <Card className="md:col-span-2">
          
          
          
        </Card>

        {/* Studio Information Section - Moved from Settings */}
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

        {/* Account Settings */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account preferences and settings</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="notifications" className="w-full">
              <TabsList>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              <TabsContent value="notifications" className="space-y-4 mt-4">
                <h3 className="text-lg font-medium">Notification Preferences</h3>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">Order Updates</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications when order status changes
                      </p>
                    </div>
                    <div>
                      <input type="checkbox" id="order-updates" defaultChecked={true} className="h-4 w-4 rounded border-gray-300" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">Customer Messages</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications for new customer inquiries
                      </p>
                    </div>
                    <div>
                      <input type="checkbox" id="customer-messages" defaultChecked={true} className="h-4 w-4 rounded border-gray-300" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">Marketing Updates</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive promotional offers and news
                      </p>
                    </div>
                    <div>
                      <input type="checkbox" id="marketing" defaultChecked={false} className="h-4 w-4 rounded border-gray-300" />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="security" className="space-y-4 mt-4">
                <h3 className="text-lg font-medium">Security Settings</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button onClick={() => toast.success('Password updated successfully')} className="bg-primary hover:bg-primary/90">
                    Update Password
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="destructive" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>;
};

export default Profile;
