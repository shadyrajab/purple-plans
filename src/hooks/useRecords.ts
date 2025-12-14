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
    queryFn: async () => {
      try {
        const data = await api.getRecords();
        // Garante que sempre retorna um array
        if (Array.isArray(data)) {
          // Normaliza os dados da API (adiciona esteira se não existir, converte migracao se necessário)
          return data.map((record: any) => ({
            ...record,
            esteira: record.esteira || 'Móvel', // Valor padrão se não vier da API
            migracao: typeof record.migracao === 'string' 
              ? (record.migracao === 'SIM' ? 1 : 0) 
              : (record.migracao || 0),
          }));
        }
        // Se não for array, retorna mock
        console.warn('API retornou dados em formato inesperado, usando dados mock');
        return mockRecords;
      } catch (error) {
        console.warn('Erro ao buscar registros, usando dados mock:', error);
        return mockRecords;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  const configQuery = useQuery({
    queryKey: ['config'],
    queryFn: async () => {
      try {
        return await api.getConfig();
      } catch (error) {
        console.warn('Erro ao buscar configurações, usando fallback:', error);
        return fallbackFormOptions;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
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

  // Garante que records seja sempre um array
  const recordsData = recordsQuery.data;
  let records: Record[] = mockRecords;
  
  if (recordsData) {
    if (Array.isArray(recordsData)) {
      records = recordsData;
    } else if (typeof recordsData === 'object' && 'data' in recordsData && Array.isArray(recordsData.data)) {
      records = recordsData.data;
    } else {
      console.warn('Dados de records não são um array válido, usando mock:', recordsData);
      records = mockRecords;
    }
  }
  
  const formOptions = (configQuery.data || fallbackFormOptions) as FormOptions;
  
  // Se a query ainda está carregando, mostra loading
  const isLoadingRecords = recordsQuery.isLoading;
  const isLoadingConfig = configQuery.isLoading;

  return {
    records: Array.isArray(records) ? records : mockRecords,
    isLoadingRecords,
    recordsError: recordsQuery.error,
    formOptions: formOptions || fallbackFormOptions,
    isLoadingConfig,
    configError: configQuery.error,
    createRecord: createMutation.mutateAsync,
    updateRecord: updateMutation.mutateAsync,
    deleteRecord: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
