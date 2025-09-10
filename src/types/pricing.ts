export interface Plan {
  _id?: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  price: number;
  currency: string;
  durationInDays: number;
  trialCount: number;
  isActive: boolean;
  billingCycle: 'MONTHLY' | 'YEARLY' | 'LIFETIME';
  type: string;
  status: 'ACTIVE' | 'INACTIVE';
  tags: string[];
  maxUsers: number;
  maxSubmissions: number;
  isPopular: boolean;
  sortOrder: number;
  stripePriceId?: string;
  stripeProductId?: string;
  metadata?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}

export interface PlansResponse {
  data: Plan[];
  pagination: {
    page: string;
    limit: string;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface PlanFilters {
  page: number;
  limit: number;
  search?: string;
  type?: string;
  status?: string;
  billingCycle?: string;
  currency?: string;
  minPrice?: number;
  maxPrice?: number;
  isActive?: boolean;
  isPopular?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  tags?: string[];
}