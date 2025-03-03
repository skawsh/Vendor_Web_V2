
import React from 'react';
import { HelpCircle } from 'lucide-react';

const Support = () => {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-1 flex items-center gap-2">
          <HelpCircle className="h-8 w-8 text-primary" />
          Support
        </h1>
        <p className="text-muted-foreground">Get help and assistance</p>
      </header>

      <div className="bg-white dark:bg-card p-8 rounded-xl border shadow-sm flex flex-col items-center justify-center min-h-[400px]">
        <HelpCircle size={64} className="text-muted-foreground mb-4 opacity-20" />
        <h2 className="text-xl font-semibold mb-2">Customer Support</h2>
        <p className="text-muted-foreground text-center max-w-md">
          This page will contain support tickets, FAQs, and contact information for getting help with your laundry management system.
        </p>
      </div>
    </div>
  );
};

export default Support;
