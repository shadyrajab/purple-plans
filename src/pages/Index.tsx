import { useState, useMemo } from 'react';
import { Record, RecordFormData } from '@/types/record';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { RecordsTable } from '@/components/RecordsTable';
import { RecordForm } from '@/components/RecordForm';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';
import { useToast } from '@/hooks/use-toast';
import { useRecords } from '@/hooks/useRecords';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<Record | null>(null);
  const [deletingRecord, setDeletingRecord] = useState<Record | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);
  const { toast } = useToast();

  const {
    records,
    isLoadingRecords,
    formOptions,
    isLoadingConfig,
    createRecord,
    updateRecord,
    deleteRecord,
    isCreating,
    isUpdating,
    isDeleting,
  } = useRecords();

  const filteredRecords = useMemo(() => {
    if (!searchQuery) return records;
    const query = searchQuery.toLowerCase();
    return records.filter(
      (record) =>
        record.razao_social.toLowerCase().includes(query) ||
        record.cnpj.toLowerCase().includes(query) ||
        record.consultor.toLowerCase().includes(query) ||
        record.plano.toLowerCase().includes(query) ||
        record.status.toLowerCase().includes(query)
    );
  }, [records, searchQuery]);

  const handleAddNew = () => {
    setEditingRecord(null);
    setIsFormOpen(true);
  };

  const handleEdit = (record: Record) => {
    setEditingRecord(record);
    setIsFormOpen(true);
  };

  const handleDelete = (record: Record) => {
    setDeletingRecord(record);
  };

  const handleSave = async (formData: RecordFormData) => {
    try {
      if (editingRecord) {
        await updateRecord({ id: editingRecord._id, data: formData });
        toast({
          title: 'Registro atualizado',
          description: 'As alterações foram salvas com sucesso.',
        });
      } else {
        await createRecord(formData);
        toast({
          title: 'Registro criado',
          description: 'O novo registro foi adicionado com sucesso.',
        });
      }
      setSelectedRecord(null);
      setIsFormOpen(false);
    } catch (error) {
      toast({
        title: 'Erro',
        description: error instanceof Error ? error.message : 'Erro ao salvar registro',
        variant: 'destructive',
      });
    }
  };

  const confirmDelete = async () => {
    if (deletingRecord) {
      try {
        await deleteRecord(deletingRecord._id);
        toast({
          title: 'Registro excluído',
          description: 'O registro foi removido com sucesso.',
          variant: 'destructive',
        });
        setDeletingRecord(null);
        setSelectedRecord(null);
      } catch (error) {
        toast({
          title: 'Erro',
          description: error instanceof Error ? error.message : 'Erro ao excluir registro',
          variant: 'destructive',
        });
      }
    }
  };

  if (isLoadingRecords || isLoadingConfig) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onAddNew={handleAddNew} recordCount={records.length} />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <SearchBar 
            value={searchQuery} 
            onChange={setSearchQuery}
            selectedRecord={selectedRecord}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onClearSelection={() => setSelectedRecord(null)}
          />

          <RecordsTable
            records={filteredRecords}
            selectedRecord={selectedRecord}
            onSelectRecord={setSelectedRecord}
          />

          {filteredRecords.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Nenhum resultado para "<span className="font-medium">{searchQuery}</span>"
              </p>
            </div>
          )}
        </div>
      </main>

      <RecordForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        record={editingRecord}
        onSave={handleSave}
        formOptions={formOptions}
      />

      <DeleteConfirmDialog
        open={!!deletingRecord}
        onOpenChange={(open) => !open && setDeletingRecord(null)}
        onConfirm={confirmDelete}
        recordName={deletingRecord?.razao_social || ''}
      />
    </div>
  );
};

export default Index;
