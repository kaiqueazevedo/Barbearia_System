// import { useEffect, useState } from "react";
// import api from "../services/api";

// interface Cliente {
//   id: number;
//   nome: string;
//   telefone: string;
// }

// export default function Clientes() {
//   const [clientes, setClientes] = useState<Cliente[]>([]);
//   const [nome, setNome] = useState("");
//   const [telefone, setTelefone] = useState("");

//   const buscarClientes = async () => {
//     try {
//       const response = await api.get("/clientes");
//       setClientes(response.data);
//     } catch (error) {
//       console.error("Erro ao buscar clientes:", error);
//     }
//   };

//   useEffect(() => {
//     buscarClientes();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       await api.post("/clientes", {
//         nome,
//         telefone,
//       });

//       setNome("");
//       setTelefone("");

//       buscarClientes(); // Atualiza lista automaticamente
//     } catch (error) {
//       console.error("Erro ao cadastrar cliente:", error);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Clientes</h1>

//       <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
//         <input
//           placeholder="Nome"
//           value={nome}
//           onChange={(e) => setNome(e.target.value)}
//         />
//         <input
//           placeholder="Telefone"
//           value={telefone}
//           onChange={(e) => setTelefone(e.target.value)}
//         />
//         <button type="submit">Cadastrar</button>
//       </form>

//       <ul>
//         {clientes.map((cliente) => (
//           <li key={cliente.id}>
//             {cliente.nome} - {cliente.telefone}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


// Clientes.tsx
import { useEffect, useState } from "react";
import api from "../services/api";

interface Cliente {
  id: number;
  nome: string;
}

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [nome, setNome] = useState("");

  // Função para carregar clientes do backend
  const carregarClientes = async () => {
    try {
      const res = await api.get("/clientes");
      setClientes(res.data);
    } catch (err) {
      console.error("Erro ao carregar clientes:", err);
      alert("Não foi possível carregar clientes");
    }
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  // Função para cadastrar novo cliente
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim()) {
      alert("Digite o nome do cliente");
      return;
    }

    // Define id como próximo número sequencial
    const novoId = clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1;

    try {
      await api.post("/clientes", { id: novoId, nome: nome.trim() });
      setNome(""); // Limpa input
      carregarClientes(); // Atualiza lista
    } catch (err) {
      console.error("Erro ao cadastrar cliente:", err);
      alert("Erro ao cadastrar cliente");
    }
  };

  return (
    <div className="page-container">
      <h2>Clientes</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do cliente"
        />
        <button type="submit">Adicionar Cliente</button>
      </form>

      <h3>Lista de Clientes</h3>
      <ul>
        {clientes.map((c) => (
          <li key={c.id}>{c.nome}</li>
        ))}
      </ul>
    </div>
  );
}
