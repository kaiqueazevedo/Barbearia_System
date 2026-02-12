// import { useEffect, useState } from "react";
// import api from "../services/api";
// import "./Paginas.css";

// interface Registro {
//   id: number;
//   descricao: string;
//   entrada: number;
//   saida: number;
//   data: string;
// }

// export default function Financeiro() {
//   const [descricao, setDescricao] = useState("");
//   const [entrada, setEntrada] = useState(0);
//   const [saida, setSaida] = useState(0);
//   const [data, setData] = useState("");
//   const [registros, setRegistros] = useState<Registro[]>([]);
//   const [filtroData, setFiltroData] = useState("");

//   const carregarRegistros = async () => {
//     const url = filtroData ? `/financeiro?data=${filtroData}` : "/financeiro";
//     const res = await api.get(url);
//     setRegistros(res.data);
//   };

//   useEffect(() => {
//     carregarRegistros();
//   }, [filtroData]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!descricao || (!entrada && !saida) || !data) {
//       alert("Preencha todos os campos");
//       return;
//     }

//     const novoRegistro = {
//       id: registros.length > 0 ? Math.max(...registros.map(r => r.id)) + 1 : 1,
//       descricao,
//       entrada,
//       saida,
//       data
//     };

//     try {
//       await api.post("/financeiro", novoRegistro);
//       setDescricao("");
//       setEntrada(0);
//       setSaida(0);
//       setData("");
//       carregarRegistros();
//     } catch (err) {
//       console.error("Erro ao adicionar registro:", err);
//       alert("Erro ao adicionar registro");
//     }
//   };

//   const totalEntrada = registros.reduce((acc, r) => acc + r.entrada, 0);
//   const totalSaida = registros.reduce((acc, r) => acc + r.saida, 0);
//   const totalLiquido = totalEntrada - totalSaida;

//   return (
//     <div className="page-container">
//       <h2>Financeiro</h2>

//       <form onSubmit={handleSubmit} className="form-group">
//         <input
//           type="text"
//           placeholder="Descrição"
//           value={descricao}
//           onChange={(e) => setDescricao(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Entrada"
//           value={entrada}
//           onChange={(e) => setEntrada(Number(e.target.value))}
//         />
//         <input
//           type="number"
//           placeholder="Saída"
//           value={saida}
//           onChange={(e) => setSaida(Number(e.target.value))}
//         />
//         <input
//           type="date"
//           value={data}
//           onChange={(e) => setData(e.target.value)}
//         />
//         <button type="submit">Adicionar Registro</button>
//       </form>

//       <div className="filter-group">
//         <input
//           type="date"
//           value={filtroData}
//           onChange={(e) => setFiltroData(e.target.value)}
//         />
//         <button onClick={carregarRegistros}>Filtrar</button>
//       </div>

//       <table>
//         <thead>
//           <tr>
//             <th>Descrição</th>
//             <th>Entrada</th>
//             <th>Saída</th>
//             <th>Data</th>
//           </tr>
//         </thead>
//         <tbody>
//           {registros.map(r => (
//             <tr key={r.id}>
//               <td>{r.descricao}</td>
//               <td>R$ {r.entrada.toFixed(2)}</td>
//               <td>R$ {r.saida.toFixed(2)}</td>
//               <td>{r.data}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <h3>Resumo</h3>
//       <p>Total Entrada: R$ {totalEntrada.toFixed(2)}</p>
//       <p>Total Saída: R$ {totalSaida.toFixed(2)}</p>
//       <p>Total Líquido: R$ {totalLiquido.toFixed(2)}</p>
//     </div>
//   );
// }





// import { useEffect, useState } from "react";
// import api from "../services/api";
// import "./Paginas.css";

// interface Movimento {
//   id: number;
//   descricao: string;
//   entrada: number;
//   saida: number;
//   data: string;
// }

// export default function Financeiro() {
//   const [movimentos, setMovimentos] = useState<Movimento[]>([]);
//   const [descricao, setDescricao] = useState("");
//   const [entrada, setEntrada] = useState(0);
//   const [saida, setSaida] = useState(0);
//   const [data, setData] = useState("");
//   const [filtro, setFiltro] = useState("dia"); // dia, semana, mes

//   // Carregar movimentos do backend
//   const carregarMovimentos = async () => {
//     try {
//       const res = await api.get("/financeiro");
//       setMovimentos(res.data);
//     } catch (err) {
//       console.error("Erro ao carregar movimentos:", err);
//     }
//   };

//   useEffect(() => {
//     carregarMovimentos();
//   }, []);

//   // Adicionar novo movimento
//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     if (!descricao || (!entrada && !saida) || !data) {
//       alert("Preencha todos os campos corretamente!");
//       return;
//     }

//     try {
//       const novo: Movimento = {
//         id: movimentos.length + 1,
//         descricao,
//         entrada,
//         saida,
//         data,
//       };

//       await api.post("/financeiro", novo);
//       setDescricao("");
//       setEntrada(0);
//       setSaida(0);
//       setData("");
//       carregarMovimentos();
//     } catch (err) {
//       console.error("Erro ao adicionar movimento:", err);
//       alert("Erro ao adicionar movimento");
//     }
//   };

