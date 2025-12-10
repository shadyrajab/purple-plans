export interface Record {
  _id: string;
  uf: string;
  ddd: string;
  adabas: string;
  responsavel_p_colocar_na_planilha: string;
  data_entrega: string;
  crm: string;
  simulacao: string;
  pedido: string;
  razao_social: string;
  cnpj: string;
  servicos: string;
  plano: string;
  valor_do_plano: number;
  quantidade_aparelho: number;
  valor_do_aparelho: number;
  qtd_sva: number;
  pacote_sva: string;
  valor_sva: number;
  valor_atual: number;
  valor_da_renovacao: number;
  m: string;
  migracao: string;
  base_fresh: string;
  qtd: number;
  status: string;
  data_do_status: string;
  historico: string;
  consultor: string;
  equipe: string;
  created_at: string;
  updated_at: string;
}

export type RecordFormData = Omit<Record, '_id' | 'created_at' | 'updated_at'>;

export const initialRecordFormData: RecordFormData = {
  uf: '',
  ddd: '',
  adabas: '',
  responsavel_p_colocar_na_planilha: '',
  data_entrega: '',
  crm: '',
  simulacao: '',
  pedido: '',
  razao_social: '',
  cnpj: '',
  servicos: '',
  plano: '',
  valor_do_plano: 0,
  quantidade_aparelho: 0,
  valor_do_aparelho: 0,
  qtd_sva: 0,
  pacote_sva: '',
  valor_sva: 0,
  valor_atual: 0,
  valor_da_renovacao: 0,
  m: '',
  migracao: '',
  base_fresh: '',
  qtd: 0,
  status: 'Ativo',
  data_do_status: '',
  historico: '',
  consultor: '',
  equipe: '',
};
