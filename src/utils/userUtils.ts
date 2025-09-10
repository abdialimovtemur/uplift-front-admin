export const getRoleBadgeVariant = (role: string): 'default' | 'destructive' | 'secondary' | 'outline' => {
  switch (role) {
    case 'SUPER_ADMIN': return 'destructive';
    case 'ADMIN': return 'default';
    default: return 'secondary';
  }
};

export const getStatusBadgeVariant = (status: string): 'default' | 'destructive' | 'secondary' | 'outline' => {
  switch (status) {
    case 'ACTIVE': return 'default'; // 'success' o'rniga 'default'
    case 'INACTIVE': return 'secondary';
    case 'SUSPENDED': return 'destructive';
    default: return 'outline';
  }
};

export const formatStatus = (status: string) => {
  switch (status) {
    case 'ACTIVE': return 'Faol';
    case 'INACTIVE': return 'Faol emas';
    case 'SUSPENDED': return 'Bloklangan';
    default: return status;
  }
};