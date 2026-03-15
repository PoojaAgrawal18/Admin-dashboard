const BASE = import.meta.env.VITE_API_URL || 'http://localhost:7474';

async function request(path, options = {}) {
  const url = `${BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  const text = await res.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }
  if (!res.ok) {
    const err = new Error(data?.message || res.statusText);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data ?? {};
}

export async function adminLogin(email, password) {
  return request('/admin/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function getUsers() {
  return request('/api/users', { method: 'GET' });
}

export async function createUser({ name, email, password }) {
  return request('/api/users', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
}

export async function deleteUser(id) {
  const url = `${BASE}/api/users/${id}`;
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) {
    const text = await res.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = { message: text };
    }
    const err = new Error(data?.message || res.statusText);
    err.status = res.status;
    err.data = data;
    throw err;
  }
}
