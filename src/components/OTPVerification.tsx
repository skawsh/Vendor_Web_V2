
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface OTPVerificationProps {
  phoneNumber: string;
  onVerified: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ phoneNumber, onVerified }) => {
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [timeLeft]);

  const handleResendOTP = () => {
    setTimeLeft(30);
    setIsResendDisabled(true);
    toast({
      title: 'OTP Resent',
      description: 'A new verification code has been sent to your mobile number.',
    });
  };

  const handleVerifyOTP = () => {
    setIsVerifying(true);
    // Simulate OTP verification
    setTimeout(() => {
      if (otp.length === 6) {
        toast({
          title: 'OTP Verified',
          description: 'Your OTP has been verified successfully.',
        });
        onVerified();
      } else {
        toast({
          title: 'Invalid OTP',
          description: 'Please enter a valid 6-digit OTP.',
          variant: 'destructive',
        });
      }
      setIsVerifying(false);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <p className="text-center text-sm text-gray-600 mb-4">
        Enter the 6-digit code sent to {phoneNumber}
      </p>
      
      <div className="flex justify-center">
        <InputOTP
          maxLength={6}
          value={otp}
          onChange={(value) => setOtp(value)}
        >
          <InputOTPGroup>
            {Array.from({ length: 6 }).map((_, index) => (
              <InputOTPSlot key={index} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
      
      <div className="flex flex-col gap-2 pt-2">
        <Button onClick={handleVerifyOTP} disabled={otp.length !== 6 || isVerifying}>
          {isVerifying ? 'Verifying...' : 'Verify OTP'}
        </Button>
        
        <div className="flex justify-center items-center mt-2">
          <Button 
            variant="link" 
            className="p-0 h-auto text-sm" 
            disabled={isResendDisabled} 
            onClick={handleResendOTP}
          >
            {isResendDisabled ? `Resend OTP in ${timeLeft}s` : 'Resend OTP'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
