// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";

// import Dashboard from "./pages/Dashboard";
// import Clientes from "./pages/Clientes"; // Removi o .tsx (não é necessário no import)
// import Agendamentos from "./pages/Agendamentos";
// import Estoque from "./pages/Estoque";

// // Se você ainda não criou esses arquivos, crie-os como componentes simples para não dar erro de import
// const Servicos = () => <div className="page-container"><h1 className="title">Serviços</h1></div>;
// const Financeiro = () => <div className="page-container"><h1 className="title">Financeiro</h1></div>;

// // ... outros imports
// import Barbeiros from "./pages/Barbeiros";

// // Dentro das Routes, abaixo de clientes ou serviços:
// <Route path="/barbeiros" element={<Barbeiros />} />

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* O Layout abraça todas as rotas filhas */}
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Dashboard />} />
//           <Route path="clientes" element={<Clientes />} />
//           <Route path="agendamentos" element={<Agendamentos />} />
//           <Route path="servicos" element={<Servicos />} />
//           <Route path="estoque" element={<Estoque />} />
//           <Route path="financeiro" element={<Financeiro />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";

// // Importação das páginas reais
// import Dashboard from "./pages/Dashboard";
// import Clientes from "./pages/Clientes";
// import Agendamentos from "./pages/Agendamentos";
// import Barbeiros from "./pages/Barbeiros"; 
// import Servicos from "./pages/Servicos"; // Use o arquivo real que criamos
// import Estoque from "./pages/Estoque";
// import Financeiro from "./pages/Financeiro";

// // Se ainda não criou o Financeiro, mantemos o temporário abaixo

// function App() {
//   return (
//     <BrowserRouter>
//       {/* O seu Layout já tem o <Navbar /> e o {children}. 
//          Por isso, envolvemos as Routes com ele diretamente.
//       */}
//       <Layout>
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/clientes" element={<Clientes />} />
//           <Route path="/barbeiros" element={<Barbeiros />} />
//           <Route path="/agendamentos" element={<Agendamentos />} />
//           <Route path="/servicos" element={<Servicos />} />
//           <Route path="/estoque" element={<Estoque />} />
//           <Route path="/financeiro" element={<Financeiro />} />
       
//         </Routes>
//       </Layout>
//     </BrowserRouter>
//   );
// }

// export default App;


// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

// Importação das páginas reais
import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import Barbeiros from "./pages/Barbeiros";
import Agendamentos from "./pages/Agendamentos";
import Servicos from "./pages/Servicos";
import Estoque from "./pages/Estoque";
import Financeiro from "./pages/Financeiro"; // Importa a página real Financeiro

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/barbeiros" element={<Barbeiros />} />
          <Route path="/agendamentos" element={<Agendamentos />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/estoque" element={<Estoque />} />
          <Route path="/financeiro" element={<Financeiro />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
