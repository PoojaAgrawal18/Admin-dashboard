import UserList from '../components/UserList';
import SaleDashboard from '../components/SaleDashboard';
import './UserPage.css';

/**
 * User page: handles users (list/create/delete) and the Sale Dashboard.
 */
export default function UserPage() {
  return (
    <div className="user-page">
      <header className="user-page-header">
        <h1>Users & Sale Dashboard</h1>
        <p>Manage users and view sales metrics</p>
      </header>
      <UserList />
      <SaleDashboard />
    </div>
  );
}
