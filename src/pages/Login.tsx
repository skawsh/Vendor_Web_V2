
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden">
      {/* Background with colored sections */}
      <div className="absolute top-0 left-0 w-full h-full grid grid-cols-2 grid-rows-2 z-0">
        <div className="bg-yellow-500 flex items-center justify-center">
          <img src="/lovable-uploads/cae8fd33-47dd-46bc-82b2-32604324480c.png" alt="Yellow hanger" className="w-24 opacity-90" />
        </div>
        <div className="bg-blue-600 flex items-center justify-center">
          <img src="/lovable-uploads/caf4357d-4cb4-4382-98d1-8c800d6e96ec.png" alt="Blue hanger" className="w-24 opacity-90" />
        </div>
        <div className="bg-teal-500 flex items-center justify-center">
          <img src="/lovable-uploads/6fb402a7-70b8-466d-9b6d-5a28bc6f27a9.png" alt="Teal hanger" className="w-24 opacity-90" />
        </div>
        <div className="bg-pink-500 flex items-center justify-center">
          <img src="/lovable-uploads/f5346382-47ac-4689-af84-6351a9f4785c.png" alt="Pink hanger" className="w-24 opacity-90" />
        </div>
      </div>

      {/* Logo and Welcome Text - positioned higher up with more margin */}
      <div className="relative z-10 mt-16 mb-6 text-center">
        <LaundryLogo />
        <h1 className="text-2xl font-bold text-gray-800 mt-4">Welcome to Skawsh</h1>
        <p className="text-gray-600 mt-1">Enter the Credentials to start the journey.</p>
      </div>

      {/* Sign-in Card - properly spaced from the logo section */}
      <div className="relative z-10 bg-white p-8 rounded-lg shadow-lg w-96 mb-16">
        <h2 className="text-center text-2xl font-bold mb-6">Sign in</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="block text-gray-700">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@skawsh.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="block text-gray-700">Password</Label>
              <Button variant="link" className="p-0 h-auto text-sm text-blue-500" type="button" asChild>
                <Link to="/forgot-password">Forgot password?</Link>
              </Button>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
