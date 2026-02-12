

// import { useEffect, useState } from "react";
// import api from "../services/api";
// import "./Paginas.css";

// export default function Dashboard() {
//   const [agendamentos, setAgendamentos] = useState([]);
//   const [barbeiros, setBarbeiros] = useState([]);
//   const [filtro, setFiltro] = useState("dia"); // dia, semana, mes

//   useEffect(() => {
//     api.get("/agendamentos").then(res => setAgendamentos(res.data));
//     api.get("/barbeiros").then(res => setBarbeiros(res.data));
//   }, []);


  
//   const agendamentosFiltrados = agendamentos.filter((a: any) => {
//     if (a.status !== "Concluído") return false;
//     if (!a.data) return true; // Se não tem data, assume que foi hoje para o teste

//     const dataA = new Date(a.data);
//     const hoje = new Date();
  
//   const agendamentosRealizados = agendamentos.filter((a: any) => a.status === "Realizado");
// const faturamentoTotal = agendamentosRealizados.reduce((acc, curr: any) => acc + curr.valor_pago, 0);

//     if (filtro === "dia") return dataA.toDateString() === hoje.toDateString();
//     if (filtro === "semana") {
//         const umaSemanaAtras = new Date();
//         umaSemanaAtras.setDate(hoje.getDate() - 7);
//         return dataA >= umaSemanaAtras;
//     }
//     if (filtro === "mes") return dataA.getMonth() === hoje.getMonth() && dataA.getFullYear() === hoje.getFullYear();
//     return true;
//   });

//   const totalGeral = agendamentosFiltrados.reduce((acc, curr: any) => acc + curr.valor_pago, 0);

//   return (
//     <div className="page-container">
//       <h1 className="title">Dashboard Financeiro</h1>
      
//       <div className="filter-group">
//         <button onClick={() => setFiltro("dia")} className={filtro === "dia" ? "active" : ""}>Diário</button>
//         <button onClick={() => setFiltro("semana")} className={filtro === "semana" ? "active" : ""}>Semanal</button>
//         <button onClick={() => setFiltro("mes")} className={filtro === "mes" ? "active" : ""}>Mensal</button>
//       </div>

//       <div className="dashboard-cards">
//         <div className="premium-card stat">
//           <h3>Faturamento ({filtro})</h3>
//           <p className="stat-number" style={{color: '#00ff00'}}>R$ {totalGeral.toFixed(2)}</p>
//         </div>
//       </div>

//       <h2 className="title" style={{marginTop: '30px'}}>Produção por Profissional</h2>
//       <div className="dashboard-cards">
//         {barbeiros.map((b: any) => {
//           const valor = agendamentosFiltrados
//             .filter((a: any) => a.barbeiro_id === b.id)
//             .reduce((acc, curr: any) => acc + curr.valor_pago, 0);
//           return (
//             <div key={b.id} className="premium-card">
//               <h4>{b.nome}</h4>
//               <p style={{color: '#cba35c'}}>R$ {valor.toFixed(2)}</p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import api from "../services/api";
import "./Paginas.css";

export default function Dashboard() {
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const [barbeiros, setBarbeiros] = useState<any[]>([]);
  const [filtro, setFiltro] = useState<"dia" | "semana" | "mes">("dia");

  useEffect(() => {
    // Carrega agendamentos e barbeiros do backend
    api.get("/agendamentos").then(res => setAgendamentos(res.data));
    api.get("/barbeiros").then(res => setBarbeiros(res.data));
  }, []);

  // Função para verificar se a data do agendamento entra no filtro
  const filtrarData = (dataStr: string) => {
    const dataAgendamento = new Date(dataStr);
    const hoje = new Date();

    if (filtro === "dia") {
      return dataAgendamento.toDateString() === hoje.toDateString();
    }
    if (filtro === "semana") {
      const semanaAtras = new Date();
      semanaAtras.setDate(hoje.getDate() - 7);
      return dataAgendamento >= semanaAtras && dataAgendamento <= hoje;
    }
    if (filtro === "mes") {
      return (
        dataAgendamento.getMonth() === hoje.getMonth() &&
        dataAgendamento.getFullYear() === hoje.getFullYear()
      );
    }
    return true;
  };

  // Apenas agendamentos realizados
  const agendamentosRealizados = agendamentos.filter(
    a => a.status.toLowerCase() === "realizado" && a.data && filtrarData(a.data)
  );

  // Faturamento total
  const faturamentoTotal = agendamentosRealizados.reduce(
    (acc, curr) => acc + curr.valor_pago,
    0
  );

  return (
    <div className="page-container">
      <h1 className="title">Dashboard Financeiro</h1>

      <div className="filter-group">
        <button onClick={() => setFiltro("dia")} className={filtro === "dia" ? "active" : ""}>
          Diário
        </button>
        <button onClick={() => setFiltro("semana")} className={filtro === "semana" ? "active" : ""}>
          Semanal
        </button>
        <button onClick={() => setFiltro("mes")} className={filtro === "mes" ? "active" : ""}>
          Mensal
        </button>
      </div>

      <div className="dashboard-cards">
        <div className="premium-card stat">
          <h3>Faturamento ({filtro})</h3>
          <p className="stat-number" style={{ color: "#00ff00" }}>
            R$ {faturamentoTotal.toFixed(2)}
          </p>
        </div>
      </div>

      <h2 className="title" style={{ marginTop: "30px" }}>
        Produção por Profissional
      </h2>
      <div className="dashboard-cards">
        {barbeiros.map(b => {
          const valorPorBarbeiro = agendamentosRealizados
            .filter(a => a.barbeiro_id === b.id)
            .reduce((acc, curr) => acc + curr.valor_pago, 0);

          return (
            <div key={b.id} className="premium-card">
              <h4>{b.nome}</h4>
              <p style={{ color: "#cba35c" }}>R$ {valorPorBarbeiro.toFixed(2)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
