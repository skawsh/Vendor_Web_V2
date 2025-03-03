
import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-1 flex items-center gap-2">
          <SettingsIcon className="h-8 w-8 text-primary" />
          Settings
        </h1>
        <p className="text-muted-foreground">Configure your application preferences</p>
      </header>

      <div className="bg-white dark:bg-card p-8 rounded-xl border shadow-sm flex flex-col items-center justify-center min-h-[400px]">
        <SettingsIcon size={64} className="text-muted-foreground mb-4 opacity-20" />
        <h2 className="text-xl font-semibold mb-2">System Settings</h2>
        <p className="text-muted-foreground text-center max-w-md">
          This page will contain various configuration options for your laundry management system, including notifications, display preferences, and integrations.
        </p>
      </div>
    </div>
  );
};

export default Settings;
