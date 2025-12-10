import { useState, useMemo } from 'react';
import { Record, RecordFormData, FormOptions } from '@/types/record';
import { mockRecords } from '@/data/mockRecords';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { RecordsTable } from '@/components/RecordsTable';
import { RecordForm } from '@/components/RecordForm';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';
import { useToast } from '@/hooks/use-toast';

// Mock form options - in production this would come from an API
const mockFormOptions: FormOptions = {
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

const Index = () => {
  const [records, setRecords] = useState<Record[]>(mockRecords);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<Record | null>(null);
  const [deletingRecord, setDeletingRecord] = useState<Record | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);
  const [formOptions] = useState<FormOptions>(mockFormOptions);
  const { toast } = useToast();

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

  const handleSave = (formData: RecordFormData) => {
    if (editingRecord) {
      setRecords((prev) =>
        prev.map((record) =>
          record._id === editingRecord._id
            ? {
                ...record,
                ...formData,
                updated_at: new Date().toISOString(),
              }
            : record
        )
      );
      toast({
        title: 'Registro atualizado',
        description: 'As alterações foram salvas com sucesso.',
      });
    } else {
      const newRecord: Record = {
        ...formData,
        _id: `${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setRecords((prev) => [newRecord, ...prev]);
      toast({
        title: 'Registro criado',
        description: 'O novo registro foi adicionado com sucesso.',
      });
    }
    setSelectedRecord(null);
  };

  const confirmDelete = () => {
    if (deletingRecord) {
      setRecords((prev) => prev.filter((record) => record._id !== deletingRecord._id));
      toast({
        title: 'Registro excluído',
        description: 'O registro foi removido com sucesso.',
        variant: 'destructive',
      });
      setDeletingRecord(null);
      setSelectedRecord(null);
    }
  };

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
