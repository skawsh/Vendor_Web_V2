import React, { useState } from 'react';
import { 
  UserCircle, Mail, Phone, MapPin, Building, Calendar, Save, 
  Edit2, User, Store, CreditCard, Building2, Info, LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '+91 98765 43210',
    address: '123 Laundry Lane, Mumbai, Maharashtra',
    studio: 'Skawsh Laundry Studio',
    joinDate: 'January 15, 2023',
    bio: 'Owner of Skawsh Laundry Studio with over 5 years of experience in the laundry industry.',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully', {
      description: 'Your profile information has been saved.',
    });
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleLogout = () => {
    toast.success('Logged out successfully');
    navigate('/'); // Redirect to home page
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-1 flex items-center gap-2">
          <UserCircle className="h-8 w-8 text-primary" />
          Profile
        </h1>
        <p className="text-muted-foreground">Manage your account details</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-2">
              <AvatarImage src="" alt="Profile" />
              <AvatarFallback className="bg-primary text-white text-xl">
                {profileData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <CardTitle>{profileData.name}</CardTitle>
            <CardDescription>{profileData.studio}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{profileData.email}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{profileData.phone}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{profileData.address}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Member since {profileData.joinDate}</span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              onClick={handleEditProfile}
              variant="outline"
              className="w-full"
              disabled={isEditing}
            >
              <Edit2 className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </CardFooter>
        </Card>

        {/* Edit Profile */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your personal information and contact details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studio">Studio Name</Label>
                <Input
                  id="studio"
                  name="studio"
                  value={profileData.studio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="h-20"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            {isEditing && (
              <Button
                onClick={handleSaveProfile}
                className="bg-primary hover:bg-primary/90"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            )}
          </CardFooter>
        </Card>

        {/* Studio Information */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Studio Information</CardTitle>
            <CardDescription>
              Manage your laundry studio details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Basic Information</h3>
                </div>
                <Button variant="ghost" size="icon">
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted/10 rounded-lg">
                <div>
                  <Label>Owner Name</Label>
                  <p className="text-sm font-medium mt-1">Saiteja Reddy</p>
                </div>
                <div>
                  <Label>Contact Phone</Label>
                  <p className="text-sm font-medium mt-1">+91 9876543210</p>
                </div>
                <div>
                  <Label>Email Address</Label>
                  <p className="text-sm font-medium mt-1">saiteja@example.com</p>
                </div>
              </div>
            </div>

            {/* Address Details */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Address Details</h3>
                </div>
                <Button variant="ghost" size="icon">
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted/10 rounded-lg">
                <div>
                  <Label>Street Address</Label>
                  <p className="text-sm font-medium mt-1">123 Laundry Street</p>
                </div>
                <div>
                  <Label>City</Label>
                  <p className="text-sm font-medium mt-1">Hyderabad</p>
                </div>
                <div>
                  <Label>State</Label>
                  <p className="text-sm font-medium mt-1">Telangana</p>
                </div>
                <div>
                  <Label>Zip Code</Label>
                  <p className="text-sm font-medium mt-1">500081</p>
                </div>
              </div>
            </div>

            {/* Business Details */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Business Details</h3>
                </div>
                <Button variant="ghost" size="icon">
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted/10 rounded-lg">
                <div>
                  <Label>Business Name</Label>
                  <p className="text-sm font-medium mt-1">Saiteja Laundry Services</p>
                </div>
                <div>
                  <Label>GST Number</Label>
                  <p className="text-sm font-medium mt-1">22AAAAA0000A1Z5</p>
                </div>
                <div>
                  <Label>Business Type</Label>
                  <p className="text-sm font-medium mt-1">Sole Proprietorship</p>
                </div>
              </div>
            </div>

            {/* Studio Setup */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Store className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Studio Setup</h3>
                </div>
                <Button variant="ghost" size="icon">
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted/10 rounded-lg">
                <div>
                  <Label>Capacity</Label>
                  <p className="text-sm font-medium mt-1">500 kg per day</p>
                </div>
                <div>
                  <Label>Operating Hours</Label>
                  <p className="text-sm font-medium mt-1">9:00 AM to 8:00 PM</p>
                </div>
                <div>
                  <Label>Service Area</Label>
                  <p className="text-sm font-medium mt-1">10 km radius</p>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Payment Details</h3>
                </div>
                <Button variant="ghost" size="icon">
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted/10 rounded-lg">
                <div>
                  <Label>Bank Name</Label>
                  <p className="text-sm font-medium mt-1">Indian Bank</p>
                </div>
                <div>
                  <Label>Account Number</Label>
                  <p className="text-sm font-medium mt-1">XXXX XXXX XXXX 4321</p>
                </div>
                <div>
                  <Label>UPI ID</Label>
                  <p className="text-sm font-medium mt-1">saiteja@upi</p>
                </div>
              </div>
            </div>
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
                      <input 
                        type="checkbox" 
                        id="order-updates" 
                        defaultChecked={true}
                        className="h-4 w-4 rounded border-gray-300"
                      />
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
                      <input 
                        type="checkbox" 
                        id="customer-messages" 
                        defaultChecked={true}
                        className="h-4 w-4 rounded border-gray-300"
                      />
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
                      <input 
                        type="checkbox" 
                        id="marketing" 
                        defaultChecked={false}
                        className="h-4 w-4 rounded border-gray-300"
                      />
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
                  <Button 
                    onClick={() => toast.success('Password updated successfully')}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Update Password
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              variant="destructive" 
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
