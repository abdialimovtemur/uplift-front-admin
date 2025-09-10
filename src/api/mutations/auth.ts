// api/mutations/auth.ts
import { useMutation } from '@tanstack/react-query';
import api from '../api';
import { toast } from 'sonner';
import type { PhoneVerificationRequest, PhoneVerificationResponse, VerifyPhoneRequest, VerifyPhoneResponse } from '@/types/auth';

export const useSendVerificationCode = () => {
  return useMutation<PhoneVerificationResponse, Error, PhoneVerificationRequest>({
    mutationFn: (request: PhoneVerificationRequest) => 
      api.post('/auth/send-verification-code', request).then(response => response.data),
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Failed to send verification code';
      toast.error(errorMessage);
    }
  });
};

export const useVerifyPhone = () => {
  return useMutation<VerifyPhoneResponse, Error, VerifyPhoneRequest>({
    mutationFn: (request: VerifyPhoneRequest) => 
      api.post('/auth/verify-phone', request).then(response => response.data),
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Verification failed';
      toast.error(errorMessage);
    }
  });
};