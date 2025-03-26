
import React, { useState } from 'react';
import { User, Building2, Scroll, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import StudioInfoCard from '@/components/StudioInfoCard';
import TermsAndConditions from '@/components/legal/TermsAndConditions';
import PrivacyPolicy from '@/components/legal/PrivacyPolicy';

const Profile = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  // Studio Information
  const studioFields = [
    { label: 'Studio Name', value: 'Urban Clean Laundromat', id: 'studioName' },
    { label: 'Owner Name', value: 'John Smith', id: 'ownerName' },
    { label: 'Contact Number', value: '+91 98765 43210', id: 'contactNumber' },
    { label: 'Email', value: 'john@urbanclean.com', id: 'email' },
    { label: 'GST Number', value: 'GSTIN29AAACP3066D1ZQ', id: 'gstNumber' },
    { label: 'Studio ID', value: 'URB1001CLNM', id: 'studioId' },
  ];

  // Account Settings
  const accountFields = [
    { label: 'Username', value: 'john.smith', id: 'username' },
    { label: 'Email', value: 'john@urbanclean.com', id: 'accountEmail' },
    { label: 'Phone', value: '+91 98765 43210', id: 'accountPhone' },
    { label: 'Password', value: '••••••••', id: 'password' },
    { label: 'Two-Factor Authentication', value: 'Disabled', id: 'twoFactor' },
    { label: 'Notification Preferences', value: 'Email, SMS', id: 'notifications' },
  ];

  return (
    <div className="container mx-auto p-4 md:p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-1 flex items-center gap-2">
          <User className="h-8 w-8 text-primary" />
          Profile
        </h1>
        <p className="text-muted-foreground">Manage your account and studio information</p>
      </header>

      <div className="space-y-6">
        {/* Studio Information */}
        <StudioInfoCard 
          title="Studio Information" 
          icon={<Building2 className="h-5 w-5 text-primary" />} 
          fields={studioFields}
        />

        {/* Account Settings */}
        <StudioInfoCard 
          title="Account Settings" 
          icon={<User className="h-5 w-5 text-primary" />} 
          fields={accountFields}
        />
        
        {/* LEGAL Section */}
        <Card className="border shadow-sm overflow-hidden transition-all duration-300">
          <div className="bg-white">
            <div className="flex justify-between items-center p-4">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-base">LEGAL</h3>
              </div>
            </div>
          </div>
          
          <CardContent className="border-t p-4 bg-gray-50">
            <div className="space-y-3">
              <div 
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer transition-colors"
                onClick={() => setShowTerms(true)}
              >
                <Scroll className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Terms and Conditions</span>
              </div>
              
              <div 
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer transition-colors"
                onClick={() => setShowPrivacy(true)}
              >
                <Shield className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Privacy Policy</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Terms and Conditions Dialog */}
      <TermsAndConditions 
        open={showTerms} 
        onOpenChange={setShowTerms} 
      />

      {/* Privacy Policy Dialog */}
      <PrivacyPolicy 
        open={showPrivacy}
        onOpenChange={setShowPrivacy}
      />
    </div>
  );
};

export default Profile;
