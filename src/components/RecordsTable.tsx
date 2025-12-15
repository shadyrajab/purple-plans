import { Record } from '@/types/record';
import { StatusBadge } from '@/components/StatusBadge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface RecordsTableProps {
  records: Record[];
  selectedRecord: Record | null;
  onSelectRecord: (record: Record | null) => void;
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

export function RecordsTable({ records, selectedRecord, onSelectRecord }: RecordsTableProps) {
  const handleRowClick = (record: Record) => {
    if (selectedRecord?._id === record._id) {
      onSelectRecord(null);
    } else {
      onSelectRecord(record);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm w-full">
      <ScrollArea className="w-full">
        <div className="w-full min-w-[2500px]">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors bg-muted/50 hover:bg-muted/50">
                <th className="h-12 px-4 text-left align-middle font-semibold text-foreground whitespace-nowrap">Esteira</th>
                <th className="h-12 px-4 text-left align-middle font-semibold text-foreground whitespace-nowrap">UF</th>
                <th className="h-12 px-4 text-left align-middle font-semibold text-foreground whitespace-nowrap">DDD</th>
                <th className="h-12 px-4 text-left align-middle font-semibold text-foreground whitespace-nowrap">Adabas</th>
                <th className="h-12 px-4 text-left align-middle font-semibold text-foreground whitespace-nowrap">Responsável</th>
                <th className="h-12 px-4 text-left align-middle font-semibold text-foreground whitespace-nowrap">Data Entrega</th>
                <th className="h-12 px-4 text-left align-middle font-semibold text-foreground whitespace-nowrap">CRM</th>
                <th className="h-12 px-4 text-left align-middle font-semibold text-foreground whitespace-nowrap">Simulação</th>
                <th className="h-12 px-4 text-left align-middle font-semibold text-foreground whitespace-nowrap">Pedido</th>
                <th className="h-12 px-4 text-left align-middle font-semibold text-foreground whitespace-nowrap">Razão Social</th>
                <th className="h-12 px-4 text-left align-middle font-semibold text-foreground whitespace-nowrap">CNPJ</th>
                <th className="h-12 px-4 text-left align-middle font-semibold text-foreground whitespace-nowrap">Serviços</th>
                <th className="h-12 px-4 text-left align-middle font-semibold text-foreground whitespace-nowrap">Plano</th>
                <th className="h-12 px-4 text-left align-middle font-semibold text-foreground whitespace-nowrap">Valor Plano</th>
                <th className="h-12 px-4 text-left align-middle font-semibold text-foreground whitespace-nowrap">Qtd. Aparelhos</th>
                <th className="h-12 px-4 text-left align-middle font-semibold text-foreground whitespace-nowrap">Valor Aparelho</th>
                <th className="h-12 px-4 text-left align-middle font-semibold text-foreground whitespace-nowrap">Qtd. SVA</th>
                <th className="h-12 px-4 text-left align-middle font-semibold text-foreground whitespace-nowrap">Pacote SVA</th>
                <th className="h-12 px-4 text-left align-middle font-semibold text-foreground whitespace-nowrap">Valor SVA</th>
                <th className="h-12 px-4 text-left align-middle font-semibold text-foreground whitespace-nowrap">Valor Atual</th>
                <th className="h-12 px-4 text-left align-middle font-semibold text-foreground whitespace-nowrap">Valor Renovação</th>
                <th className="h-12 px-4 text-left align-middle font-semibold text-foreground whitespace-nowrap">M</th>
                <th className="h-12 px-4 text-left align-middle font-semibold text-foreground whitespace-nowrap">Migração</th>
                <th className="h-12 px-4 text-left align-middle font-semibold text-foreground whitespace-nowrap">Base Fresh</th>
                <th className="h-12 px-4 text-left align-middle font-semibold text-foreground whitespace-nowrap">Qtd</th>
                <th className="h-12 px-4 text-left align-middle font-semibold text-foreground whitespace-nowrap">Status</th>
                <th className="h-12 px-4 text-left align-middle font-semibold text-foreground whitespace-nowrap">Data Status</th>
                <th className="h-12 px-4 text-left align-middle font-semibold text-foreground whitespace-nowrap">Histórico</th>
                <th className="h-12 px-4 text-left align-middle font-semibold text-foreground whitespace-nowrap">Consultor</th>
                <th className="h-12 px-4 text-left align-middle font-semibold text-foreground whitespace-nowrap">Equipe</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {records.length === 0 ? (
                <tr>
                  <td colSpan={30} className="p-4 align-middle h-32 text-center text-muted-foreground">
                    Nenhum registro encontrado.
                  </td>
                </tr>
              ) : (
                records.map((record, index) => (
                  <tr
                    key={record._id}
                    className={`border-b transition-colors animate-fade-in cursor-pointer ${
                      selectedRecord?._id === record._id 
                        ? 'bg-primary/10 hover:bg-primary/15' 
                        : 'hover:bg-muted/50'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => handleRowClick(record)}
                  >
                    <td className="p-4 align-middle">
                      <Badge variant={getEsteiraBadgeVariant(record.esteira)}>
                        {record.esteira}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                        {record.uf}
                      </span>
                    </td>
                    <td className="p-4 align-middle text-muted-foreground">{record.ddd}</td>
                    <td className="p-4 align-middle text-muted-foreground">{record.adabas}</td>
                    <td className="p-4 align-middle text-muted-foreground">{record.responsavel_p_colocar_na_planilha}</td>
                    <td className="p-4 align-middle text-muted-foreground">{formatDate(record.data_entrega)}</td>
                    <td className="p-4 align-middle text-muted-foreground">{record.crm}</td>
                    <td className="p-4 align-middle text-muted-foreground">{record.simulacao}</td>
                    <td className="p-4 align-middle text-muted-foreground">{record.pedido}</td>
                    <td className="p-4 align-middle font-medium">{record.razao_social}</td>
                    <td className="p-4 align-middle text-muted-foreground">{record.cnpj}</td>
                    <td className="p-4 align-middle text-muted-foreground">{record.servicos}</td>
                    <td className="p-4 align-middle">{record.plano}</td>
                    <td className="p-4 align-middle font-medium text-primary">{formatCurrency(record.valor_do_plano)}</td>
                    <td className="p-4 align-middle text-center">{record.quantidade_aparelho}</td>
                    <td className="p-4 align-middle font-medium">{formatCurrency(record.valor_do_aparelho)}</td>
                    <td className="p-4 align-middle text-center">{record.qtd_sva}</td>
                    <td className="p-4 align-middle text-muted-foreground">{record.pacote_sva}</td>
                    <td className="p-4 align-middle font-medium">{formatCurrency(record.valor_sva)}</td>
                    <td className="p-4 align-middle font-medium text-primary">{formatCurrency(record.valor_atual)}</td>
                    <td className="p-4 align-middle font-medium">{formatCurrency(record.valor_da_renovacao)}</td>
                    <td className="p-4 align-middle text-center">{record.m}</td>
                    <td className="p-4 align-middle text-center">{String(record.migracao)}</td>
                    <td className="p-4 align-middle text-muted-foreground">{record.base_fresh}</td>
                    <td className="p-4 align-middle text-center">{record.qtd}</td>
                    <td className="p-4 align-middle">
                      <StatusBadge status={record.status} />
                    </td>
                    <td className="p-4 align-middle text-muted-foreground">{formatDate(record.data_do_status)}</td>
                    <td className="p-4 align-middle text-muted-foreground max-w-[200px] truncate" title={record.historico}>
                      {record.historico}
                    </td>
                    <td className="p-4 align-middle">{record.consultor}</td>
                    <td className="p-4 align-middle">{record.equipe}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
