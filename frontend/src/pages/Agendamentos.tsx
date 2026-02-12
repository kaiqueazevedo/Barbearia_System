

import React, { useEffect, useState, useCallback } from "react";
import api from "../services/api"; // Certifique-se que o baseURL está correto
import "./Paginas.css";

// --- Interfaces ---
interface BaseItem { id: number; nome: string; }
interface Servico extends BaseItem { preco: number; }
interface Agendamento {
  id: number;
  cliente_id: number;
  barbeiro_id: number;
  servico_id: number;
  valor_pago: number;
  data: string;
  status: "Em Espera" | "Realizado" | "Cancelado";
}

export default function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [clientes, setClientes] = useState<BaseItem[]>([]);
  const [barbeiros, setBarbeiros] = useState<BaseItem[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);

  const [loadingData, setLoadingData] = useState(true);
  const [loadingForm, setLoadingForm] = useState(false);
  
  const [form, setForm] = useState({ 
    cliente_id: "", 
    barbeiro_id: "", 
    servico_id: "", 
    valor_pago: "", 
    data: "" 
  });

  // --- Função para carregar dados do servidor ---
  const carregarDados = useCallback(async () => {
    try {
      setLoadingData(true);
      const [resA, resC, resB, resS] = await Promise.all([
        api.get<Agendamento[]>("/agendamentos"),
        api.get<BaseItem[]>("/clientes"),
        api.get<BaseItem[]>("/barbeiros"),
        api.get<Servico[]>("/servicos")
      ]);
      setAgendamentos(resA.data);
      setClientes(resC.data);
      setBarbeiros(resB.data);
      setServicos(resS.data);
    } catch (e: any) { 
      console.error("Erro ao carregar dados:", e.response?.status, e.response?.data || e.message);
      alert("Falha ao sincronizar com o servidor. Verifique se o backend está rodando e as rotas existem.");
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => { carregarDados(); }, [carregarDados]);

  // --- Helpers ---
  const findNome = (lista: BaseItem[], id: number) => lista.find(i => i.id === id)?.nome ?? "---";

  const aoMudarServico = (id: string) => {
    const s = servicos.find(item => item.id === parseInt(id));
    setForm(prev => ({ 
      ...prev, 
      servico_id: id, 
      valor_pago: s ? s.preco.toString() : "" 
    }));
  };

  const mudarStatus = async (id: number, novoStatus: Agendamento["status"]) => {
    try {
      await api.patch(`/agendamentos/${id}/status`, { status: novoStatus });
      carregarDados();
    } catch (e) { 
      alert("Erro ao atualizar status."); 
    }
  };

  const deletarAgendamento = async (id: number) => {
    if (!confirm("Deseja realmente remover este agendamento?")) return;
    try {
      await api.delete(`/agendamentos/${id}`);
      carregarDados();
    } catch (e) {
      alert("Erro ao deletar.");
    }
  };

  // --- Submit ---
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoadingForm(true);

    // Ajuste da data para datetime-local
    const dataFormatada = form.data 
      ? new Date(form.data).toISOString()
      : new Date().toISOString();

    try {
      await api.post("/agendamentos", {
        ...form,
        cliente_id: Number(form.cliente_id),
        barbeiro_id: Number(form.barbeiro_id),
        servico_id: Number(form.servico_id),
        valor_pago: parseFloat(form.valor_pago),
        data: dataFormatada,
        status: "Em Espera" 
      });

      setForm({ cliente_id: "", barbeiro_id: "", servico_id: "", valor_pago: "", data: "" });
      carregarDados();
      alert("Agendamento adicionado com sucesso!");
    } catch (e) { 
      alert("Erro ao salvar. Verifique os campos e se o backend está ativo."); 
      console.error(e);
    } finally {
      setLoadingForm(false);
    }
  }

  return (
    <div className="page-container">
      <h1 className="title">Fila de Atendimento</h1>
      
      <form onSubmit={handleSubmit} className="premium-card form-grid">
        <select 
          value={form.cliente_id} 
          onChange={e => setForm({...form, cliente_id: e.target.value})} 
          required
        >
          <option value="">Selecionar Cliente</option>
          {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
        </select>

        <select 
          value={form.barbeiro_id} 
          onChange={e => setForm({...form, barbeiro_id: e.target.value})} 
          required
        >
          <option value="">Selecionar Barbeiro</option>
          {barbeiros.map(b => <option key={b.id} value={b.id}>{b.nome}</option>)}
        </select>

        <select 
          value={form.servico_id} 
          onChange={e => aoMudarServico(e.target.value)} 
          required
        >
          <option value="">Selecionar Serviço</option>
          {servicos.map(s => <option key={s.id} value={s.id}>{s.nome}</option>)}
        </select>

        <input 
          type="number" 
          step="0.01"
          placeholder="Valor R$" 
          value={form.valor_pago} 
          onChange={e => setForm({...form, valor_pago: e.target.value})} 
          required 
        />
        
        <input 
          type="datetime-local" 
          value={form.data} 
          onChange={e => setForm({...form, data: e.target.value})} 
        />
        
        <button type="submit" className="btn-gold" disabled={loadingForm}>
          {loadingForm ? "Processando..." : "Confirmar"}
        </button>
      </form>

      <div className="premium-card">
        {loadingData && <p style={{ textAlign: 'center' }}>Carregando fila...</p>}
        
        <table className="custom-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Barbeiro</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {agendamentos.map(a => (
              <tr key={a.id}>
                <td>{findNome(clientes, a.cliente_id)}</td>
                <td>{findNome(barbeiros, a.barbeiro_id)}</td>
                <td>
                  <span className={`status-badge ${a.status.toLowerCase().replace(" ", "-")}`}>
                    {a.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    {a.status !== "Realizado" && (
                      <button onClick={() => mudarStatus(a.id, "Realizado")} className="btn-check">
                        ✅ Finalizar
                      </button>
                    )}
                    <button className="btn-delete" onClick={() => deletarAgendamento(a.id)}>
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
