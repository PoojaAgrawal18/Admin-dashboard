import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './DashboardLayout.css';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">Admin</div>
        <nav className="sidebar-nav">
          <NavLink
            to="/users"
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
            end
          >
            Users / Sale Dashboard
          </NavLink>
        </nav>
        <div className="sidebar-footer">
          <span className="sidebar-user">{user?.name || user?.email}</span>
          <button type="button" className="logout-btn" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </aside>
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}