//   // Filtrar movimentos
//   const movimentosFiltrados = movimentos.filter((m) => {
//     const movData = new Date(m.data);
//     const hoje = new Date();

//     if (filtro === "dia") return movData.toDateString() === hoje.toDateString();
//     if (filtro === "semana") {
//       const umaSemanaAtras = new Date();
//       umaSemanaAtras.setDate(hoje.getDate() - 7);
//       return movData >= umaSemanaAtras && movData <= hoje;
//     }
//     if (filtro === "mes") return movData.getMonth() === hoje.getMonth() && movData.getFullYear() === hoje.getFullYear();

//     return true;
//   });

//   const totalEntradas = movimentosFiltrados.reduce((acc, m) => acc + m.entrada, 0);
//   const totalSaidas = movimentosFiltrados.reduce((acc, m) => acc + m.saida, 0);
//   const saldo = totalEntradas - totalSaidas;

//   return (
//     <div className="page-container">
//       <h1 className="title">Financeiro</h1>

//       <div className="filter-group">
//         <button onClick={() => setFiltro("dia")} className={filtro === "dia" ? "active" : ""}>Diário</button>
//         <button onClick={() => setFiltro("semana")} className={filtro === "semana" ? "active" : ""}>Semanal</button>
//         <button onClick={() => setFiltro("mes")} className={filtro === "mes" ? "active" : ""}>Mensal</button>
//       </div>

//       <form onSubmit={handleSubmit} className="financeiro-form">
//         <input
//           type="text"
//           placeholder="Descrição"
//           value={descricao}
//           onChange={(e) => setDescricao(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Entrada (+)"
//           value={entrada}
//           onChange={(e) => setEntrada(parseFloat(e.target.value))}
//         />
//         <input
//           type="number"
//           placeholder="Saída (-)"
//           value={saida}
//           onChange={(e) => setSaida(parseFloat(e.target.value))}
//         />
//         <input
//           type="date"
//           value={data}
//           onChange={(e) => setData(e.target.value)}
//         />
//         <button type="submit">Adicionar</button>
//       </form>

//       <div className="dashboard-cards" style={{ marginTop: "20px" }}>
//         <div className="premium-card">
//           <h4>Total Entradas</h4>
//           <p style={{ color: "#00ff00" }}>R$ {totalEntradas.toFixed(2)}</p>
//         </div>
//         <div className="premium-card">
//           <h4>Total Saídas</h4>
//           <p style={{ color: "#ff0000" }}>R$ {totalSaidas.toFixed(2)}</p>
//         </div>
//         <div className="premium-card">
//           <h4>Saldo</h4>
//           <p style={{ color: "#cba35c" }}>R$ {saldo.toFixed(2)}</p>
//         </div>
//       </div>

//       <table className="financeiro-table">
//         <thead>
//           <tr>
//             <th>Descrição</th>
//             <th>Entrada (+)</th>
//             <th>Saída (-)</th>
//             <th>Data</th>
//           </tr>
//         </thead>
//         <tbody>
//           {movimentosFiltrados.map((m) => (
//             <tr key={m.id}>
//               <td>{m.descricao}</td>
//               <td style={{ color: "#00ff00" }}>{m.entrada.toFixed(2)}</td>
//               <td style={{ color: "#ff0000" }}>{m.saida.toFixed(2)}</td>
//               <td>{m.data}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }




// // src/pages/Financeiro.tsx
// import { useState, useEffect } from "react";
// import api from "../services/api"; // seu axios configurado

// export default function Financeiro() {
//   // → Coloque os states aqui, no início do componente
//   const [movimentos, setMovimentos] = useState<any[]>([]);
//   const [descricao, setDescricao] = useState("");
//   const [tipo, setTipo] = useState("entrada"); // 'entrada' ou 'saida'
//   const [valor, setValor] = useState(0);

//   // Função para adicionar movimento
//   const adicionarMovimento = async () => {
//     if (!descricao || !valor) return alert("Preencha todos os campos");

//     const novo = {
//       id: movimentos.length + 1,
//       descricao,
//       tipo,
//       valor: Number(valor),
//       data: new Date().toISOString().split("T")[0],
//     };

//     setMovimentos([novo, ...movimentos]);

//     try {
//       await api.post("/financeiro", novo);
//     } catch (err) {
//       console.error("Erro ao adicionar movimento:", err);
//       alert("Erro ao adicionar movimento");
//     }

//     setDescricao("");
//     setValor(0);
//     setTipo("entrada");
//   };

//   return (
//     <div className="page-container">
//       <h1 className="title">Financeiro</h1>

//       {/* Formulário */}
//       <div>
//         <input
//           type="text"
//           placeholder="Descrição"
//           value={descricao}
//           onChange={(e) => setDescricao(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Valor"
//           value={valor}
//           onChange={(e) => setValor(Number(e.target.value))}
//         />
//         <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
//           <option value="entrada">Entrada (+)</option>
//           <option value="saida">Saída (-)</option>
//         </select>
//         <button onClick={adicionarMovimento}>Adicionar</button>
//       </div>

