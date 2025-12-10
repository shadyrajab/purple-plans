import { Button } from '@/components/ui/button';
import { Plus, Database } from 'lucide-react';

interface HeaderProps {
  onAddNew: () => void;
  recordCount: number;
}

export function Header({ onAddNew, recordCount }: HeaderProps) {
  return (
    <header className="bg-gradient-subtle border-b border-border">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-primary shadow-purple">
              <Database className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Gestão de Registros
              </h1>
              <p className="text-sm text-muted-foreground">
                {recordCount} {recordCount === 1 ? 'registro' : 'registros'} cadastrados
              </p>
            </div>
          </div>
          <Button variant="purple" onClick={onAddNew} className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Registro
          </Button>
        </div>
      </div>
    </header>
  );
}
