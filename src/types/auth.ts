// types/auth.ts
export interface PhoneVerificationRequest {
  phone: string;
}

export interface PhoneVerificationResponse {
  message: string;
}

export interface VerifyPhoneRequest {
  phone: string;
  code: string;
}

export interface User {
  _id: string;
  phone: string;
  role: string;
  status: string;
  phoneVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export interface VerifyPhoneResponse {
  message: string;
  data: {
    user: User;
    accessToken: string;
  };
}

// Add AuthContextType interface
export interface AuthContextType {
  user: User | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
  loading: boolean;
}