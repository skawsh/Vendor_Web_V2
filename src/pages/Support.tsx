
import React, { useState } from 'react';
import { HelpCircle, Phone, Mail, Clock, MessageCircle, ExternalLink, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const Support = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    toast.success('Message sent successfully', {
      description: 'Our support team will get back to you shortly.'
    });
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-1 flex items-center gap-2">
          <HelpCircle className="h-8 w-8 text-primary" />
          Support
        </h1>
        <p className="text-muted-foreground">Get help and assistance with your laundry studio</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Phone Support Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              Phone Support
            </CardTitle>
            <CardDescription>
              Contact our support team via phone during working hours
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
              <Phone className="h-10 w-10 p-2 bg-blue-100 text-blue-700 rounded-full" />
              <div>
                <h3 className="font-semibold">Admin Contact Number</h3>
                <p className="text-lg text-blue-700">+91 98765 12345</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                Working Hours
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="font-medium">Monday - Friday</p>
                  <p className="text-muted-foreground">9:00 AM - 6:00 PM</p>
                </div>
                <div>
                  <p className="font-medium">Saturday</p>
                  <p className="text-muted-foreground">10:00 AM - 4:00 PM</p>
                </div>
                <div className="col-span-2">
                  <p className="font-medium">Sunday</p>
                  <p className="text-muted-foreground">Closed</p>
                </div>
              </div>
            </div>
            
            <div className="pt-2">
              <h3 className="font-medium mb-2">Important Note</h3>
              <p className="text-sm text-muted-foreground">
                For urgent matters, please contact us during working hours. 
                For non-urgent inquiries, you can use our email support or submit a support ticket.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full gap-2" onClick={() => {
              toast.info('Calling support', {
                description: 'Redirecting to phone app...'
              });
            }}>
              <Phone className="h-4 w-4" />
              Call Support Now
            </Button>
          </CardFooter>
        </Card>

        {/* Email Support Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Email Support
            </CardTitle>
            <CardDescription>
              Get assistance via email for non-urgent matters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <Mail className="h-10 w-10 p-2 bg-green-100 text-green-700 rounded-full" />
              <div>
                <h3 className="font-semibold">Admin Email Address</h3>
                <p className="text-lg text-green-700">support@skawsh.com</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Email Response Time</h3>
              <p className="text-sm text-muted-foreground">
                We typically respond to all email inquiries within 24 hours on business days.
                Please provide detailed information about your issue to help us assist you better.
              </p>
            </div>
            
            <div className="pt-2">
              <h3 className="font-medium mb-2">For faster assistance</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Include your account details</li>
                <li>• Describe the issue clearly</li>
                <li>• Attach screenshots if applicable</li>
                <li>• Mention your order number if relevant</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full gap-2"
              onClick={() => {
                window.location.href = 'mailto:support@skawsh.com';
              }}
            >
              <Mail className="h-4 w-4" />
              Send Email
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Contact Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            Contact Us
          </CardTitle>
          <CardDescription>
            Send us a message and we'll get back to you as soon as possible
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitForm} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={contactForm.name} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={contactForm.email} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input 
                id="subject" 
                name="subject" 
                value={contactForm.subject} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                name="message" 
                rows={5} 
                value={contactForm.message} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <Button type="submit" className="w-full sm:w-auto gap-2">
              <Send className="h-4 w-4" />
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>
            Quick answers to common questions about our laundry services
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">How do I track my order status?</h3>
            <p className="text-sm text-muted-foreground">
              You can track your order status by logging into your account and visiting the 'Orders' section.
              There you can view real-time updates on the progress of your laundry.
            </p>
          </div>
          <Separator />
          <div className="space-y-2">
            <h3 className="font-medium">What are your service charges?</h3>
            <p className="text-sm text-muted-foreground">
              Our service charges vary depending on the type of laundry, weight, and service level (Quick or Standard).
              You can find our full pricing details in the 'Services' section.
            </p>
          </div>
          <Separator />
          <div className="space-y-2">
            <h3 className="font-medium">How do I schedule a pickup or delivery?</h3>
            <p className="text-sm text-muted-foreground">
              You can schedule a pickup or delivery through the 'Orders' section. Select your preferred date and time slot,
              and our delivery personnel will arrive within the selected timeframe.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="gap-2">
            <ExternalLink className="h-4 w-4" />
            View All FAQs
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Support;
