
// import { useState, useEffect } from "react";
// import api from "../services/api";
// import "../styles/Financeiro.css";

// export default function Estoque() {
//   const [estoque, setEstoque] = useState([]);
//   const [novoProduto, setNovoProduto] = useState({ produto: "", marca: "", quantidade: 0 });

//   // Carregar estoque do backend
//   const carregarEstoque = async () => {
//     try {
//       const res = await api.get("/estoque/");
//       setEstoque(res.data);
//     } catch (err) {
//       console.error("Erro ao carregar estoque:", err);
//     }
//   };

//   useEffect(() => {
//     carregarEstoque();
//   }, []);

//   // Adicionar novo produto
//   const adicionarProduto = async () => {
//     if (!novoProduto.produto || !novoProduto.marca || novoProduto.quantidade <= 0) return;
//     try {
//       const id = Date.now(); // ID único simples
//       const itemNovo = { ...novoProduto, id };
//       setEstoque([...estoque, itemNovo]); // atualiza frontend imediatamente
//       setNovoProduto({ produto: "", marca: "", quantidade: 0 });

//       // atualiza backend
//       await api.post("/estoque/", itemNovo);
//     } catch (err) {
//       console.error("Erro ao adicionar produto:", err);
//     }
//   };

//   // Alterar quantidade sem reload
//   const alterarQuantidade = async (itemId: number, delta: number) => {
//     setEstoque((prev) =>
//       prev.map((i) =>
//         i.id === itemId
//           ? { ...i, quantidade: Math.max(i.quantidade + delta, 0) }
//           : i
//       )
//     );

//     // Atualiza backend
//     try {
//       await api.put(`/estoque/${itemId}`, { qtd: delta });
//     } catch (err) {
//       console.error("Erro ao atualizar estoque:", err);
//     }
//   };

//   return (
//     <div className="financeiro-container" style={{ padding: "20px" }}>
//       <h2>Estoque</h2>

//       {/* Formulário novo produto */}
//       <div
//         className="form-group"
//         style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
//       >
//         <input
//           type="text"
//           placeholder="Produto"
//           value={novoProduto.produto}
//           style={{ flex: 2, padding: "10px", fontSize: "16px" }}
//           onChange={(e) => setNovoProduto({ ...novoProduto, produto: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Marca"
//           value={novoProduto.marca}
//           style={{ flex: 2, padding: "10px", fontSize: "16px" }}
//           onChange={(e) => setNovoProduto({ ...novoProduto, marca: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Quantidade"
//           value={novoProduto.quantidade}
//           style={{ flex: 1, padding: "10px", fontSize: "16px" }}
//           onChange={(e) =>
//             setNovoProduto({ ...novoProduto, quantidade: parseInt(e.target.value) })
//           }
//         />
//         <button
//           onClick={adicionarProduto}
//           style={{ flex: 1, padding: "10px", fontSize: "16px", cursor: "pointer" }}
//         >
//           Adicionar
//         </button>
//       </div>

//       {/* Grid de estoque */}
//       <table className="financeiro-grid" style={{ width: "100%", tableLayout: "fixed" }}>
//         <thead>
//           <tr>
//             <th style={{ width: "30%" }}>Produto</th>
//             <th style={{ width: "30%" }}>Marca</th>
//             <th style={{ width: "20%" }}>Quantidade</th>
//             <th style={{ width: "20%" }}>Ações</th>
//           </tr>
//         </thead>
//         <tbody>
//           {estoque.map((item) => (
//             <tr key={item.id}>
//               <td>{item.produto}</td>
//               <td>{item.marca}</td>
//               <td>{item.quantidade}</td>
//               <td style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
//                 <button onClick={() => alterarQuantidade(item.id, 1)}>+</button>
//                 <button onClick={() => alterarQuantidade(item.id, -1)}>-</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }





import { useState, useEffect } from "react";
import api from "../services/api";
import "../styles/Financeiro.css";

// Interface para garantir consistência dos dados
interface ItemEstoque {
  id: number;
  produto: string;
  marca: string;
  quantidade: number;
}

export default function Estoque() {
  const [estoque, setEstoque] = useState<ItemEstoque[]>([]);
  const [novoProduto, setNovoProduto] = useState({ produto: "", marca: "", quantidade: 0 });

  const carregarEstoque = async () => {
    try {
      const res = await api.get("/estoque/");
      setEstoque(res.data);
    } catch (err) {
      console.error("Erro ao carregar estoque:", err);
    }
  };

  useEffect(() => {
    carregarEstoque();
  }, []);

  const adicionarProduto = async () => {
    if (!novoProduto.produto || !novoProduto.marca || novoProduto.quantidade <= 0) return;
    try {
      const id = Date.now();
      const itemNovo = { ...novoProduto, id };
      setEstoque([...estoque, itemNovo]);
      setNovoProduto({ produto: "", marca: "", quantidade: 0 });
      await api.post("/estoque/", itemNovo);
    } catch (err) {
      console.error("Erro ao adicionar produto:", err);
    }
  };

  const alterarQuantidade = async (itemId: number, delta: number) => {
    setEstoque((prev) =>
      prev.map((i) =>
        i.id === itemId
          ? { ...i, quantidade: Math.max(i.quantidade + delta, 0) }
          : i
      )
    );

    try {
      await api.put(`/estoque/${itemId}`, { qtd: delta });
    } catch (err) {
      console.error("Erro ao atualizar estoque:", err);
    }
  };

  return (
    <div className="financeiro-container">
      <h2>Estoque</h2>

      {/* Formulário usando as classes do Financeiro.css */}
      <div className="form-movimento">
        <input
          type="text"
          placeholder="Produto"
          value={novoProduto.produto}
          style={{ flex: 2 }} // Apenas flex para manter proporção
          onChange={(e) => setNovoProduto({ ...novoProduto, produto: e.target.value })}
        />
        <input
          type="text"
          placeholder="Marca"
          value={novoProduto.marca}
          style={{ flex: 2 }}
          onChange={(e) => setNovoProduto({ ...novoProduto, marca: e.target.value })}
        />
        <input
          type="number"
          placeholder="Qtd"
          value={novoProduto.quantidade}
          style={{ flex: 1 }}
          onChange={(e) =>
            setNovoProduto({ ...novoProduto, quantidade: parseInt(e.target.value) || 0 })
          }
        />
        <button onClick={adicionarProduto}>Adicionar</button>
      </div>

      {/* Tabela usando as classes do Financeiro.css */}
      <div className="grid-movimentos">
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Marca</th>
              <th>Quantidade</th>
              <th style={{ textAlign: "center" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {estoque.map((item) => (
              <tr key={item.id}>
                <td>{item.produto}</td>
                <td>{item.marca}</td>
                <td className="valor-entrada">{item.quantidade}</td>
                <td style={{ textAlign: "center" }}>
                  <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
                    {/* Reutilizando o estilo de botão do form para os botões de ação */}
                    <button className="btn-acao" onClick={() => alterarQuantidade(item.id, 1)}>+</button>
                    <button className="btn-acao" onClick={() => alterarQuantidade(item.id, -1)}>-</button>
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