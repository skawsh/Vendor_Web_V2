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
  const {
    login
  } = useAuth();
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
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
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Login Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="relative flex items-center justify-center min-h-screen w-full">
      {/* Background with colored sections and hangers */}
      <div className="absolute top-0 left-0 w-full h-full grid grid-cols-2 grid-rows-2">
        <div className="bg-yellow-500 flex items-center justify-center">
          <img src="/lovable-uploads/f4ceb65a-0b52-445b-b24a-11ee2064d0c9.png" alt="hanger" className="w-20 opacity-80" />
        </div>
        <div className="bg-blue-600 flex items-center justify-center">
          <img src="/lovable-uploads/f4ceb65a-0b52-445b-b24a-11ee2064d0c9.png" alt="hanger" className="w-20 opacity-80" />
        </div>
        <div className="bg-teal-500 flex items-center justify-center">
          <img src="/lovable-uploads/f4ceb65a-0b52-445b-b24a-11ee2064d0c9.png" alt="hanger" className="w-20 opacity-80" />
        </div>
        <div className="bg-pink-500 flex items-center justify-center">
          <img src="/lovable-uploads/f4ceb65a-0b52-445b-b24a-11ee2064d0c9.png" alt="hanger" className="w-20 opacity-80" />
        </div>
      </div>

      {/* Skawsh Logo and Welcome Text */}
      <div className="absolute top-10 text-center z-10">
        <LaundryLogo />
        <h1 className="text-2xl font-bold text-gray-800 mt-2">Welcome to Skawsh</h1>
        <p className="text-gray-600">Enter the Credentials to start the journey.</p>
      </div>

      {/* Sign-in Card */}
      <div className="relative z-10 bg-white p-8 rounded-lg shadow-lg w-96 mt-32 py-[9px]">
        <h2 className="text-center text-2xl font-bold mb-6">Sign in</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-gray-700">Email</Label>
              <Input id="email" type="email" placeholder="email@skawsh.com" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-2 border rounded" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="block text-gray-700">Password</Label>
                <Button variant="link" className="p-0 h-auto text-sm text-blue-500" type="button" asChild>
                  <Link to="/forgot-password">Forgot password?</Link>
                </Button>
              </div>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full p-2 border rounded" />
            </div>
            
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md mt-4" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
        </form>
      </div>
    </div>;
};
export default Login;