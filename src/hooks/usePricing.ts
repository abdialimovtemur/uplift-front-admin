import type { Plan, PlanFilters } from '@/types/pricing';
import { useState } from 'react';

export const usePricing = () => {
  const [filters, setFilters] = useState<PlanFilters>({
    page: 1,
    limit: 10,
    sortBy: 'sortOrder',
    sortOrder: 'asc',
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  const updateFilter = (key: keyof PlanFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleEdit = (plan: Plan) => {
    setEditingPlan(plan);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setEditingPlan(null);
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