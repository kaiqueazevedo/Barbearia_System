import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">
        <span>💈 Barbearia Pro</span>
      </div>

      <nav>
        <ul className="menu">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/clientes" className={({ isActive }) => isActive ? "active" : ""}>
              Clientes
            </NavLink>
          </li>
          {/* LINK ADICIONADO ABAIXO */}
          <li>
            <NavLink to="/barbeiros" className={({ isActive }) => isActive ? "active" : ""}>
              Barbeiros
            </NavLink>
          </li>
          <li>
            <NavLink to="/servicos" className={({ isActive }) => isActive ? "active" : ""}>
              Serviços
            </NavLink>
          </li>
          <li>
            <NavLink to="/agendamentos" className={({ isActive }) => isActive ? "active" : ""}>
              Agendamentos
            </NavLink>
          </li>
          <li>
            <NavLink to="/estoque" className={({ isActive }) => isActive ? "active" : ""}>
              Estoque
            </NavLink>
          </li>
          <li>
            <NavLink to="/financeiro" className={({ isActive }) => isActive ? "active" : ""}>
              Financeiro
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}