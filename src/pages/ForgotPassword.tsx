
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import LaundryLogo from '@/components/LaundryLogo';
import OTPVerification from '@/components/OTPVerification';
import ResetPassword from '@/components/ResetPassword';

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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-8">
      <div className="mb-4">
        <LaundryLogo />
        <div className="text-center text-gray-700 font-medium mt-3">
          <p className="text-xl">Welcome to Skawsh</p>
          <p className="text-lg mt-1">Reset your password</p>
        </div>
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {step === 'phone' ? 'Forgot Password' : 
             step === 'otp' ? 'Verify OTP' : 'Reset Password'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {step === 'phone' && (
            <form onSubmit={handleGenerateOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
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
  );
};

export default ForgotPassword;
