import { useState, useEffect } from 'react';
import { Record, RecordFormData, initialRecordFormData, Esteira, FormOptions } from '@/types/record';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface RecordFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record?: Record | null;
  onSave: (data: RecordFormData) => void;
  formOptions?: FormOptions | null;
}

const esteiraOptions: Esteira[] = ['Móvel', 'Fixa', 'Avançado', 'Energia'];

export function RecordForm({ open, onOpenChange, record, onSave, formOptions }: RecordFormProps) {
  const [formData, setFormData] = useState<RecordFormData>(initialRecordFormData);

  const handleConsultorChange = (consultorName: string) => {
    const selectedConsultor = formOptions?.consultor.find(c => c.name === consultorName);
    setFormData(prev => ({
      ...prev,
      consultor: consultorName,
      equipe: selectedConsultor?.equipe || prev.equipe
    }));
  };

  const handlePlanoChange = (planoName: string) => {
    const selectedPlano = formOptions?.plano.find(p => p.name === planoName);
    setFormData(prev => ({
      ...prev,
      plano: planoName,
      valor_do_plano: selectedPlano?.value || prev.valor_do_plano
    }));
  };

  useEffect(() => {
    if (record) {
      const { _id, created_at, updated_at, ...rest } = record;
      setFormData(rest);
    } else {
      setFormData(initialRecordFormData);
    }
  }, [record, open]);

  const handleChange = (field: keyof RecordFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  const isEditing = !!record;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            {isEditing ? 'Editar Registro' : 'Novo Registro'}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? 'Atualize as informações do registro.' : 'Preencha os dados para criar um novo registro.'}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[60vh] pr-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Esteira */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-primary border-b border-border pb-2">
                Classificação
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="esteira">Esteira</Label>
                  <Select
                    value={formData.esteira}
                    onValueChange={(value) => handleChange('esteira', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a esteira" />
                    </SelectTrigger>
                    <SelectContent>
                      {esteiraOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Dados da Empresa */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-primary border-b border-border pb-2">
                Dados da Empresa
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="razao_social">Razão Social</Label>
                  <Input
                    id="razao_social"
                    value={formData.razao_social}
                    onChange={(e) => handleChange('razao_social', e.target.value)}
                    placeholder="Nome da empresa"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input
                    id="cnpj"
                    value={formData.cnpj}
                    onChange={(e) => handleChange('cnpj', e.target.value)}
                    placeholder="00.000.000/0000-00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="uf">UF</Label>
                  <Input
                    id="uf"
                    value={formData.uf}
                    onChange={(e) => handleChange('uf', e.target.value)}
                    placeholder="SP"
                    maxLength={2}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ddd">DDD</Label>
                  <Input
                    id="ddd"
                    value={formData.ddd}
                    onChange={(e) => handleChange('ddd', e.target.value)}
                    placeholder="11"
                    maxLength={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adabas">Adabas</Label>
                  <Input
                    id="adabas"
                    value={formData.adabas}
                    onChange={(e) => handleChange('adabas', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responsavel_p_colocar_na_planilha">Responsável</Label>
                  <Input
                    id="responsavel_p_colocar_na_planilha"
                    value={formData.responsavel_p_colocar_na_planilha}
                    onChange={(e) => handleChange('responsavel_p_colocar_na_planilha', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Identificadores */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-primary border-b border-border pb-2">
                Identificadores
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="crm">CRM</Label>
                  <Input
                    id="crm"
                    value={formData.crm}
                    onChange={(e) => handleChange('crm', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="simulacao">Simulação</Label>
                  <Input
                    id="simulacao"
                    value={formData.simulacao}
                    onChange={(e) => handleChange('simulacao', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pedido">Pedido</Label>
                  <Input
                    id="pedido"
                    value={formData.pedido}
                    onChange={(e) => handleChange('pedido', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="data_entrega">Data Entrega</Label>
                  <Input
                    id="data_entrega"
                    type="date"
                    value={formData.data_entrega}
                    onChange={(e) => handleChange('data_entrega', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Serviços e Planos */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-primary border-b border-border pb-2">
                Serviços e Planos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="servicos">Serviços</Label>
                  <Select
                    value={formData.servicos}
                    onValueChange={(value) => handleChange('servicos', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      {formOptions?.servicos.map((servico) => (
                        <SelectItem key={servico} value={servico}>
                          {servico}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plano">Plano</Label>
                  <Select
                    value={formData.plano}
                    onValueChange={handlePlanoChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o plano" />
                    </SelectTrigger>
                    <SelectContent>
                      {formOptions?.plano.map((p) => (
                        <SelectItem key={p.name} value={p.name}>
                          {p.name} - R$ {p.value.toFixed(2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valor_do_plano">Valor do Plano</Label>
                  <Input
                    id="valor_do_plano"
                    type="number"
                    step="0.01"
                    value={formData.valor_do_plano}
                    onChange={(e) => handleChange('valor_do_plano', parseFloat(e.target.value) || 0)}
                    readOnly
                    className="bg-muted"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantidade_aparelho">Qtd. Aparelhos</Label>
                  <Input
                    id="quantidade_aparelho"
                    type="number"
                    value={formData.quantidade_aparelho}
                    onChange={(e) => handleChange('quantidade_aparelho', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valor_do_aparelho">Valor Aparelho</Label>
                  <Input
                    id="valor_do_aparelho"
                    type="number"
                    step="0.01"
                    value={formData.valor_do_aparelho}
                    onChange={(e) => handleChange('valor_do_aparelho', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qtd_sva">Qtd. SVA</Label>
                  <Input
                    id="qtd_sva"
                    type="number"
                    value={formData.qtd_sva}
                    onChange={(e) => handleChange('qtd_sva', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pacote_sva">Pacote SVA</Label>
                  <Select
                    value={formData.pacote_sva}
                    onValueChange={(value) => handleChange('pacote_sva', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o pacote" />
                    </SelectTrigger>
                    <SelectContent>
                      {formOptions?.pacote_sva.map((pacote) => (
                        <SelectItem key={pacote} value={pacote}>
                          {pacote}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Valores */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-primary border-b border-border pb-2">
                Valores
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="valor_sva">Valor SVA</Label>
                  <Input
                    id="valor_sva"
                    type="number"
                    step="0.01"
                    value={formData.valor_sva}
                    onChange={(e) => handleChange('valor_sva', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valor_atual">Valor Atual</Label>
                  <Input
                    id="valor_atual"
                    type="number"
                    step="0.01"
                    value={formData.valor_atual}
                    onChange={(e) => handleChange('valor_atual', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valor_da_renovacao">Valor Renovação</Label>
                  <Input
                    id="valor_da_renovacao"
                    type="number"
                    step="0.01"
                    value={formData.valor_da_renovacao}
                    onChange={(e) => handleChange('valor_da_renovacao', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qtd">Quantidade</Label>
                  <Input
                    id="qtd"
                    type="number"
                    value={formData.qtd}
                    onChange={(e) => handleChange('qtd', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
            </div>

            {/* Status e Equipe */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-primary border-b border-border pb-2">
                Status e Equipe
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleChange('status', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {formOptions?.status.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="data_do_status">Data Status</Label>
                  <Input
                    id="data_do_status"
                    type="date"
                    value={formData.data_do_status}
                    onChange={(e) => handleChange('data_do_status', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="consultor">Consultor</Label>
                  <Select
                    value={formData.consultor}
                    onValueChange={handleConsultorChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o consultor" />
                    </SelectTrigger>
                    <SelectContent>
                      {formOptions?.consultor.map((c) => (
                        <SelectItem key={c.name} value={c.name}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="equipe">Equipe</Label>
                  <Input
                    id="equipe"
                    value={formData.equipe}
                    readOnly
                    className="bg-muted"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="migracao">Migração</Label>
                  <Select
                    value={formData.migracao}
                    onValueChange={(value) => handleChange('migracao', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SIM">SIM</SelectItem>
                      <SelectItem value="NÃO">NÃO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="base_fresh">Base Fresh</Label>
                  <Select
                    value={formData.base_fresh}
                    onValueChange={(value) => handleChange('base_fresh', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="base">Base</SelectItem>
                      <SelectItem value="fresh">Fresh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="m">M</Label>
                  <Input
                    id="m"
                    value={formData.m}
                    onChange={(e) => handleChange('m', e.target.value)}
                    maxLength={1}
                  />
                </div>
              </div>
            </div>

            {/* Histórico */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-primary border-b border-border pb-2">
                Histórico
              </h3>
              <div className="space-y-2">
                <Label htmlFor="historico">Histórico</Label>
                <Textarea
                  id="historico"
                  value={formData.historico}
                  onChange={(e) => handleChange('historico', e.target.value)}
                  placeholder="Observações e histórico do cliente..."
                  rows={3}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="purple">
                {isEditing ? 'Salvar Alterações' : 'Criar Registro'}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
