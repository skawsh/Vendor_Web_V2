
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import LaundryLogo from '@/components/LaundryLogo';
import OTPVerification from '@/components/OTPVerification';
import ResetPassword from '@/components/ResetPassword';
import { ArrowLeft } from 'lucide-react';

type Step = 'phone' | 'otp' | 'reset';

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState<Step>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGenerateOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a valid mobile number',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);

    // Simulate OTP generation
    setTimeout(() => {
      toast({
        title: 'OTP Sent',
        description: 'A verification code has been sent to your mobile number.',
      });
      setIsLoading(false);
      setStep('otp');
    }, 1000);
  };

  const handleOTPVerified = () => {
    setStep('reset');
  };

  const handlePasswordReset = () => {
    toast({
      title: 'Password Reset Successful',
      description: 'Your password has been reset successfully. Please log in with your new password.',
    });
    navigate('/login');
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="w-full max-w-[250px] mb-3">
            <LaundryLogo />
          </div>
          
          <div className="w-full flex items-center mt-2 mb-4">
            <Button 
              variant="ghost" 
              className="flex items-center gap-1 p-0 h-auto text-gray-600" 
              onClick={handleBackToLogin}
              aria-label="Back to login"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <div className="flex-grow text-center">
              <h2 className="text-xl font-medium text-gray-700">Welcome to Skawsh</h2>
            </div>
            <div className="w-[60px]"></div> {/* Spacer to balance the layout */}
          </div>
        </div>
        
        <Card className="w-full border-gray-200 shadow-sm">
          <CardHeader className="pb-2 pt-6">
            <CardTitle className="text-2xl font-bold text-center">
              {step === 'phone' ? 'Reset your password' : 
               step === 'otp' ? 'Verify OTP' : 'Reset Password'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {step === 'phone' && (
              <form onSubmit={handleGenerateOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-medium">Mobile Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-blue-500 hover:bg-blue-600" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Generating OTP...' : 'Generate OTP'}
                </Button>
              </form>
            )}

            {step === 'otp' && (
              <OTPVerification 
                phoneNumber={phoneNumber} 
                onVerified={handleOTPVerified} 
              />
            )}

            {step === 'reset' && (
              <ResetPassword onPasswordReset={handlePasswordReset} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
