const API_BASE_URL = 'http://147.93.36.49:3002';

export const api = {
  // GET /config - busca opções do formulário
  async getConfig() {
    const response = await fetch(`${API_BASE_URL}/config`);
    if (!response.ok) throw new Error('Erro ao buscar configurações');
    return response.json();
  },

  // GET /crm/records - busca todos os registros
  async getRecords() {
    const response = await fetch(`${API_BASE_URL}/crm/records`);
    if (!response.ok) throw new Error('Erro ao buscar registros');
    return response.json();
  },

  // POST /crm/records - cria novo registro
  async createRecord(data: Record<string, unknown>) {
    const response = await fetch(`${API_BASE_URL}/crm/records`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erro ao criar registro');
    return response.json();
  },

  // PUT /crm/records/{record_id} - atualiza registro
  async updateRecord(recordId: string, data: Record<string, unknown>) {
    const response = await fetch(`${API_BASE_URL}/crm/records/${recordId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erro ao atualizar registro');
    return response.json();
  },

  // DELETE /crm/records/{record_id} - exclui registro
  async deleteRecord(recordId: string) {
    const response = await fetch(`${API_BASE_URL}/crm/records/${recordId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao excluir registro');
    return response.json();
  },
};
