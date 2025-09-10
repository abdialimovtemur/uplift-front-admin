import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Minus } from 'lucide-react';
import type { Plan } from '@/types/pricing';

interface PlanFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Partial<Plan>) => void;
  plan?: Plan | null;
  isSubmitting: boolean;
}

export const PlanForm = ({ open, onOpenChange, onSubmit, plan, isSubmitting }: PlanFormProps) => {
  const [formData, setFormData] = useState<Partial<Plan>>({
    title: '',
    description: '',
    features: [],
    price: 0,
    currency: 'UZS',
    durationInDays: 30,
    trialCount: 0,
    isActive: true,
    billingCycle: 'MONTHLY',
    type: '',
    status: 'ACTIVE',
    tags: [],
    maxUsers: 1,
    maxSubmissions: 10,
    isPopular: false,
    sortOrder: 0,
  });

  useEffect(() => {
    if (plan) {
      setFormData(plan);
    } else {
      setFormData({
        title: '',
        description: '',
        features: [],
        price: 0,
        currency: 'UZS',
        durationInDays: 30,
        trialCount: 0,
        isActive: true,
        billingCycle: 'MONTHLY',
        type: '',
        status: 'ACTIVE',
        tags: [],
        maxUsers: 1,
        maxSubmissions: 10,
        isPopular: false,
        sortOrder: 0,
      });
    }
  }, [plan, open]);

  const handleChange = (field: keyof Plan, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...(formData.features || [])];
    newFeatures[index] = value;
    handleChange('features', newFeatures);
  };

  const addFeature = () => {
    handleChange('features', [...(formData.features || []), '']);
  };

  const removeFeature = (index: number) => {
    const newFeatures = [...(formData.features || [])];
    newFeatures.splice(index, 1);
    handleChange('features', newFeatures);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{plan ? 'Edit Plan' : 'Create New Plan'}</DialogTitle>
          <DialogDescription>
            {plan ? 'Update the plan details' : 'Add a new subscription plan to your system'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title || ''}
                onChange={e => handleChange('title', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <Input
                id="type"
                value={formData.type || ''}
                onChange={e => handleChange('type', e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={e => handleChange('description', e.target.value)}
              required
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price || 0}
                onChange={e => handleChange('price', Number(e.target.value))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={formData.currency || 'UZS'}
                onValueChange={value => handleChange('currency', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UZS">UZS</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="billingCycle">Billing Cycle</Label>
              <Select
                value={formData.billingCycle || 'MONTHLY'}
                onValueChange={value => handleChange('billingCycle', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select cycle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MONTHLY">Monthly</SelectItem>
                  <SelectItem value="YEARLY">Yearly</SelectItem>
                  <SelectItem value="LIFETIME">Lifetime</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="durationInDays">Duration (Days) *</Label>
              <Input
                id="durationInDays"
                type="number"
                value={formData.durationInDays || 0}
                onChange={e => handleChange('durationInDays', Number(e.target.value))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxUsers">Max Users</Label>
              <Input
                id="maxUsers"
                type="number"
                value={formData.maxUsers || 0}
                onChange={e => handleChange('maxUsers', Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxSubmissions">Max Submissions</Label>
              <Input
                id="maxSubmissions"
                type="number"
                value={formData.maxSubmissions || 0}
                onChange={e => handleChange('maxSubmissions', Number(e.target.value))}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Features</Label>
            <div className="space-y-2">
              {(formData.features || []).map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={feature}
                    onChange={e => handleFeatureChange(index, e.target.value)}
                    placeholder={`Feature ${index + 1}`}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeFeature(index)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addFeature}>
                <Plus className="h-4 w-4 mr-2" /> Add Feature
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive || false}
                onCheckedChange={checked => handleChange('isActive', checked)}
              />
              <Label htmlFor="isActive">Active</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="isPopular"
                checked={formData.isPopular || false}
                onCheckedChange={checked => handleChange('isPopular', checked)}
              />
              <Label htmlFor="isPopular">Popular</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : plan ? 'Update Plan' : 'Create Plan'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};