const API_BASE_URL = 'http://147.93.36.49:3002';

// Função auxiliar para criar timeout
function createTimeoutSignal(timeoutMs: number): AbortSignal {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeoutMs);
  return controller.signal;
}

export const api = {
  // GET /config - busca opções do formulário
  async getConfig() {
    try {
      const response = await fetch(`${API_BASE_URL}/config`, {
        signal: createTimeoutSignal(5000), // Timeout de 5 segundos
      });
      if (!response.ok) throw new Error('Erro ao buscar configurações');
      return response.json();
    } catch (error) {
      console.warn('Erro ao buscar configurações da API:', error);
      throw error;
    }
  },

  // GET /crm/records - busca todos os registros
  async getRecords() {
    try {
      const response = await fetch(`${API_BASE_URL}/crm/records?skip=0&limit=100`, {
        signal: createTimeoutSignal(5000), // Timeout de 5 segundos
      });
      if (!response.ok) throw new Error('Erro ao buscar registros');
      const data = await response.json();
      // A API retorna um objeto com { total, skip, limit, records: [...] }
      // Retorna apenas o array de records
      return data.records || [];
    } catch (error) {
      console.warn('Erro ao buscar registros da API:', error);
      throw error;
    }
  },

  // POST /crm/records - cria novo registro
  async createRecord(data: Record<string, unknown>) {
    try {
      // Remove campos que não devem ser enviados para a API (esteira não é esperado pela API)
      const { esteira, ...payload } = data;
      
      // Garante que migracao seja sempre string (a API espera string)
      const normalizedPayload = {
        ...payload,
        migracao: String(payload.migracao || ''),
      };
      
      const response = await fetch(`${API_BASE_URL}/crm/records`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(normalizedPayload),
        signal: createTimeoutSignal(10000), // Timeout de 10 segundos
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao criar registro: ${errorText}`);
      }
      return response.json();
    } catch (error) {
      console.warn('Erro ao criar registro na API:', error);
      throw error;
    }
  },

  // PUT /crm/records/{record_id} - atualiza registro
  async updateRecord(recordId: string, data: Record<string, unknown>) {
    try {
      // Remove campos que não devem ser enviados para a API (esteira não é esperado pela API)
      const { esteira, ...payload } = data;
      
      // Garante que migracao seja sempre string (a API espera string)
      const normalizedPayload = {
        ...payload,
        migracao: String(payload.migracao || ''),
      };
      
      const response = await fetch(`${API_BASE_URL}/crm/records/${recordId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(normalizedPayload),
        signal: createTimeoutSignal(10000), // Timeout de 10 segundos
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao atualizar registro: ${errorText}`);
      }
      return response.json();
    } catch (error) {
      console.warn('Erro ao atualizar registro na API:', error);
      throw error;
    }
  },

  // DELETE /crm/records/{record_id} - exclui registro
  async deleteRecord(recordId: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/crm/records/${recordId}`, {
        method: 'DELETE',
        signal: createTimeoutSignal(10000), // Timeout de 10 segundos
      });
      if (!response.ok) throw new Error('Erro ao excluir registro');
      return response.json();
    } catch (error) {
      console.warn('Erro ao excluir registro na API:', error);
      throw error;
    }
  },
};
