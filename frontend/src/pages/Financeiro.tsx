
import { useState, useEffect } from "react";
import api from "../services/api"; // seu axios já configurado
import "./Financeiro.css"; // se quiser separar estilos

type Movimento = {
  descricao: string;
  tipo: "entrada" | "saida";
  valor: number;
  data: string; // ISO string
};

export default function Financeiro() {
  const [movimentos, setMovimentos] = useState<Movimento[]>([]);
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState<"entrada" | "saida">("entrada");
  const [valor, setValor] = useState<number>(0);
  const [filtro, setFiltro] = useState<"dia" | "semana" | "mes">("dia");

  // Filtra movimentos conforme o filtro selecionado
  const filtrarMovimentos = (): Movimento[] => {
    const hoje = new Date();
    return movimentos.filter((m) => {
      const dataMov = new Date(m.data);
      if (filtro === "dia") {
        return (
          dataMov.getDate() === hoje.getDate() &&
          dataMov.getMonth() === hoje.getMonth() &&
          dataMov.getFullYear() === hoje.getFullYear()
        );
      } else if (filtro === "semana") {
        const inicioSemana = new Date(hoje);
        inicioSemana.setDate(hoje.getDate() - hoje.getDay());
        const fimSemana = new Date(inicioSemana);
        fimSemana.setDate(inicioSemana.getDate() + 6);
        return dataMov >= inicioSemana && dataMov <= fimSemana;
      } else if (filtro === "mes") {
        return (
          dataMov.getMonth() === hoje.getMonth() &&
          dataMov.getFullYear() === hoje.getFullYear()
        );
      }
      return true;
    });
  };

  const totalDiario = filtrarMovimentos().reduce((acc, mov) => {
    return mov.tipo === "entrada" ? acc + mov.valor : acc - mov.valor;
  }, 0);

  const adicionarMovimento = async () => {
    if (!descricao || valor <= 0) return;

    const novo: Movimento = {
      descricao,
      tipo,
      valor,
      data: new Date().toISOString(),
    };

    setMovimentos([novo, ...movimentos]);

    try {
      await api.post("/financeiro/", novo);
    } catch (error) {
      console.error("Erro ao adicionar movimento:", error);
    }

    // Reset campos
    setDescricao("");
    setValor(0);
    setTipo("entrada");
  };

  return (
    <div className="financeiro-container">
      <h1>Financeiro</h1>

      <div className="filtro-container">
        <label>Filtro: </label>
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value as any)}
        >
          <option value="dia">Hoje</option>
          <option value="semana">Esta semana</option>
          <option value="mes">Este mês</option>
        </select>
      </div>

      <div className="form-movimento">
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <select value={tipo} onChange={(e) => setTipo(e.target.value as any)}>
          <option value="entrada">Entrada (+)</option>
          <option value="saida">Saída (-)</option>
        </select>
        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(Number(e.target.value))}
        />
        <button onClick={adicionarMovimento}>Adicionar</button>
      </div>

      <div className="grid-movimentos">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {filtrarMovimentos().map((mov, index) => (
              <tr key={index}>
                <td>{mov.descricao}</td>
                <td>{mov.tipo === "entrada" ? "Entrada (+)" : "Saída (-)"}</td>
                <td
                  className={
                    mov.tipo === "entrada" ? "valor-entrada" : "valor-saida"
                  }
                >
                  R$ {mov.valor.toFixed(2)}
                </td>
                <td>{new Date(mov.data).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="total-diario">
        <strong>Total: </strong> R$ {totalDiario.toFixed(2)}
      </div>
    </div>
  );
}
