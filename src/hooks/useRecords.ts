import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import { Record, RecordFormData, FormOptions } from '@/types/record';
import { mockRecords } from '@/data/mockRecords';

// Fallback options quando a API não está disponível
const fallbackFormOptions: FormOptions = {
  consultor: [
    { name: 'João Silva', equipe: 'Equipe A' },
    { name: 'Maria Santos', equipe: 'Equipe B' },
  ],
  status: ['Ativo', 'Inativo', 'Pendente'],
  servicos: ['Internet', 'Telefone', 'TV'],
  plano: [
    { name: 'Plano Básico', value: 99.9 },
    { name: 'Plano Premium', value: 199.9 },
  ],
  pacote_sva: ['Pacote Completo', 'Pacote Básico'],
};

export function useRecords() {
  const queryClient = useQueryClient();

  const recordsQuery = useQuery({
    queryKey: ['records'],
    queryFn: api.getRecords,
    retry: 1,
  });

  const configQuery = useQuery({
    queryKey: ['config'],
    queryFn: api.getConfig,
    retry: 1,
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

  // Usa dados mock se a API falhar
  const records = recordsQuery.data as Record[] | undefined;
  const formOptions = configQuery.data as FormOptions | undefined;

  return {
    records: records || mockRecords,
    isLoadingRecords: recordsQuery.isLoading,
    recordsError: recordsQuery.error,
    formOptions: formOptions || fallbackFormOptions,
    isLoadingConfig: configQuery.isLoading,
    configError: configQuery.error,
    createRecord: createMutation.mutateAsync,
    updateRecord: updateMutation.mutateAsync,
    deleteRecord: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
