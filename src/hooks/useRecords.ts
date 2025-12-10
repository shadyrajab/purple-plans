import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import { Record, RecordFormData, FormOptions } from '@/types/record';

export function useRecords() {
  const queryClient = useQueryClient();

  const recordsQuery = useQuery({
    queryKey: ['records'],
    queryFn: api.getRecords,
  });

  const configQuery = useQuery({
    queryKey: ['config'],
    queryFn: api.getConfig,
  });

  const createMutation = useMutation({
    mutationFn: (data: RecordFormData) => api.createRecord(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['records'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: RecordFormData }) =>
      api.updateRecord(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['records'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.deleteRecord(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['records'] });
    },
  });

  return {
    records: (recordsQuery.data as Record[]) || [],
    isLoadingRecords: recordsQuery.isLoading,
    recordsError: recordsQuery.error,
    formOptions: configQuery.data as FormOptions | undefined,
    isLoadingConfig: configQuery.isLoading,
    createRecord: createMutation.mutateAsync,
    updateRecord: updateMutation.mutateAsync,
    deleteRecord: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
