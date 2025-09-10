import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Eye, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import UserDetailDialog from './UserDetailDialog';
import DeleteUserDialog from './DeleteUserDialog';
import { getRoleBadgeVariant, getStatusBadgeVariant, formatStatus } from '@/utils/userUtils';
import { useUsersQuery } from '@/api/queries/users';
import { useDeleteUserMutation } from '@/api/mutations/users';
import type { User, UserFilters } from '@/types/user';

const UserManagement: React.FC = () => {
  const [filters, setFilters] = useState<UserFilters>({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { data, isLoading, error } = useUsersQuery(filters);
  const deleteUserMutation = useDeleteUserMutation();

  const handleSearch = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, search: searchTerm, page: 1 }));
  };

  const handleRoleFilter = (role: string) => {
    setFilters(prev => ({ 
      ...prev, 
      role: role === 'all' ? undefined : role,
      page: 1 
    }));
  };

  const handleStatusFilter = (status: string) => {
    setFilters(prev => ({ 
      ...prev, 
      status: status === 'all' ? undefined : status,
      page: 1 
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  const handleViewUser = (userId: string) => {
    setSelectedUserId(userId);
    setDetailDialogOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      deleteUserMutation.mutate(userToDelete._id);
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  // Tartib raqamini hisoblash
  const getRowNumber = (index: number) => {
    const currentPage = filters.page || 1;
    const itemsPerPage = filters.limit || 10;
    return (currentPage - 1) * itemsPerPage + index + 1;
  };

  return (
    <div className="container mx-auto space-y-6">
      {/* Filterlar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Telefon raqami bo'yicha qidirish..."
                className="pl-8"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            
            <Select onValueChange={handleRoleFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Rol bo'yicha" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Barcha rollar</SelectItem>
                <SelectItem value="USER">USER</SelectItem>
                <SelectItem value="ADMIN">ADMIN</SelectItem>
                <SelectItem value="SUPER_ADMIN">SUPER_ADMIN</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={handleStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status bo'yicha" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Barcha statuslar</SelectItem>
                <SelectItem value="ACTIVE">Faol</SelectItem>
                <SelectItem value="INACTIVE">Faol emas</SelectItem>
                <SelectItem value="SUSPENDED">Bloklangan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Foydalanuvchilar jadvali */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Foydalanuvchilar Ro'yxati</CardTitle>
          <CardDescription>
            Jami {data?.pagination.total || 0} ta foydalanuvchi topildi
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="text-center text-destructive py-8">
              Xatolik yuz berdi: {error.message}
            </div>
          ) : isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              ))}
            </div>
          ) : data && data.data.length > 0 ? (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">№</TableHead>
                      <TableHead>Telefon</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ro'yxatdan o'tgan sana</TableHead>
                      <TableHead className="text-right">Amallar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.data.map((user, index) => (
                      <TableRow key={user._id}>
                        <TableCell className="font-medium text-center">
                          {getRowNumber(index)}
                        </TableCell>
                        <TableCell className="font-medium">
                          {user.phone}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getRoleBadgeVariant(user.role)}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(user.status)}>
                            {formatStatus(user.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(user.createdAt).toLocaleDateString('uz-UZ')}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleViewUser(user._id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleDeleteUser(user)}
                              disabled={user.role === 'SUPER_ADMIN'}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {data.pagination.totalPages > 1 && (
                <div className="flex items-center justify-between px-2 py-4">
                  <div className="text-sm text-muted-foreground">
                    Ko'rsatilmoqda {((filters.page || 1) - 1) * (filters.limit || 10) + 1} dan{' '}
                    {Math.min((filters.page || 1) * (filters.limit || 10), data.pagination.total)} gacha, jami{' '}
                    {data.pagination.total} ta yozuv
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange((filters.page || 1) - 1)}
                      disabled={!data.pagination.hasPrev}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">
                      {filters.page} / {data.pagination.totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange((filters.page || 1) + 1)}
                      disabled={!data.pagination.hasNext}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Hech qanday foydalanuvchi topilmadi
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialoglar */}
      <UserDetailDialog
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
        userId={selectedUserId}
      />

      <DeleteUserDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        user={userToDelete}
        onConfirm={confirmDelete}
        isLoading={deleteUserMutation.isPending}
      />
    </div>
  );
};

export default UserManagement;