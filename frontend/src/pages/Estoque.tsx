// import { useState, useEffect } from "react";
// import api from "../services/api";
// import "../styles/Financeiro.css"; // mesmo estilo das outras páginas

// interface EstoqueItem {
//   id: number;
//   produto: string;
//   marca: string;
//   quantidade: number;
// }

// export default function Estoque() {
//   const [itens, setItens] = useState<EstoqueItem[]>([]);
//   const [produto, setProduto] = useState("");
//   const [marca, setMarca] = useState("");
//   const [entradaQtd, setEntradaQtd] = useState(1);
//   const [saidaQtd, setSaidaQtd] = useState<{ [key: string]: number }>({});

//   // Carrega estoque inicial
//   useEffect(() => {
//     api.get("/estoque/").then((res) => setItens(res.data));
//   }, []);

//   // Adicionar entrada de produto
//   const adicionarEntrada = async () => {
//     if (!produto || !marca || entradaQtd <= 0) return;

//     const novoItem: EstoqueItem = {
//       id: Date.now(), // temporário, backend pode gerar id real
//       produto,
//       marca,
//       quantidade: entradaQtd,
//     };

//     try {
//       await api.post("/estoque/", novoItem);

//       // Atualiza grid imediatamente
//       setItens([novoItem, ...itens]);

//       setProduto("");
//       setMarca("");
//       setEntradaQtd(1);
//     } catch (err) {
//       console.error("Erro ao adicionar entrada:", err);
//     }
//   };

//   // Remover quantidade do produto
//   const removerSaida = async (item: EstoqueItem) => {
//     const qtd = saidaQtd[item.id] || 1;
//     if (qtd <= 0) return;

//     try {
//       // Atualiza no backend
//       await api.put(`/estoque/${item.id}?qtd=${qtd}`);

//       // Atualiza na grid
//       setItens(
//         itens
//           .map((i) =>
//             i.id === item.id
//               ? { ...i, quantidade: i.quantidade - qtd }
//               : i
//           )
//           .filter((i) => i.quantidade > 0)
//       );

//       setSaidaQtd((prev) => ({ ...prev, [item.id]: 1 }));
//     } catch (err) {
//       console.error("Erro ao remover itens:", err);
//     }
//   };

//   return (
//     <div className="page-container">
//       <h1 className="title">Estoque</h1>

//       {/* Formulário de entrada */}
//       <div className="form-group">
//         <input
//           placeholder="Produto"
//           value={produto}
//           onChange={(e) => setProduto(e.target.value)}
//         />
//         <input
//           placeholder="Marca"
//           value={marca}
//           onChange={(e) => setMarca(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Quantidade"
//           min={1}
//           value={entradaQtd}
//           onChange={(e) => setEntradaQtd(Number(e.target.value))}
//         />
//         <button className="btn-add" onClick={adicionarEntrada}>
//           Adicionar Entrada
//         </button>
//       </div>

//       {/* Grid de estoque */}
//       <table className="grid">
//         <thead>
//           <tr>
//             <th>Produto</th>
//             <th>Marca</th>
//             <th>Quantidade</th>
//             <th>Remover</th>
//           </tr>
//         </thead>
//         <tbody>
//           {itens.map((item) => (
//             <tr key={item.id}>
//               <td>{item.produto}</td>
//               <td>{item.marca}</td>
//               <td>{item.quantidade}</td>
//               <td>
//                 <input
//                   type="number"
//                   style={{ width: "60px" }}
//                   min={1}
//                   value={saidaQtd[item.id] || 1}
//                   onChange={(e) =>
//                     setSaidaQtd((prev) => ({
//                       ...prev,
//                       [item.id]: Number(e.target.value),
//                     }))
//                   }
//                 />
//                 <button
//                   className="btn-remove"
//                   onClick={() => removerSaida(item)}
//                 >
//                   Remover
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }



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
//       const res = await api.post("/estoque/", { ...novoProduto, id });
//       setEstoque([...estoque, res.data]);
//       setNovoProduto({ produto: "", marca: "", quantidade: 0 });
//     } catch (err) {
//       console.error("Erro ao adicionar produto:", err);
//     }
//   };

