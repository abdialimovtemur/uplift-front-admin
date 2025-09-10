import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { User } from '@/types/user';
// import { User } from '@/types/user';

interface DeleteUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  onConfirm: () => void;
  isLoading: boolean;
}

const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({
  open,
  onOpenChange,
  user,
  onConfirm,
  isLoading
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Foydalanuvchini o'chirish</DialogTitle>
          <DialogDescription>
            Bu foydalanuvchini rostdan ham o'chirmoqchimisiz? Bu amalni
            qaytarib bo'lmaydi.
          </DialogDescription>
        </DialogHeader>

        {user && (
          <div className="py-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.firstName} className="h-10 w-10 rounded-full" />
                ) : (
                  <span className="text-sm">
                    {user.firstName?.[0]}{user.lastName?.[0] || user.phone[0]}
                  </span>
                )}
              </div>
              <div>
                <div className="font-medium">
                  {user.firstName && user.lastName 
                    ? `${user.firstName} ${user.lastName}` 
                    : user.phone
                  }
                </div>
                <div className="text-sm text-muted-foreground">
                  {user.role} • {user.phone}
                </div>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Bekor qilish
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'O\'chirilmoqda...' : 'O\'chirish'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserDialog;