
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import LaundryLogo from '@/components/LaundryLogo';
import { Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden">
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

      <div className="relative z-10 mt-16 mb-6 text-center">
        <div className="rounded-full bg-white p-3 inline-flex items-center justify-center shadow-md mx-auto mb-4">
          <img 
            src="/lovable-uploads/ebbdcdf1-7506-446e-82b3-1800dce8f42a.png" 
            alt="Skawsh Logo" 
            className="h-24 w-auto" 
          />
        </div>
        <div className="bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-md px-8 py-5 rounded-xl shadow-lg mt-4 mx-auto max-w-sm border border-white/20 animate-fade-in">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Skawsh</h1>
          <p className="text-gray-600">Enter the Credentials to start the journey.</p>
        </div>
      </div>

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
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border rounded pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
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
