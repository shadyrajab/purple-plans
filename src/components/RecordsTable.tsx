import { Record } from '@/types/record';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RecordsTableProps {
  records: Record[];
  onEdit: (record: Record) => void;
  onDelete: (record: Record) => void;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const formatDate = (dateString: string) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('pt-BR');
};

const getEsteiraBadgeVariant = (esteira: string) => {
  switch (esteira) {
    case 'Móvel':
      return 'default';
    case 'Fixa':
      return 'secondary';
    case 'Avançado':
      return 'purple';
    case 'Energia':
      return 'warning';
    default:
      return 'default';
  }
};

export function RecordsTable({ records, onEdit, onDelete }: RecordsTableProps) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
      <ScrollArea className="w-full">
        <div className="min-w-[2500px]">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="font-semibold text-foreground whitespace-nowrap">Esteira</TableHead>
                <TableHead className="font-semibold text-foreground whitespace-nowrap">UF</TableHead>
                <TableHead className="font-semibold text-foreground whitespace-nowrap">DDD</TableHead>
                <TableHead className="font-semibold text-foreground whitespace-nowrap">Adabas</TableHead>
                <TableHead className="font-semibold text-foreground whitespace-nowrap">Responsável</TableHead>
                <TableHead className="font-semibold text-foreground whitespace-nowrap">Data Entrega</TableHead>
                <TableHead className="font-semibold text-foreground whitespace-nowrap">CRM</TableHead>
                <TableHead className="font-semibold text-foreground whitespace-nowrap">Simulação</TableHead>
                <TableHead className="font-semibold text-foreground whitespace-nowrap">Pedido</TableHead>
                <TableHead className="font-semibold text-foreground whitespace-nowrap">Razão Social</TableHead>
                <TableHead className="font-semibold text-foreground whitespace-nowrap">CNPJ</TableHead>
                <TableHead className="font-semibold text-foreground whitespace-nowrap">Serviços</TableHead>
                <TableHead className="font-semibold text-foreground whitespace-nowrap">Plano</TableHead>
                <TableHead className="font-semibold text-foreground whitespace-nowrap">Valor Plano</TableHead>
                <TableHead className="font-semibold text-foreground whitespace-nowrap">Qtd. Aparelhos</TableHead>
                <TableHead className="font-semibold text-foreground whitespace-nowrap">Valor Aparelho</TableHead>
                <TableHead className="font-semibold text-foreground whitespace-nowrap">Qtd. SVA</TableHead>
                <TableHead className="font-semibold text-foreground whitespace-nowrap">Pacote SVA</TableHead>
                <TableHead className="font-semibold text-foreground whitespace-nowrap">Valor SVA</TableHead>
                <TableHead className="font-semibold text-foreground whitespace-nowrap">Valor Atual</TableHead>
                <TableHead className="font-semibold text-foreground whitespace-nowrap">Valor Renovação</TableHead>
                <TableHead className="font-semibold text-foreground whitespace-nowrap">M</TableHead>
                <TableHead className="font-semibold text-foreground whitespace-nowrap">Migração</TableHead>
                <TableHead className="font-semibold text-foreground whitespace-nowrap">Base Fresh</TableHead>
                <TableHead className="font-semibold text-foreground whitespace-nowrap">Qtd</TableHead>
                <TableHead className="font-semibold text-foreground whitespace-nowrap">Status</TableHead>
                <TableHead className="font-semibold text-foreground whitespace-nowrap">Data Status</TableHead>
                <TableHead className="font-semibold text-foreground whitespace-nowrap">Histórico</TableHead>
                <TableHead className="font-semibold text-foreground whitespace-nowrap">Consultor</TableHead>
                <TableHead className="font-semibold text-foreground whitespace-nowrap">Equipe</TableHead>
                <TableHead className="font-semibold text-foreground text-right whitespace-nowrap sticky right-0 bg-muted/50">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={31} className="h-32 text-center text-muted-foreground">
                    Nenhum registro encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                records.map((record, index) => (
                  <TableRow
                    key={record._id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <TableCell>
                      <Badge variant={getEsteiraBadgeVariant(record.esteira)}>
                        {record.esteira}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                        {record.uf}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{record.ddd}</TableCell>
                    <TableCell className="text-muted-foreground">{record.adabas}</TableCell>
                    <TableCell className="text-muted-foreground">{record.responsavel_p_colocar_na_planilha}</TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(record.data_entrega)}</TableCell>
                    <TableCell className="text-muted-foreground">{record.crm}</TableCell>
                    <TableCell className="text-muted-foreground">{record.simulacao}</TableCell>
                    <TableCell className="text-muted-foreground">{record.pedido}</TableCell>
                    <TableCell className="font-medium">{record.razao_social}</TableCell>
                    <TableCell className="text-muted-foreground">{record.cnpj}</TableCell>
                    <TableCell className="text-muted-foreground">{record.servicos}</TableCell>
                    <TableCell>{record.plano}</TableCell>
                    <TableCell className="font-medium text-primary">{formatCurrency(record.valor_do_plano)}</TableCell>
                    <TableCell className="text-center">{record.quantidade_aparelho}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(record.valor_do_aparelho)}</TableCell>
                    <TableCell className="text-center">{record.qtd_sva}</TableCell>
                    <TableCell className="text-muted-foreground">{record.pacote_sva}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(record.valor_sva)}</TableCell>
                    <TableCell className="font-medium text-primary">{formatCurrency(record.valor_atual)}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(record.valor_da_renovacao)}</TableCell>
                    <TableCell className="text-center">{record.m}</TableCell>
                    <TableCell>
                      <Badge variant={record.migracao === 'SIM' ? 'success' : 'secondary'}>
                        {record.migracao}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{record.base_fresh}</TableCell>
                    <TableCell className="text-center">{record.qtd}</TableCell>
                    <TableCell>
                      <StatusBadge status={record.status} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(record.data_do_status)}</TableCell>
                    <TableCell className="text-muted-foreground max-w-[200px] truncate" title={record.historico}>
                      {record.historico}
                    </TableCell>
                    <TableCell>{record.consultor}</TableCell>
                    <TableCell>{record.equipe}</TableCell>
                    <TableCell className="text-right sticky right-0 bg-card">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(record)}
                          className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(record)}
                          className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
