
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TermsAndConditionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsDialogProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Terms and Conditions</DialogTitle>
          <DialogDescription>
            Last updated: {new Date().toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4 p-2">
            <h3 className="text-lg font-semibold">1. Acceptance of Terms</h3>
            <p>
              By accessing and using Skawsh Laundry Services ("we," "our," or "us"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
            </p>

            <h3 className="text-lg font-semibold">2. Services Description</h3>
            <p>
              Skawsh Laundry Services provides laundry, dry cleaning, and fabric care services through our network of laundry studios. Our services include washing, drying, folding, ironing, stain removal, and specialized fabric treatments.
            </p>

            <h3 className="text-lg font-semibold">3. Service Orders</h3>
            <p>
              3.1. When placing an order, you must provide accurate and complete information about the items to be cleaned and any special handling instructions.
            </p>
            <p>
              3.2. We reserve the right to refuse service for items that are heavily soiled, contain biohazardous materials, or require specialized treatments beyond our capabilities.
            </p>
            <p>
              3.3. Order cancellations must be made at least 2 hours before scheduled pickup to avoid cancellation fees.
            </p>

            <h3 className="text-lg font-semibold">4. Pricing and Payment</h3>
            <p>
              4.1. Prices for our services are listed on our platform and are subject to change without notice.
            </p>
            <p>
              4.2. Payment is processed at the time of order confirmation via approved payment methods.
            </p>
            <p>
              4.3. Additional charges may apply for expedited service, specialty items, or stain treatments.
            </p>

            <h3 className="text-lg font-semibold">5. Delivery and Pickup</h3>
            <p>
              5.1. We provide pickup and delivery services within our designated service areas during operating hours.
            </p>
            <p>
              5.2. You agree to be available during the selected time slot or make alternative arrangements for item handoff.
            </p>
            <p>
              5.3. Repeated missed pickups or deliveries may result in additional fees.
            </p>

            <h3 className="text-lg font-semibold">6. Item Handling and Liability</h3>
            <p>
              6.1. While we take utmost care in handling your items, we cannot guarantee removal of all stains or prevention of natural wear and tear.
            </p>
            <p>
              6.2. Our liability for damaged or lost items is limited to 10 times the service fee for the specific item.
            </p>
            <p>
              6.3. Items not claimed within 30 days of service completion may be donated to charity.
            </p>

            <h3 className="text-lg font-semibold">7. User Accounts</h3>
            <p>
              7.1. You are responsible for maintaining the confidentiality of your account credentials.
            </p>
            <p>
              7.2. You agree to notify us immediately of any unauthorized use of your account.
            </p>

            <h3 className="text-lg font-semibold">8. Termination</h3>
            <p>
              We reserve the right to terminate or suspend your access to our services for violation of these terms or for any other reason at our discretion.
            </p>

            <h3 className="text-lg font-semibold">9. Changes to Terms</h3>
            <p>
              We may modify these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.
            </p>

            <h3 className="text-lg font-semibold">10. Governing Law</h3>
            <p>
              These terms shall be governed by and construed in accordance with the laws of the state/province where our headquarters are located, without regard to conflict of law principles.
            </p>

            <h3 className="text-lg font-semibold">11. Contact Information</h3>
            <p>
              For questions regarding these Terms and Conditions, please contact us at legal@skawsh.com or call our customer support at +91 98765 12345.
            </p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TermsAndConditions;
