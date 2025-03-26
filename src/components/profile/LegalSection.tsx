
import React from 'react';
import { FileText, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const LegalSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card className="md:col-span-3">
      <CardHeader>
        <CardTitle>LEGAL</CardTitle>
        <CardDescription>View legal documents and policies</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={() => navigate('/terms-and-conditions')}
            className="flex items-center gap-3 p-4 rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <FileText className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-semibold">Terms and Conditions</h3>
              <p className="text-sm text-muted-foreground">View our service terms and conditions</p>
            </div>
          </button>

          <button 
            onClick={() => navigate('/privacy-policy')}
            className="flex items-center gap-3 p-4 rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <Shield className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-semibold">Privacy Policy</h3>
              <p className="text-sm text-muted-foreground">Learn how we handle your data</p>
            </div>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LegalSection;
