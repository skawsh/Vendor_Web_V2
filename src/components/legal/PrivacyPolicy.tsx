
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PrivacyPolicyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyDialogProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Privacy Policy</DialogTitle>
          <DialogDescription>
            Last updated: {new Date().toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4 p-2">
            <h3 className="text-lg font-semibold">1. Introduction</h3>
            <p>
              Skawsh Laundry Services ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our laundry services, mobile application, and website.
            </p>

            <h3 className="text-lg font-semibold">2. Information We Collect</h3>
            <p>
              2.1. <span className="font-medium">Personal Information:</span> Name, email address, phone number, billing address, delivery address, payment information.
            </p>
            <p>
              2.2. <span className="font-medium">Service Information:</span> Order history, service preferences, special instructions, garment details.
            </p>
            <p>
              2.3. <span className="font-medium">Technical Information:</span> Device information, IP address, browser type, operating system, app usage data.
            </p>
            <p>
              2.4. <span className="font-medium">Location Information:</span> With your consent, we may collect precise location data to facilitate pickup and delivery services.
            </p>

            <h3 className="text-lg font-semibold">3. How We Use Your Information</h3>
            <p>
              3.1. To provide and maintain our laundry services.
            </p>
            <p>
              3.2. To process payments and fulfill orders.
            </p>
            <p>
              3.3. To send service notifications, updates, and promotional materials.
            </p>
            <p>
              3.4. To improve our services, website, and app functionality.
            </p>
            <p>
              3.5. To manage customer accounts and provide customer support.
            </p>
            <p>
              3.6. To analyze usage patterns and optimize user experience.
            </p>

            <h3 className="text-lg font-semibold">4. Sharing Your Information</h3>
            <p>
              4.1. <span className="font-medium">Service Providers:</span> We may share information with trusted third parties who assist us in operating our business and servicing you (payment processors, delivery partners, cloud service providers).
            </p>
            <p>
              4.2. <span className="font-medium">Business Transfers:</span> If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
            </p>
            <p>
              4.3. <span className="font-medium">Legal Requirements:</span> We may disclose information when required by law or to protect our rights, privacy, safety, or property.
            </p>

            <h3 className="text-lg font-semibold">5. Data Security</h3>
            <p>
              We implement appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
            </p>

            <h3 className="text-lg font-semibold">6. Your Privacy Rights</h3>
            <p>
              Depending on your location, you may have rights to:
            </p>
            <p>
              6.1. Access and receive a copy of your data
            </p>
            <p>
              6.2. Rectify or update your personal information
            </p>
            <p>
              6.3. Request deletion of your personal data
            </p>
            <p>
              6.4. Object to or restrict processing of your information
            </p>
            <p>
              6.5. Data portability
            </p>

            <h3 className="text-lg font-semibold">7. Marketing Communications</h3>
            <p>
              You may opt out of receiving promotional emails by following the unsubscribe instructions included in each email or by contacting us directly. Note that you will continue to receive service-related communications.
            </p>

            <h3 className="text-lg font-semibold">8. Children's Privacy</h3>
            <p>
              Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children.
            </p>

            <h3 className="text-lg font-semibold">9. Changes to This Privacy Policy</h3>
            <p>
              We may update our Privacy Policy periodically. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>

            <h3 className="text-lg font-semibold">10. Contact Us</h3>
            <p>
              If you have questions or concerns about this Privacy Policy, please contact us at privacy@skawsh.com or call our privacy team at +91 98765 54321.
            </p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyPolicy;
