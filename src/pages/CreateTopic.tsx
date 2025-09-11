'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Edit, Trash2 } from 'lucide-react';
import TopicDialog from '@/components/topics/TopicDialog';
import DeleteTopicDialog from '@/components/topics/DeleteTopicDialog';
import { useTopicsQuery } from '@/api/queries/topics';
import { useCreateTopicMutation, useDeleteTopicMutation, useUpdateTopicMutation } from '@/api/mutations/topics';
import type { Topic, TopicFilters } from '@/types/topic';

const TopicsManagement: React.FC = () => {
  const [filters] = useState<TopicFilters>({
    page: 1,
    limit: 100, // Increased limit to show more items without pagination
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  const [selectedTopic, setSelectedTopic] = useState<Topic | undefined>();
  const [topicToDelete, setTopicToDelete] = useState<Topic | undefined>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { data, isLoading, error } = useTopicsQuery(filters);
  const createMutation = useCreateTopicMutation();
  const updateMutation = useUpdateTopicMutation();
  const deleteMutation = useDeleteTopicMutation();

  const handleCreateTopic = () => {
    setSelectedTopic(undefined);
    setDialogOpen(true);
  };

  const handleEditTopic = (topic: Topic) => {
    setSelectedTopic(topic);
    setDialogOpen(true);
  };

  const handleDeleteTopic = (topic: Topic) => {
    setTopicToDelete(topic);
    setDeleteDialogOpen(true);
  };

  const handleSubmit = (formData: any) => {
    if (selectedTopic) {
      updateMutation.mutate({ id: selectedTopic._id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
    setDialogOpen(false);
  };

  const confirmDelete = () => {
    if (topicToDelete) {
      deleteMutation.mutate(topicToDelete._id);
      setDeleteDialogOpen(false);
      setTopicToDelete(undefined);
    }
  };

  const getTaskTypeBadge = (type: string) => {
    return type === 'TASK_ONE' 
      ? <Badge variant="secondary">Task 1</Badge>
      : <Badge variant="default">Task 2</Badge>;
  };

  return (
    <div className="container mx-auto space-y-6 py-6">
      {/* Header */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>IELTS Writing Topics</CardTitle>
              <CardDescription>
                Manage IELTS writing topics for Task 1 and Task 2
              </CardDescription>
            </div>
            <Button onClick={handleCreateTopic} className="sm:ml-auto">
              <Plus className="h-4 w-4 mr-2" />
              New Topic
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Topics Table */}
      <Card>
        <CardContent className="pt-6">
          {error ? (
            <div className="text-center text-destructive py-8">
              Error: {error.message}
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
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Question</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.data.map((topic, index) => (
                    <TableRow key={topic._id}>
                      <TableCell className="font-medium text-center">
                        {index + 1}
                      </TableCell>
                      <TableCell className="font-medium">
                        {topic.title}
                      </TableCell>
                      <TableCell>
                        {getTaskTypeBadge(topic.type)}
                      </TableCell>
                      <TableCell className="max-w-md">
                        <div className="line-clamp-2">
                          {topic.question}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(topic.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEditTopic(topic)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDeleteTopic(topic)}
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
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <div className="mb-4">No topics found</div>
              <Button onClick={handleCreateTopic}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Topic
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      <TopicDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        topic={selectedTopic}
        onSubmit={handleSubmit}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      <DeleteTopicDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        topic={topicToDelete}
        onConfirm={confirmDelete}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};

export default TopicsManagement;