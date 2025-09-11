export interface Plan {
  _id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  durationInDays: number;
  features: string[];
  isActive: boolean;
  billingCycle: string;
  type: string;
  status: string;
  maxUsers: number;
  maxSubmissions: number;
  isPopular: boolean;
  sortOrder: number;
  icon?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PromoteUserRequest {
  userId: string;
  planId: string;
  reason: string;
}