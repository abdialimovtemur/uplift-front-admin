// hooks/usePricing.ts
import { useState } from 'react';
import type { Plan, PlanFilters } from '@/types/pricing';

export const usePricing = () => {
  const [filters, setFilters] = useState<PlanFilters>({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  const updateFilter = (key: keyof PlanFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleCreate = () => {
    setEditingPlan(null);
    setIsFormOpen(true);
  };

  const handleEdit = (plan: Plan) => {
    setEditingPlan(plan);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingPlan(null);
  };

  return {
    filters,
    updateFilter,
    isFormOpen,
    editingPlan,
    handleEdit,
    handleCreate,
    handleCloseForm,
  };
};