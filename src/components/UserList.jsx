import { useState, useEffect } from 'react';
import { getUsers, createUser, deleteUser } from '../api/client';
import './UserList.css';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const loadUsers = async () => {
    setError('');
    try {
      const data = await getUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e?.data?.message || e?.message || 'Failed to load users');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.name?.trim() || !form.email?.trim() || !form.password) {
      setError('Name, email and password are required.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await createUser({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      setForm({ name: '', email: '', password: '' });
      await loadUsers();
    } catch (e) {
      setError(e?.data?.message || e?.message || 'Failed to create user');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    setError('');
    setDeletingId(id);
    try {
      await deleteUser(id);
      await loadUsers();
    } catch (e) {
      setError(e?.data?.message || e?.message || 'Failed to delete user');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <div className="user-list-loading">Loading users…</div>;
  }

  return (
    <div className="user-list">
      <h2 className="user-list-title">Users</h2>
      {error && <div className="user-list-error">{error}</div>}

      <form onSubmit={handleCreate} className="user-list-form">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="user-list-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="user-list-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          className="user-list-input"
        />
        <button type="submit" className="user-list-btn" disabled={submitting}>
          {submitting ? 'Adding…' : 'Add user'}
        </button>
      </form>

      <div className="user-list-table-wrap">
        <table className="user-list-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="user-list-empty">No users yet</td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <button
                      type="button"
                      className="user-list-delete"
                      onClick={() => handleDelete(u.id)}
                      disabled={deletingId === u.id}
                    >
                      {deletingId === u.id ? '…' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
