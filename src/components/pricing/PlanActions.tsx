import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Plus } from 'lucide-react';
import type { PlansResponse } from '@/types/pricing';

interface PlanActionsProps {
  pagination: PlansResponse['pagination'];
  onPageChange: (page: number) => void;
  onCreate: () => void;
}

export const PlanActions = ({ pagination, onPageChange, onCreate }: PlanActionsProps) => {
  const { page, limit, total, totalPages, hasNext, hasPrev } = pagination;
  const currentPage = parseInt(page as unknown as string) || 1;
  const itemsPerPage = parseInt(limit as unknown as string) || 10;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6">
      <div className="text-sm text-muted-foreground">
        Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, total)} of {total} plans
      </div>
      
      <div className="flex gap-2">
        <Button onClick={onCreate}>
          <Plus className="h-4 w-4 mr-2" /> New Plan
        </Button>
        
        <Pagination className="w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => hasPrev && onPageChange(currentPage - 1)}
                className={!hasPrev ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  isActive={currentPage === pageNum}
                  onClick={() => onPageChange(pageNum)}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => hasNext && onPageChange(currentPage + 1)}
                className={!hasNext ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};