//       {/* Grid */}
//       <table>
//         <thead>
//           <tr>
//             <th>Data</th>
//             <th>Descrição</th>
//             <th>Tipo</th>
//             <th>Valor</th>
//           </tr>
//         </thead>
//         <tbody>
//           {movimentos.map((m) => (
//             <tr key={m.id}>
//               <td>{m.data}</td>
//               <td>{m.descricao}</td>
//               <td>{m.tipo}</td>
//               <td style={{ color: m.tipo === "entrada" ? "green" : "red" }}>
//                 {m.tipo === "entrada" ? "+" : "-"} R$ {m.valor.toFixed(2)}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }



// import { useState, useEffect } from "react";
// import api from "../services/api"; // seu axios já configurado
// import "./Financeiro.css"; // se quiser separar estilos

// type Movimento = {
//   descricao: string;
//   tipo: "entrada" | "saida";
//   valor: number;
//   data: string; // ISO string
// };

// export default function Financeiro() {
//   const [movimentos, setMovimentos] = useState<Movimento[]>([]);
//   const [descricao, setDescricao] = useState("");
//   const [tipo, setTipo] = useState<"entrada" | "saida">("entrada");
//   const [valor, setValor] = useState<number>(0);
//   const [filtro, setFiltro] = useState<"dia" | "semana" | "mes">("dia");

//   // Filtra movimentos conforme o filtro selecionado
//   const filtrarMovimentos = (): Movimento[] => {
//     const hoje = new Date();
//     return movimentos.filter((m) => {
//       const dataMov = new Date(m.data);
//       if (filtro === "dia") {
//         return (
//           dataMov.getDate() === hoje.getDate() &&
//           dataMov.getMonth() === hoje.getMonth() &&
//           dataMov.getFullYear() === hoje.getFullYear()
//         );
//       } else if (filtro === "semana") {
//         const inicioSemana = new Date(hoje);
//         inicioSemana.setDate(hoje.getDate() - hoje.getDay());
//         const fimSemana = new Date(inicioSemana);
//         fimSemana.setDate(inicioSemana.getDate() + 6);
//         return dataMov >= inicioSemana && dataMov <= fimSemana;
//       } else if (filtro === "mes") {
//         return (
//           dataMov.getMonth() === hoje.getMonth() &&
//           dataMov.getFullYear() === hoje.getFullYear()
//         );
//       }
//       return true;
//     });
//   };

//   const totalDiario = filtrarMovimentos().reduce((acc, mov) => {
//     return mov.tipo === "entrada" ? acc + mov.valor : acc - mov.valor;
//   }, 0);

//   const adicionarMovimento = async () => {
//     if (!descricao || valor <= 0) return;

//     const novo: Movimento = {
//       descricao,
//       tipo,
//       valor,
//       data: new Date().toISOString(),
//     };

//     setMovimentos([novo, ...movimentos]);

//     try {
//       await api.post("/financeiro/", novo);
//     } catch (error) {
//       console.error("Erro ao adicionar movimento:", error);
//     }

//     // Reset campos
//     setDescricao("");
//     setValor(0);
//     setTipo("entrada");
//   };

//   return (
//     <div className="financeiro-container">
//       <h1>Financeiro</h1>

//       <div className="filtro-container">
//         <label>Filtro: </label>
//         <select
//           value={filtro}
//           onChange={(e) => setFiltro(e.target.value as any)}
//         >
//           <option value="dia">Hoje</option>
//           <option value="semana">Esta semana</option>
//           <option value="mes">Este mês</option>
//         </select>
//       </div>

//       <div className="form-movimento">
//         <input
//           type="text"
//           placeholder="Descrição"
//           value={descricao}
//           onChange={(e) => setDescricao(e.target.value)}
//         />
//         <select value={tipo} onChange={(e) => setTipo(e.target.value as any)}>
//           <option value="entrada">Entrada (+)</option>
//           <option value="saida">Saída (-)</option>
//         </select>
//         <input
//           type="number"
//           placeholder="Valor"
//           value={valor}
//           onChange={(e) => setValor(Number(e.target.value))}
//         />
//         <button onClick={adicionarMovimento}>Adicionar</button>
//       </div>

//       <div className="grid-movimentos">
//         <table>
//           <thead>
//             <tr>
//               <th>Descrição</th>
//               <th>Tipo</th>
//               <th>Valor</th>
//               <th>Data</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filtrarMovimentos().map((mov, index) => (
//               <tr key={index}>
//                 <td>{mov.descricao}</td>
//                 <td>{mov.tipo === "entrada" ? "Entrada (+)" : "Saída (-)"}</td>
//                 <td
//                   className={
//                     mov.tipo === "entrada" ? "valor-entrada" : "valor-saida"
//                   }
//                 >
//                   R$ {mov.valor.toFixed(2)}
//                 </td>
//                 <td>{new Date(mov.data).toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="total-diario">
//         <strong>Total: </strong> R$ {totalDiario.toFixed(2)}
//       </div>
//     </div>
//   );
// }



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
