
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
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden">
      {/* Background with colored sections */}
      <div className="absolute top-0 left-0 w-full h-full grid grid-cols-2 grid-rows-2 z-0">
        <div className="bg-yellow-500 flex items-center justify-center overflow-hidden">
          <img 
            src="/lovable-uploads/cae8fd33-47dd-46bc-82b2-32604324480c.png" 
            alt="Yellow hanger" 
            className="w-48 h-48 object-contain mix-blend-multiply opacity-95" 
          />
        </div>
        <div className="bg-blue-600 flex items-center justify-center overflow-hidden">
          <img 
            src="/lovable-uploads/caf4357d-4cb4-4382-98d1-8c800d6e96ec.png" 
            alt="Blue hanger" 
            className="w-48 h-48 object-contain mix-blend-screen opacity-95" 
          />
        </div>
        <div className="bg-teal-500 flex items-center justify-center overflow-hidden">
          <img 
            src="/lovable-uploads/6fb402a7-70b8-466d-9b6d-5a28bc6f27a9.png" 
            alt="Teal hanger" 
            className="w-48 h-48 object-contain mix-blend-multiply opacity-95" 
          />
        </div>
        <div className="bg-pink-500 flex items-center justify-center overflow-hidden">
          <img 
            src="/lovable-uploads/f5346382-47ac-4689-af84-6351a9f4785c.png" 
            alt="Pink hanger" 
            className="w-48 h-48 object-contain mix-blend-multiply opacity-95" 
          />
        </div>
      </div>
      
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="flex flex-col items-center mb-6">
          <div className="w-full max-w-[250px] mb-3">
            <LaundryLogo />
          </div>
          
          <div className="w-full flex justify-center mt-2 mb-4">
            <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-lg shadow-md mx-auto max-w-xs">
              <h2 className="text-xl font-medium text-gray-700 text-center">Welcome to Skawsh</h2>
            </div>
          </div>
        </div>
        
        <Card className="w-full border-gray-200 shadow-sm relative z-10 bg-white">
          <CardHeader className="pb-2 pt-6">
            <div className="flex items-center mb-2">
              <Button 
                variant="ghost" 
                className="p-2 h-9 w-9 mr-3 text-gray-600" 
                onClick={handleBackToLogin}
                aria-label="Back to login"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <CardTitle className="text-2xl font-bold">
                {step === 'phone' ? 'Reset your password' : 
                 step === 'otp' ? 'Verify OTP' : 'Reset Password'}
              </CardTitle>
            </div>
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
