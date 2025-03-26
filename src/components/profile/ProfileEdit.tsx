
import React from 'react';
import { UserCircle, Mail, Phone, MapPin, Building, Calendar, Save, Edit2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfileEditProps {
  isEditing: boolean;
  profileData: {
    name: string;
    email: string;
    phone: string;
    address: string;
    studio: string;
    joinDate: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveProfile: () => void;
  handleEditProfile: () => void;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ 
  isEditing, 
  profileData, 
  handleInputChange, 
  handleSaveProfile, 
  handleEditProfile 
}) => {
  return (
    <Card className="md:col-span-2">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-shrink-0">
            <Avatar className="h-28 w-28">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt={profileData.name} />
              <AvatarFallback>{profileData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{profileData.name}</h2>
                <p className="text-muted-foreground">{profileData.studio}</p>
              </div>
              {isEditing ? (
                <Button onClick={handleSaveProfile} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save
                </Button>
              ) : (
                <Button variant="outline" onClick={handleEditProfile} className="flex items-center gap-2">
                  <Edit2 className="h-4 w-4" />
                  Edit
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <UserCircle className="h-4 w-4 text-muted-foreground" />
                  Full Name
                </Label>
                {isEditing ? (
                  <Input name="name" value={profileData.name} onChange={handleInputChange} />
                ) : (
                  <p className="text-sm">{profileData.name}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  Email
                </Label>
                {isEditing ? (
                  <Input name="email" type="email" value={profileData.email} onChange={handleInputChange} />
                ) : (
                  <p className="text-sm">{profileData.email}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  Phone
                </Label>
                {isEditing ? (
                  <Input name="phone" value={profileData.phone} onChange={handleInputChange} />
                ) : (
                  <p className="text-sm">{profileData.phone}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  Address
                </Label>
                {isEditing ? (
                  <Input name="address" value={profileData.address} onChange={handleInputChange} />
                ) : (
                  <p className="text-sm">{profileData.address}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  Studio Name
                </Label>
                {isEditing ? (
                  <Input name="studio" value={profileData.studio} onChange={handleInputChange} />
                ) : (
                  <p className="text-sm">{profileData.studio}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  Join Date
                </Label>
                <p className="text-sm">{profileData.joinDate}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileEdit;
