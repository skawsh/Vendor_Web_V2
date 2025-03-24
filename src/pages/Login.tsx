
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

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gray-100">
      {/* Background Sections */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-yellow-500"></div>
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-600"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-teal-500"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-pink-500"></div>

      {/* Hanger Images */}
      <img src="/lovable-uploads/f4ceb65a-0b52-445b-b24a-11ee2064d0c9.png" alt="hanger" className="absolute top-10 left-10 w-20 opacity-90" />
      <img src="/lovable-uploads/f4ceb65a-0b52-445b-b24a-11ee2064d0c9.png" alt="hanger" className="absolute top-10 right-10 w-20 opacity-90" />
      <img src="/lovable-uploads/f4ceb65a-0b52-445b-b24a-11ee2064d0c9.png" alt="hanger" className="absolute bottom-10 left-10 w-20 opacity-90" />
      <img src="/lovable-uploads/f4ceb65a-0b52-445b-b24a-11ee2064d0c9.png" alt="hanger" className="absolute bottom-10 right-10 w-20 opacity-90" />

      {/* Logo and Welcome Text */}
      <div className="absolute top-20 text-center">
        <LaundryLogo />
        <h1 className="text-xl font-bold text-gray-900 mt-2">Welcome to Skawsh</h1>
        <p className="text-gray-600">Enter the Credentials to start the journey.</p>
      </div>

      {/* Sign-In Form */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center z-10">
        <h2 className="text-2xl font-semibold mb-4">Sign in</h2>
        <form onSubmit={handleSubmit}>
          <Input 
            id="email" 
            type="email" 
            placeholder="email@skawsh.com" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
            className="w-full p-2 border rounded mb-3" 
          />
          <Input 
            id="password" 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
            className="w-full p-2 border rounded mb-3" 
          />
          <div className="flex justify-between text-sm text-blue-600 mb-4">
            <span></span>
            <Button variant="link" className="p-0 h-auto text-sm text-blue-500" type="button" asChild>
              <Link to="/forgot-password">Forgot password?</Link>
            </Button>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded" 
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
