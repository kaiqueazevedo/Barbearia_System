// import { useEffect, useState } from "react";
// import api from "../services/api";
// import "./Paginas.css";

// export default function Barbeiros() {
//   const [barbeiros, setBarbeiros] = useState([]);
//   const [nome, setNome] = useState("");

//   const carregar = () => api.get("/barbeiros").then(res => setBarbeiros(res.data));
  
//   useEffect(() => { carregar(); }, []);

//   async function salvar(e: React.FormEvent) {
//     e.preventDefault();
//     try {
//       await api.post("/barbeiros", { nome });
//       setNome("");
//       carregar();
//       alert("Barbeiro cadastrado!");
//     } catch (error) {
//       alert("Erro ao cadastrar barbeiro.");
//     }
//   }

//   return (
//     <div className="page-container">
//       <h1 className="title">Gestão de Barbeiros</h1>
      
//       <form onSubmit={salvar} className="premium-card form-grid">
//         <input 
//           placeholder="Nome do Barbeiro" 
//           value={nome} 
//           onChange={e => setNome(e.target.value)} 
//           required 
//         />
//         <button className="btn-gold">Adicionar Profissional</button>
//       </form>

//       <div className="premium-card">
//         <table className="custom-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Nome do Profissional</th>
//               <th>Ações</th>
//             </tr>
//           </thead>
//           <tbody>
//             {barbeiros.map((b: any) => (
//               <tr key={b.id}>
//                 <td>#{b.id}</td>
//                 <td>{b.nome}</td>
//                 <td>
//                   <button 
//                     onClick={async () => { if(confirm("Remover barbeiro?")) { await api.delete(`/barbeiros/${b.id}`); carregar(); } }}
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



// Barbeiros.tsx
import { useEffect, useState } from "react";
import api from "../services/api";

interface Barbeiro {
  id: number;
  nome: string;
}

export default function Barbeiros() {
  const [barbeiros, setBarbeiros] = useState<Barbeiro[]>([]);
  const [nome, setNome] = useState("");

  const carregarBarbeiros = async () => {
    try {
      const res = await api.get("/barbeiros");
      setBarbeiros(res.data);
    } catch (err) {
      console.error("Erro ao carregar barbeiros:", err);
      alert("Não foi possível carregar barbeiros");
    }
  };

  useEffect(() => {
    carregarBarbeiros();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim()) {
      alert("Digite o nome do barbeiro");
      return;
    }

    const novoId = barbeiros.length > 0 ? Math.max(...barbeiros.map(b => b.id)) + 1 : 1;

    try {
      await api.post("/barbeiros", { id: novoId, nome: nome.trim() });
      setNome("");
      carregarBarbeiros();
    } catch (err) {
      console.error("Erro ao cadastrar barbeiro:", err);
      alert("Erro ao cadastrar barbeiro");
    }
  };

  return (
    <div className="page-container">
      <h2>Barbeiros</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do barbeiro"
        />
        <button type="submit">Adicionar Barbeiro</button>
      </form>

      <h3>Lista de Barbeiros</h3>
      <ul>
        {barbeiros.map((b) => (
          <li key={b.id}>{b.nome}</li>
        ))}
      </ul>
    </div>
  );
}
