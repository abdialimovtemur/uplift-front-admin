import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import TopicForm from './TopicForm';
import type { Topic } from '@/types/topic';

interface TopicDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  topic?: Topic;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

const TopicDialog: React.FC<TopicDialogProps> = ({
  open,
  onOpenChange,
  topic,
  onSubmit,
  isLoading = false,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {topic ? 'Edit Topic' : 'Create New Topic'}
          </DialogTitle>
          <DialogDescription>
            {topic
              ? 'Update the topic details below.'
              : 'Fill in the details to create a new writing topic.'}
          </DialogDescription>
        </DialogHeader>
        <TopicForm
          topic={topic}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TopicDialog;