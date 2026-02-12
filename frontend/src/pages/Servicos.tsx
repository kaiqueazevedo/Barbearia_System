// import { useEffect, useState } from "react";
// import api from "../services/api";
// import "./Paginas.css";

// export default function Servicos() {
//   const [servicos, setServicos] = useState([]);
//   const [nome, setNome] = useState("");
//   const [preco, setPreco] = useState("");

//   const carregar = () => api.get("/servicos").then(res => setServicos(res.data));
  
//   useEffect(() => { carregar(); }, []);

//   async function salvar(e: React.FormEvent) {
//     e.preventDefault();
//     try {
//       await api.post("/servicos", { nome, preco: parseFloat(preco) });
//       setNome("");
//       setPreco("");
//       carregar();
//       alert("Serviço adicionado ao catálogo!");
//     } catch (error) {
//       alert("Erro ao salvar serviço.");
//     }
//   }

//   return (
//     <div className="page-container">
//       <h1 className="title">Catálogo de Serviços</h1>
      
//       <form onSubmit={salvar} className="premium-card form-grid">
//         <input 
//           placeholder="Nome do Serviço (ex: Corte Degradê)" 
//           value={nome} 
//           onChange={e => setNome(e.target.value)} 
//           required 
//         />
//         <input 
//           type="number" 
//           step="0.01"
//           placeholder="Preço R$" 
//           value={preco} 
//           onChange={e => setPreco(e.target.value)} 
//           required 
//         />
//         <button className="btn-gold">Cadastrar Serviço</button>
//       </form>

//       <div className="premium-card">
//         <table className="custom-table">
//           <thead>
//             <tr>
//               <th>Nome</th>
//               <th>Preço</th>
//               <th>Ações</th>
//             </tr>
//           </thead>
//           <tbody>
//             {servicos.map((s: any) => (
//               <tr key={s.id}>
//                 <td>{s.nome}</td>
//                 <td style={{color: '#cba35c', fontWeight: 'bold'}}>R$ {s.preco.toFixed(2)}</td>
//                 <td>
//                   <button 
//                     onClick={async () => { if(confirm("Remover serviço?")) { await api.delete(`/servicos/${s.id}`); carregar(); } }}
//                     style={{background: 'none', border: 'none', cursor: 'pointer'}}
//                   >
//                     🗑️
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


// Servicos.tsx
import { useEffect, useState } from "react";
import api from "../services/api";

interface Servico {
  id: number;
  nome: string;
  preco: number;
}

export default function Servicos() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState<number | "">("");

  const carregarServicos = async () => {
    try {
      const res = await api.get("/servicos");
      setServicos(res.data);
    } catch (err) {
      console.error("Erro ao carregar serviços:", err);
      alert("Não foi possível carregar serviços");
    }
  };

  useEffect(() => {
    carregarServicos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim() || preco === "") {
      alert("Preencha nome e preço do serviço");
      return;
    }

    const novoId = servicos.length > 0 ? Math.max(...servicos.map(s => s.id)) + 1 : 1;

    try {
      await api.post("/servicos", { id: novoId, nome: nome.trim(), preco: Number(preco) });
      setNome("");
      setPreco("");
      carregarServicos();
    } catch (err) {
      console.error("Erro ao cadastrar serviço:", err);
      alert("Erro ao cadastrar serviço");
    }
  };

  return (
    <div className="page-container">
      <h2>Serviços</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do serviço"
        />
        <input
          type="number"
          value={preco}
          onChange={(e) => setPreco(Number(e.target.value))}
          placeholder="Preço R$"
          min={0}
          step={0.01}
        />
        <button type="submit">Adicionar Serviço</button>
      </form>

      <h3>Lista de Serviços</h3>
      <ul>
        {servicos.map((s) => (
          <li key={s.id}>{s.nome} - R$ {s.preco.toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
}
