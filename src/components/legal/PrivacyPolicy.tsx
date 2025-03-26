
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface PrivacyPolicyProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Privacy Policy</DialogTitle>
          <DialogDescription>
            Last updated: June 15, 2023
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] rounded-md border p-4">
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-bold mb-2">1. Introduction</h3>
              <p>At Skawsh Laundry Services, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our laundry vendor platform, website, and mobile application. Please read this privacy policy carefully. By accessing or using our services, you agree to the terms of this privacy policy.</p>
            </section>
            
            <section>
              <h3 className="text-lg font-bold mb-2">2. Information We Collect</h3>
              <p>As a laundry vendor on our platform, we collect the following types of information:</p>
              <div className="mt-2">
                <h4 className="font-semibold">Personal Information:</h4>
                <ul className="list-disc ml-6">
                  <li>Name, address, email address, and phone number</li>
                  <li>Business name and registration details</li>
                  <li>Banking and payment information</li>
                  <li>Tax identification numbers (GST/VAT/PAN)</li>
                  <li>Operational details like business hours and service capacity</li>
                </ul>
              </div>
              
              <div className="mt-3">
                <h4 className="font-semibold">Usage Information:</h4>
                <ul className="list-disc ml-6">
                  <li>Order processing data and history</li>
                  <li>Customer ratings and feedback</li>
                  <li>Service performance metrics</li>
                  <li>Login activity and session information</li>
                  <li>Communication records with customers and our support team</li>
                </ul>
              </div>
            </section>
            
            <section>
              <h3 className="text-lg font-bold mb-2">3. How We Use Your Information</h3>
              <p>We use the information we collect to:</p>
              <ul className="list-disc ml-6 mt-2">
                <li>Set up and maintain your vendor account</li>
                <li>Connect you with customers seeking laundry services</li>
                <li>Process payments and transfers</li>
                <li>Improve our platform and services</li>
                <li>Monitor compliance with our terms and policies</li>
                <li>Communicate updates, promotions, and important information</li>
                <li>Provide analytics about your business performance</li>
                <li>Address disputes and troubleshoot problems</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-lg font-bold mb-2">4. Information Sharing</h3>
              <p>We may share certain aspects of your information with:</p>
              <ul className="list-disc ml-6 mt-2">
                <li>Customers who book your services (limited to business name, location, services offered, pricing, and ratings)</li>
                <li>Payment processors to facilitate financial transactions</li>
                <li>Third-party service providers who assist us in operating our platform</li>
                <li>Legal authorities when required by law or to protect our rights</li>
                <li>Business partners for marketing purposes (only with your explicit consent)</li>
              </ul>
              <p className="mt-2">We do not sell your personal information to third parties.</p>
            </section>
            
            <section>
              <h3 className="text-lg font-bold mb-2">5. Data Security</h3>
              <p>We implement appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of your information. These measures include:</p>
              <ul className="list-disc ml-6 mt-2">
                <li>Encryption of sensitive data</li>
                <li>Secure server infrastructure</li>
                <li>Regular security assessments</li>
                <li>Access controls for our employees</li>
                <li>Continuous monitoring for suspicious activities</li>
              </ul>
              <p className="mt-2">However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
            </section>
            
            <section>
              <h3 className="text-lg font-bold mb-2">6. Your Rights and Choices</h3>
              <p>As a vendor, you have certain rights regarding your information:</p>
              <ul className="list-disc ml-6 mt-2">
                <li>Access and review your personal information</li>
                <li>Request corrections to inaccurate or incomplete data</li>
                <li>Update your profile and business details</li>
                <li>Opt-out of marketing communications</li>
                <li>Request deletion of your account (subject to legal obligations)</li>
              </ul>
              <p className="mt-2">To exercise these rights, please contact us through your account settings or at privacy@skawshlaundry.com.</p>
            </section>
            
            <section>
              <h3 className="text-lg font-bold mb-2">7. Data Retention</h3>
              <p>We retain your information for as long as your account is active or as needed to provide you services. We will also retain and use your information as necessary to comply with legal obligations, resolve disputes, and enforce our agreements.</p>
            </section>
            
            <section>
              <h3 className="text-lg font-bold mb-2">8. Children's Privacy</h3>
              <p>Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.</p>
            </section>
            
            <section>
              <h3 className="text-lg font-bold mb-2">9. Changes to This Policy</h3>
              <p>We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.</p>
            </section>
            
            <section>
              <h3 className="text-lg font-bold mb-2">10. Contact Us</h3>
              <p>If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
              <p className="mt-2">Skawsh Laundry Services<br />
              Email: privacy@skawshlaundry.com<br />
              Phone: +91 98765 43210</p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyPolicy;
