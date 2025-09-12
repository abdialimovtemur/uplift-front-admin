// components/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useSendVerificationCode, useVerifyPhone } from '@/api/mutations/auth';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();
  const sendCodeMutation = useSendVerificationCode();
  const verifyPhoneMutation = useVerifyPhone();

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone) {
      toast.error('Please enter your phone number');
      return;
    }

    sendCodeMutation.mutate({ phone }, {
      onSuccess: () => {
        toast.success('Verification code sent successfully');
        setVerificationSent(true);
      }
    });
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code) {
      toast.error('Please enter the verification code');
      return;
    }

    verifyPhoneMutation.mutate({ phone, code }, {
      onSuccess: (data) => {
        // Check if user has admin role
        if (data.data.user.role === 'ADMIN' || data.data.user.role === 'SUPER_ADMIN') {
          toast.success(data.message || 'Login successful');
          login(data.data.user, data.data.accessToken);
          navigate('/dashboard');
        } else {
          // User doesn't have admin privileges
          toast.error('Access denied. Only administrators can access this panel.');
        }
      },
      onError: (error) => {
        // Handle verification errors
        toast.error(error.message || 'Verification failed');
      }
    });
  };

  const handleBackToPhone = () => {
    setVerificationSent(false);
    setCode('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <Card className="w-full max-w-md bg-white dark:bg-gray-900 dark:border-gray-800 shadow-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
            Admin Login
          </CardTitle>
          <CardDescription className="text-center text-gray-600 dark:text-gray-400">
            {verificationSent 
              ? 'Enter the verification code sent to your phone' 
              : 'Enter your phone number to receive a verification code'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!verificationSent ? (
            <form onSubmit={handleSendCode} className="space-y-4">
              <div className="space-y-2">
                <Label 
                  htmlFor="phone" 
                  className="text-gray-700 dark:text-gray-300"
                >
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+998 90 000 00 00"
                  required
                  className="bg-white dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
                  disabled={sendCodeMutation.isPending}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={sendCodeMutation.isPending}
              >
                {sendCodeMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending code...
                  </>
                ) : (
                  'Send Verification Code'
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div className="space-y-2">
                <Label 
                  htmlFor="code" 
                  className="text-gray-700 dark:text-gray-300"
                >
                  Verification Code
                </Label>
                <Input
                  id="code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  required
                  className="bg-white dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 text-center text-xl tracking-widest"
                  disabled={verifyPhoneMutation.isPending}
                  maxLength={6}
                />
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  type="button" 
                  variant="outline"
                  className="w-1/3" 
                  onClick={handleBackToPhone}
                  disabled={verifyPhoneMutation.isPending}
                >
                  Back
                </Button>
                <Button 
                  type="submit" 
                  className="w-2/3" 
                  disabled={verifyPhoneMutation.isPending}
                >
                  {verifyPhoneMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify Code'
                  )}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;