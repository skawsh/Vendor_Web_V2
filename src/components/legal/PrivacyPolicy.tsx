
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';

interface PrivacyPolicyProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ open, onOpenChange }) => {
  const navigate = useNavigate();
  
  // Navigate to the dedicated page when opened
  React.useEffect(() => {
    if (open) {
      onOpenChange(false); // Close dialog
      navigate('/privacy-policy'); // Navigate to page
    }
  }, [open, navigate, onOpenChange]);

  // This component still exists for backward compatibility
  // but now it just redirects to the page instead of showing a dialog
  return null;
};

export default PrivacyPolicy;
