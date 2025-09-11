import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Check, Calendar, BarChart3, Users } from 'lucide-react';
import type { Plan } from '@/types/userPlan';

interface PlanSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  userName: string;
  currentPlan?: string;
  plans: Plan[];
  onPromote: (userId: string, planId: string, reason: string) => void;
  isLoading?: boolean;
}

export const PlanSelectionModal: React.FC<PlanSelectionModalProps> = ({
  open,
  onOpenChange,
  userId,
  userName,
  currentPlan,
  plans,
  onPromote,
  isLoading = false,
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>('');
  const [reason, setReason] = useState<string>('');

  const handleSubmit = () => {
    if (selectedPlanId && reason.trim()) {
      onPromote(userId, selectedPlanId, reason);
      setSelectedPlanId('');
      setReason('');
      onOpenChange(false);
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('uz-UZ', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Change User Plan</DialogTitle>
          <DialogDescription>
            Select a new plan for {userName}. Current plan: {currentPlan || 'No plan'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <Label>Select Plan</Label>
            <RadioGroup value={selectedPlanId} onValueChange={setSelectedPlanId}>
              <div className="grid gap-4">
                {plans.map((plan) => (
                  <div key={plan._id} className="flex items-start space-x-3">
                    <RadioGroupItem value={plan._id} id={plan._id} />
                    <Label
                      htmlFor={plan._id}
                      className="flex flex-1 flex-col space-y-2 rounded-lg border p-4 hover:bg-green-200 cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">{plan.title}</span>
                          {plan.isPopular && (
                            <Badge variant="default" className="text-xs">
                              Popular
                            </Badge>
                          )}
                          {plan.type === 'FREE' && (
                            <Badge variant="secondary" className="text-xs">
                              Free
                            </Badge>
                          )}
                        </div>
                        <div className="font-bold">
                          {formatCurrency(plan.price, plan.currency)}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        {plan.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{plan.durationInDays} days</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BarChart3 className="h-3 w-3" />
                          <span>{plan.maxSubmissions} submissions</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{plan.maxUsers === 0 ? 'Unlimited' : plan.maxUsers} users</span>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-xs font-medium">Features:</div>
                        <div className="text-xs text-muted-foreground">
                          {plan.features.join(' • ')}
                        </div>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason for change *</Label>
            <Textarea
              id="reason"
              placeholder="Please provide the reason for changing the user's plan..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-20"
              required
            />
            <p className="text-xs text-muted-foreground">
              This information will be recorded for administrative purposes.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedPlanId || !reason.trim() || isLoading}
          >
            {isLoading ? 'Updating...' : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Update Plan
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};