
import React from 'react';
import { DollarSign } from 'lucide-react';

const Revenue = () => {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-1 flex items-center gap-2">
          <DollarSign className="h-8 w-8 text-primary" />
          Revenue
        </h1>
        <p className="text-muted-foreground">Manage your revenue and financial analytics</p>
      </header>

      <div className="bg-white dark:bg-card p-8 rounded-xl border shadow-sm flex flex-col items-center justify-center min-h-[400px]">
        <DollarSign size={64} className="text-muted-foreground mb-4 opacity-20" />
        <h2 className="text-xl font-semibold mb-2">Revenue Management</h2>
        <p className="text-muted-foreground text-center max-w-md">
          This page will contain your financial analytics, revenue reports, and payment processing information.
        </p>
      </div>
    </div>
  );
};

export default Revenue;
