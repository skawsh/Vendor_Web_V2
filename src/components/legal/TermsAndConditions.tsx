
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';

interface TermsAndConditionsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ open, onOpenChange }) => {
  const navigate = useNavigate();
  
  // Navigate to the dedicated page when opened
  React.useEffect(() => {
    if (open) {
      onOpenChange(false); // Close dialog
      navigate('/terms-and-conditions'); // Navigate to page
    }
  }, [open, navigate, onOpenChange]);

  // This component still exists for backward compatibility
  // but now it just redirects to the page instead of showing a dialog
  return null;
};

export default TermsAndConditions;
