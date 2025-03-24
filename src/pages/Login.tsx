
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import LaundryLogo from '@/components/LaundryLogo';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/');
      } else {
        toast({
          title: 'Login Failed',
          description: 'Invalid email or password. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Login Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-8 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Top left shirts */}
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-blue-100/70 blur-md"></div>
        <div className="absolute top-20 left-10 w-20 h-32 rotate-12 rounded-md bg-blue-200/50 blur-sm"></div>
        
        {/* Top right pants */}
        <div className="absolute top-40 right-20 w-16 h-40 -rotate-15 rounded-md bg-indigo-200/60 blur-sm"></div>
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-indigo-100/70 blur-md"></div>
        
        {/* Bottom decorations */}
        <div className="absolute bottom-10 left-1/4 w-48 h-48 rounded-full bg-blue-50/80 blur-lg"></div>
        <div className="absolute -bottom-10 right-1/3 w-40 h-40 rounded-full bg-indigo-50/80 blur-lg"></div>
        
        {/* Shirt buttons */}
        <div className="absolute top-1/3 left-20 w-3 h-3 rounded-full bg-blue-300/80"></div>
        <div className="absolute top-1/3 left-20 mt-6 w-3 h-3 rounded-full bg-blue-300/80"></div>
        <div className="absolute top-1/3 left-20 mt-12 w-3 h-3 rounded-full bg-blue-300/80"></div>
        
        {/* Pant lines */}
        <div className="absolute bottom-1/3 right-40 w-1 h-20 bg-indigo-200/80"></div>
        <div className="absolute bottom-1/3 right-36 w-1 h-20 bg-indigo-200/80"></div>
        
        {/* Laundry soap bubbles */}
        <div className="absolute top-1/2 left-1/4 w-5 h-5 rounded-full bg-white/80"></div>
        <div className="absolute top-1/3 right-1/4 w-4 h-4 rounded-full bg-white/80"></div>
        <div className="absolute bottom-1/4 left-1/3 w-6 h-6 rounded-full bg-white/80"></div>
      </div>
      
      <div className="mb-4 relative z-10">
        <LaundryLogo />
        <div className="text-center text-gray-700 font-medium mt-3">
          <p className="text-xl">Welcome to Skawsh</p>
          <p className="text-lg mt-1">Enter the Credentials to start the journey.</p>
        </div>
      </div>
      <Card className="w-full max-w-md relative z-10 backdrop-blur-sm bg-white/90 border-gray-200 shadow-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@skawsh.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button variant="link" className="p-0 h-auto text-sm" type="button" asChild>
                  <Link to="/forgot-password">Forgot password?</Link>
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
