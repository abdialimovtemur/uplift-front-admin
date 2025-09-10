import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
// import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import type { PlanFilters } from '@/types/pricing';

interface PlanFiltersProps {
  filters: PlanFilters;
  onFilterChange: (key: keyof PlanFilters, value: any) => void;
}

export const PlanFiltersComponent = ({ filters, onFilterChange }: PlanFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search plans..."
          className="pl-8"
          value={filters.search || ''}
          onChange={(e) => onFilterChange('search', e.target.value)}
        />
      </div>
      
      <div className="flex gap-2 flex-wrap">
        <Select
          value={filters.status || ''}
          onValueChange={(value) => onFilterChange('status', value)}
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Status</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="INACTIVE">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.billingCycle || ''}
          onValueChange={(value) => onFilterChange('billingCycle', value)}
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Billing" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Billing</SelectItem>
            <SelectItem value="MONTHLY">Monthly</SelectItem>
            <SelectItem value="YEARLY">Yearly</SelectItem>
            <SelectItem value="LIFETIME">Lifetime</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.isActive?.toString() || ''}
          onValueChange={(value) => onFilterChange('isActive', value === 'true')}
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Active" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All</SelectItem>
            <SelectItem value="true">Active Only</SelectItem>
            <SelectItem value="false">Inactive Only</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};