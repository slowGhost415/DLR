import { Link } from 'react-router-dom';

const Header = ({ user, onLogout, onRequireAuth }) => {
  return (
    <header className="app-header">
      <div className="brand">
        <h1>Economia App</h1>
        <p>Simulações, gráficos e análises</p>
      </div>
      <nav className="nav-links">
        <Link to="/dashboard" onClick={user ? null : onRequireAuth}>Análises</Link>
        <Link to="/dashboard" onClick={user ? null : onRequireAuth}>Gráficos</Link>
        <Link to="/dashboard" onClick={user ? null : onRequireAuth}>Simulador</Link>
      </nav>

      <div className="user-actions">
        {user ? (
          <>
            <span>Olá, {user.nome}</span>
            <button className="secondary-btn" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <button className="primary-btn" onClick={onRequireAuth}>Entrar</button>
        )}
      </div>
    </header>
  );
};

export default Header;
