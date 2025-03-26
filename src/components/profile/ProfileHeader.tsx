
import React from 'react';
import { UserCircle } from 'lucide-react';

const ProfileHeader: React.FC = () => {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight mb-1 flex items-center gap-2">
        <UserCircle className="h-8 w-8 text-primary" />
        Profile
      </h1>
      <p className="text-muted-foreground">Manage your account details</p>
    </header>
  );
};

export default ProfileHeader;
