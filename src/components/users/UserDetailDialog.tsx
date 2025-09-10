import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
// import { useUserDetailQuery } from '@/hooks/queries/users';
import { getRoleBadgeVariant, getStatusBadgeVariant, formatStatus } from '@/utils/userUtils';
import { useUserDetailQuery } from '@/api/queries/users';

interface UserDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string | null;
}

const UserDetailDialog: React.FC<UserDetailDialogProps> = ({ open, onOpenChange, userId }) => {
  const { data: user, isLoading, error } = useUserDetailQuery(userId || '');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Foydalanuvchi Tafsilotlari</DialogTitle>
          <DialogDescription>
            Foydalanuvchi haqida to'liq ma'lumot
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ) : error ? (
          <div className="text-destructive text-center py-4">
            Xatolik yuz berdi: {error.message}
          </div>
        ) : user ? (
          <div className="space-y-6">
            {/* Rasm va ism olib tashlandi */}
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">ID</h4>
                <span className="text-sm font-mono">{user._id}</span>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">Telefon</h4>
                <span>{user.phone}</span>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">Rol</h4>
                <Badge variant={getRoleBadgeVariant(user.role)}>
                  {user.role}
                </Badge>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">Status</h4>
                <Badge variant={getStatusBadgeVariant(user.status)}>
                  {formatStatus(user.status)}
                </Badge>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">Telefon tasdiqlangan</h4>
                <span>{user.phoneVerified ? 'Ha' : 'Yo\'q'}</span>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">Ro'yxatdan o'tgan sana</h4>
                <span>{new Date(user.createdAt).toLocaleString('uz-UZ')}</span>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">Oxirgi yangilangan</h4>
                <span>{new Date(user.updatedAt).toLocaleString('uz-UZ')}</span>
              </div>
              {user.lastLoginAt && (
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Oxirgi kirish</h4>
                  <span>{new Date(user.lastLoginAt).toLocaleString('uz-UZ')}</span>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailDialog;