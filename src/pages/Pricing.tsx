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
// import { PlanFiltersComponent } from '@/components/pricing/PlanFilters';
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

  const handleSubmit = (formData: any) => {
    if (editingPlan) {
      updateMutation.mutate({ id: editingPlan._id!, data: formData });
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
          {/* <PlanFiltersComponent 
            filters={filters} 
            onFilterChange={updateFilter} 
          /> */}
          
          <PlanTable
            plans={data?.data || []}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
          
          {data?.pagination && (
            <PlanActions
              pagination={data.pagination}
              onPageChange={handlePageChange}
              onCreate={handleCreate}
            />
          )}
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