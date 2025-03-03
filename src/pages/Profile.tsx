
import React from 'react';
import { UserCircle } from 'lucide-react';

const Profile = () => {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-1 flex items-center gap-2">
          <UserCircle className="h-8 w-8 text-primary" />
          Profile
        </h1>
        <p className="text-muted-foreground">Manage your account details</p>
      </header>

      <div className="bg-white dark:bg-card p-8 rounded-xl border shadow-sm flex flex-col items-center justify-center min-h-[400px]">
        <UserCircle size={64} className="text-muted-foreground mb-4 opacity-20" />
        <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
        <p className="text-muted-foreground text-center max-w-md">
          This page will contain your personal information, account settings, and preferences for the laundry management system.
        </p>
      </div>
    </div>
  );
};

export default Profile;
