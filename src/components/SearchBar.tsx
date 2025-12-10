import { Search, X, Pencil, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Record } from '@/types/record';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  selectedRecord: Record | null;
  onEdit: (record: Record) => void;
  onDelete: (record: Record) => void;
  onClearSelection: () => void;
}

export function SearchBar({ value, onChange, selectedRecord, onEdit, onDelete, onClearSelection }: SearchBarProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por razão social, CNPJ, consultor..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 pr-10 h-11 bg-background border-border"
        />
        {value && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={() => onChange('')}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {selectedRecord && (
        <div className="flex items-center gap-2 animate-fade-in">
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg border border-primary/20">
            <span className="text-sm text-primary font-medium truncate max-w-[200px]">
              {selectedRecord.razao_social}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={onClearSelection}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          <Button
            variant="purple-outline"
            size="sm"
            onClick={() => onEdit(selectedRecord)}
            className="gap-2"
          >
            <Pencil className="h-4 w-4" />
            <span className="hidden sm:inline">Editar</span>
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(selectedRecord)}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Excluir</span>
          </Button>
        </div>
      )}
    </div>
  );
}