//   // Alterar quantidade (+ ou -)
//   const alterarQuantidade = async (itemId: number, delta: number) => {
//     const item = estoque.find((i) => i.id === itemId);
//     if (!item) return;
//     if (item.quantidade + delta < 0) return;

//     try {
//       const res = await api.put(`/estoque/${itemId}`, { qtd: delta });
//       // atualiza no frontend
//       setEstoque((prev) =>
//         prev.map((i) =>
//           i.id === itemId ? { ...i, quantidade: i.quantidade + delta } : i
//         )
//       );
//     } catch (err) {
//       console.error("Erro ao atualizar estoque:", err);
//     }
//   };

//   return (
//     <div className="financeiro-container" style={{ padding: "20px" }}>
//       <h2>Estoque</h2>

//       {/* Formulário novo produto */}
//       <div className="form-group" style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
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
//           onChange={(e) => setNovoProduto({ ...novoProduto, quantidade: parseInt(e.target.value) })}
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

export default function Estoque() {
  const [estoque, setEstoque] = useState([]);
  const [novoProduto, setNovoProduto] = useState({ produto: "", marca: "", quantidade: 0 });

  // Carregar estoque do backend
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

  // Adicionar novo produto
  const adicionarProduto = async () => {
    if (!novoProduto.produto || !novoProduto.marca || novoProduto.quantidade <= 0) return;
    try {
      const id = Date.now(); // ID único simples
      const itemNovo = { ...novoProduto, id };
      setEstoque([...estoque, itemNovo]); // atualiza frontend imediatamente
      setNovoProduto({ produto: "", marca: "", quantidade: 0 });

      // atualiza backend
      await api.post("/estoque/", itemNovo);
    } catch (err) {
      console.error("Erro ao adicionar produto:", err);
    }
  };

  // Alterar quantidade sem reload
  const alterarQuantidade = async (itemId: number, delta: number) => {
    setEstoque((prev) =>
      prev.map((i) =>
        i.id === itemId
          ? { ...i, quantidade: Math.max(i.quantidade + delta, 0) }
          : i
      )
    );

    // Atualiza backend
    try {
      await api.put(`/estoque/${itemId}`, { qtd: delta });
    } catch (err) {
      console.error("Erro ao atualizar estoque:", err);
    }
  };

  return (
    <div className="financeiro-container" style={{ padding: "20px" }}>
      <h2>Estoque</h2>

      {/* Formulário novo produto */}
      <div
        className="form-group"
        style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
      >
        <input
          type="text"
          placeholder="Produto"
          value={novoProduto.produto}
          style={{ flex: 2, padding: "10px", fontSize: "16px" }}
          onChange={(e) => setNovoProduto({ ...novoProduto, produto: e.target.value })}
        />
        <input
          type="text"
          placeholder="Marca"
          value={novoProduto.marca}
          style={{ flex: 2, padding: "10px", fontSize: "16px" }}
          onChange={(e) => setNovoProduto({ ...novoProduto, marca: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={novoProduto.quantidade}
          style={{ flex: 1, padding: "10px", fontSize: "16px" }}
          onChange={(e) =>
            setNovoProduto({ ...novoProduto, quantidade: parseInt(e.target.value) })
          }
        />
        <button
          onClick={adicionarProduto}
          style={{ flex: 1, padding: "10px", fontSize: "16px", cursor: "pointer" }}
        >
          Adicionar
        </button>
      </div>

      {/* Grid de estoque */}
      <table className="financeiro-grid" style={{ width: "100%", tableLayout: "fixed" }}>
        <thead>
          <tr>
            <th style={{ width: "30%" }}>Produto</th>
            <th style={{ width: "30%" }}>Marca</th>
            <th style={{ width: "20%" }}>Quantidade</th>
            <th style={{ width: "20%" }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {estoque.map((item) => (
            <tr key={item.id}>
              <td>{item.produto}</td>
              <td>{item.marca}</td>
              <td>{item.quantidade}</td>
              <td style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                <button onClick={() => alterarQuantidade(item.id, 1)}>+</button>
                <button onClick={() => alterarQuantidade(item.id, -1)}>-</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
