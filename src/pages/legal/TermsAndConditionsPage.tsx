
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const TermsAndConditionsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4 md:p-6">
      <header className="mb-6 flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)} 
          className="mr-2"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Terms and Conditions</h1>
          <p className="text-muted-foreground">Last updated: June 15, 2023</p>
        </div>
      </header>

      <div className="bg-white rounded-lg border p-4 shadow-sm">
        <ScrollArea className="h-[calc(100vh-180px)]">
          <div className="space-y-6 pr-4">
            <section>
              <h3 className="text-lg font-bold mb-2">1. Introduction</h3>
              <p>Welcome to Skawsh Laundry Services ("Company", "we", "our", "us"). These Terms and Conditions govern your use of our services provided through our laundry vendor platform, website, and mobile application. By using our services, you agree to be bound by these Terms and Conditions.</p>
            </section>
            
            <section>
              <h3 className="text-lg font-bold mb-2">2. Service Description</h3>
              <p>Skawsh Laundry Services provides a platform connecting laundry vendors with customers seeking laundry and dry cleaning services. Our platform facilitates order placement, payment processing, and delivery logistics for laundry services.</p>
              <p className="mt-2">Our services include but are not limited to:</p>
              <ul className="list-disc ml-6 mt-2">
                <li>Regular wash and fold services</li>
                <li>Dry cleaning</li>
                <li>Express laundry services</li>
                <li>Special garment care</li>
                <li>Delivery and pickup services</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-lg font-bold mb-2">3. Vendor Responsibilities</h3>
              <p>As a vendor using our platform, you are responsible for:</p>
              <ul className="list-disc ml-6 mt-2">
                <li>Providing accurate information about your business, services, and pricing</li>
                <li>Maintaining proper licenses and permits required to operate a laundry business</li>
                <li>Ensuring quality service delivery to customers</li>
                <li>Processing orders within the agreed timeframe</li>
                <li>Handling customer garments with appropriate care</li>
                <li>Resolving customer complaints and issues promptly</li>
                <li>Complying with all applicable laws and regulations</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-lg font-bold mb-2">4. Fees and Payments</h3>
              <p>Vendors agree to pay a commission fee to Skawsh for each transaction processed through our platform. Commission rates are outlined in your vendor agreement. Payment schedules can be daily, weekly, or monthly as selected in your profile settings.</p>
              <p className="mt-2">All payments to vendors will be processed according to the banking information provided in your account profile. It is your responsibility to ensure this information is accurate and up-to-date.</p>
            </section>
            
            <section>
              <h3 className="text-lg font-bold mb-2">5. Service Quality and Standards</h3>
              <p>Vendors must maintain high standards of service quality, including:</p>
              <ul className="list-disc ml-6 mt-2">
                <li>Using appropriate cleaning methods and materials</li>
                <li>Ensuring cleanliness and proper handling of all garments</li>
                <li>Meeting agreed-upon delivery timeframes</li>
                <li>Properly packaging and returning cleaned items</li>
                <li>Addressing any damage or loss promptly and fairly</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-lg font-bold mb-2">6. Termination</h3>
              <p>We reserve the right to suspend or terminate vendor accounts that violate these Terms and Conditions, receive consistent negative feedback, or engage in fraudulent activity. Vendors may also terminate their participation in our platform with 30 days written notice.</p>
            </section>
            
            <section>
              <h3 className="text-lg font-bold mb-2">7. Liability Limitations</h3>
              <p>While we strive to maintain a reliable platform, we are not liable for interruptions in service, technical issues, or communication failures beyond our reasonable control. Vendors are responsible for maintaining appropriate insurance coverage for their business activities.</p>
            </section>
            
            <section>
              <h3 className="text-lg font-bold mb-2">8. Dispute Resolution</h3>
              <p>Any disputes between vendors and customers will first be addressed through our internal resolution process. If unresolved, disputes will be subject to binding arbitration in accordance with the laws of the state where the vendor operates.</p>
            </section>
            
            <section>
              <h3 className="text-lg font-bold mb-2">9. Changes to Terms</h3>
              <p>We may update these Terms and Conditions from time to time. Vendors will be notified of significant changes, and continued use of our services constitutes acceptance of the updated terms.</p>
            </section>
            
            <section>
              <h3 className="text-lg font-bold mb-2">10. Contact Information</h3>
              <p>For questions or concerns regarding these Terms and Conditions, please contact our vendor support team at vendor.support@skawshlaundry.com.</p>
            </section>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
