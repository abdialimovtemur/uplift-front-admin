import { useState, useEffect, useRef } from 'react';
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
import { Plus, Minus, Upload } from 'lucide-react';
import type { Plan } from '@/types/pricing';

interface PlanFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (formData: FormData) => void;
  plan?: Plan | null;
  isSubmitting: boolean;
}

interface FormState {
  title: string;
  description: string;
  features: string[];
  price: number;
  currency: string;
  durationInDays: number;
  trialCount: number;
  isActive: boolean;
  billingCycle: 'MONTHLY' | 'YEARLY' | 'LIFETIME';
  type: string;
  status: 'ACTIVE' | 'INACTIVE';
  tags: string[];
  maxUsers: number;
  maxSubmissions: number;
  isPopular: boolean;
  sortOrder: number;
}

export const PlanForm = ({ open, onOpenChange, onSubmit, plan, isSubmitting }: PlanFormProps) => {
  const [formState, setFormState] = useState<FormState>({
    title: '',
    description: '',
    features: [],
    price: 0,
    currency: 'UZS',
    durationInDays: 30,
    trialCount: 0,
    isActive: true,
    billingCycle: 'MONTHLY',
    type: 'FREE',
    status: 'ACTIVE',
    tags: [],
    maxUsers: 1,
    maxSubmissions: 10,
    isPopular: false,
    sortOrder: 0,
  });

  const [iconFile, setIconFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (plan) {
      setFormState({
        title: plan.title || '',
        description: plan.description || '',
        features: plan.features || [],
        price: plan.price || 0,
        currency: plan.currency || 'UZS',
        durationInDays: plan.durationInDays || 30,
        trialCount: plan.trialCount || 0,
        isActive: plan.isActive ?? true,
        billingCycle: plan.billingCycle || 'MONTHLY',
        type: plan.type || 'FREE',
        status: plan.status || 'ACTIVE',
        tags: plan.tags || [],
        maxUsers: plan.maxUsers || 1,
        maxSubmissions: plan.maxSubmissions || 10,
        isPopular: plan.isPopular || false,
        sortOrder: plan.sortOrder || 0,
      });
    } else {
      setFormState({
        title: '',
        description: '',
        features: [],
        price: 0,
        currency: 'UZS',
        durationInDays: 30,
        trialCount: 0,
        isActive: true,
        billingCycle: 'MONTHLY',
        type: 'FREE',
        status: 'ACTIVE',
        tags: [],
        maxUsers: 1,
        maxSubmissions: 10,
        isPopular: false,
        sortOrder: 0,
      });
    }
    setIconFile(null);
  }, [plan, open]);

  const handleChange = (field: keyof FormState, value: any) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formState.features];
    newFeatures[index] = value;
    handleChange('features', newFeatures);
  };

  const addFeature = () => {
    handleChange('features', [...formState.features, '']);
  };

  const removeFeature = (index: number) => {
    const newFeatures = [...formState.features];
    newFeatures.splice(index, 1);
    handleChange('features', newFeatures);
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIconFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create FormData object
    const submitFormData = new FormData();
    
    // Append all form fields
    Object.entries(formState).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          submitFormData.append(`${key}[${index}]`, item);
        });
      } else if (typeof value === 'boolean') {
        submitFormData.append(key, value ? 'true' : 'false');
      } else {
        submitFormData.append(key, value.toString());
      }
    });
    
    // Append icon file if selected
    if (iconFile) {
      submitFormData.append('icon', iconFile);
    }
    
    onSubmit(submitFormData);
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
                value={formState.title}
                onChange={e => handleChange('title', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <Input
                id="type"
                value={formState.type}
                onChange={e => handleChange('type', e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formState.description}
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
                value={formState.price}
                onChange={e => handleChange('price', Number(e.target.value))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={formState.currency}
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
                value={formState.billingCycle}
                onValueChange={value => handleChange('billingCycle', value as 'MONTHLY' | 'YEARLY' | 'LIFETIME')}
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
                value={formState.durationInDays}
                onChange={e => handleChange('durationInDays', Number(e.target.value))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxUsers">Max Users</Label>
              <Input
                id="maxUsers"
                type="number"
                value={formState.maxUsers}
                onChange={e => handleChange('maxUsers', Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxSubmissions">Max Submissions</Label>
              <Input
                id="maxSubmissions"
                type="number"
                value={formState.maxSubmissions}
                onChange={e => handleChange('maxSubmissions', Number(e.target.value))}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Features</Label>
            <div className="space-y-2">
              {formState.features.map((feature, index) => (
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

          <div className="space-y-2">
            <Label htmlFor="icon">Icon (SVG)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="icon"
                type="file"
                accept=".svg"
                onChange={handleIconChange}
                ref={fileInputRef}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                {iconFile ? iconFile.name : 'Choose File'}
              </Button>
              {iconFile && (
                <span className="text-sm text-muted-foreground">
                  {iconFile.name}
                </span>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formState.isActive}
                onCheckedChange={checked => handleChange('isActive', checked)}
              />
              <Label htmlFor="isActive">Active</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="isPopular"
                checked={formState.isPopular}
                onCheckedChange={checked => handleChange('isPopular', checked)}
              />
              <Label htmlFor="isPopular">Popular</Label>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formState.status}
              onValueChange={value => handleChange('status', value as 'ACTIVE' | 'INACTIVE')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
              </SelectContent>
            </Select>
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