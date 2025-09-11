import { usePlansQuery } from '@/api/queries/pricing';
import { useCreatePlanMutation, useUpdatePlanMutation, useDeletePlanMutation } from '@/api/mutations/pricing';
import { usePricing } from '@/hooks/usePricing';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlanTable } from '@/components/pricing/PlanTable';
import { PlanActions } from '@/components/pricing/PlanActions';
import { PlanForm } from '@/components/pricing/PlanForm';

export const Pricing = () => {
  const {
    filters,
    updateFilter,
    isFormOpen,
    editingPlan,
    handleEdit,
    handleCreate,
    handleCloseForm,
  } = usePricing();

  const { data, isLoading } = usePlansQuery(filters);
  const createMutation = useCreatePlanMutation();
  const updateMutation = useUpdatePlanMutation();
  const deleteMutation = useDeletePlanMutation();

  const handleSubmit = (formData: FormData) => {
    if (editingPlan && editingPlan._id) {
      updateMutation.mutate({ id: editingPlan._id, formData });
    } else {
      createMutation.mutate(formData);
    }
    handleCloseForm();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      deleteMutation.mutate(id);
    }
  };

  const handlePageChange = (page: number) => {
    updateFilter('page', page);
  };

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Pricing Plans</CardTitle>
          <CardDescription>
            Manage your subscription plans and pricing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PlanTable
            plans={data?.data || []}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
          
          <PlanActions
            pagination={data?.pagination || {
              page: filters.page.toString(),
              limit: filters.limit.toString(),
              total: data?.data?.length || 0,
              totalPages: 1,
              hasNext: false,
              hasPrev: false
            }}
            onPageChange={handlePageChange}
            onCreate={handleCreate}
          />
        </CardContent>
      </Card>

      <PlanForm
        open={isFormOpen}
        onOpenChange={handleCloseForm}
        onSubmit={handleSubmit}
        plan={editingPlan}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
};