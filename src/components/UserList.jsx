import { useState, useEffect } from 'react';
import { getUsers, createUser, deleteUser } from '../api/client';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  CircularProgress,
  IconButton,
  Stack,
  Avatar,
  Chip,
  InputAdornment,
} from '@mui/material';
import {
  PersonAdd,
  Delete,
  Email,
  Person,
  Lock,
  Check,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled Components
const PageContainer = styled(Box)({
  width: '100%',
});

const HeaderCard = styled(Paper)({
  padding: '24px',
  borderRadius: '20px',
  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  boxShadow: '0 8px 32px rgba(16, 185, 129, 0.25)',
  marginBottom: '24px',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    right: '-20%',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
  },
});

const FormCard = styled(Paper)({
  padding: '28px',
  borderRadius: '20px',
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
  marginBottom: '24px',
});

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    background: '#f8fafc',
    transition: 'all 0.3s ease',
    '& fieldset': {
      borderColor: '#e2e8f0',
    },
    '&:hover fieldset': {
      borderColor: '#10b981',
    },
    '&.Mui-focused': {
      background: '#ffffff',
      '& fieldset': {
        borderColor: '#10b981',
        borderWidth: '2px',
      },
    },
  },
  '& .MuiInputLabel-root': {
    color: '#64748b',
    fontWeight: 500,
    '&.Mui-focused': {
      color: '#10b981',
    },
  },
});

const AddButton = styled(Button)({
  padding: '14px 28px',
  borderRadius: '12px',
  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  color: '#ffffff',
  fontWeight: 700,
  fontSize: '15px',
  textTransform: 'none',
  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)',
  },
  '&:disabled': {
    background: '#e2e8f0',
    color: '#94a3b8',
  },
});

const TableCard = styled(Paper)({
  borderRadius: '20px',
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
  overflow: 'hidden',
});

const StyledTableHead = styled(TableHead)({
  background: '#f8fafc',
  '& .MuiTableCell-head': {
    color: '#64748b',
    fontWeight: 700,
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    borderBottom: '2px solid #e2e8f0',
    padding: '16px 20px',
  },
});

const StyledTableRow = styled(TableRow)({
  transition: 'all 0.2s ease',
  '&:hover': {
    background: '#f8fafc',
    transform: 'scale(1.001)',
  },
  '& .MuiTableCell-root': {
    borderBottom: '1px solid #f1f5f9',
    padding: '16px 20px',
    color: '#0f172a',
    fontSize: '14px',
    fontWeight: 500,
  },
});

const DeleteButton = styled(IconButton)({
  color: '#ef4444',
  background: '#fee2e2',
  width: '36px',
  height: '36px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: '#ef4444',
    color: '#ffffff',
    transform: 'rotate(90deg)',
  },
  '&:disabled': {
    background: '#f1f5f9',
    color: '#cbd5e1',
  },
});

const UserAvatar = styled(Avatar)({
  width: 40,
  height: 40,
  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  fontWeight: 700,
  fontSize: '16px',
  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)',
});

const LoadingContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '80px 20px',
  gap: '16px',
});

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
    return (
      <LoadingContainer>
        <CircularProgress size={48} sx={{ color: '#10b981' }} />
        <Typography variant="body1" sx={{ color: '#64748b', fontWeight: 500 }}>
          Loading users...
        </Typography>
      </LoadingContainer>
    );
  }

  return (
    <PageContainer>

      {/* Error Alert */}
      {error && (
        <Alert
          severity="error"
          onClose={() => setError('')}
          sx={{
            mb: 3,
            borderRadius: '16px',
            border: '1px solid #fecaca',
            background: '#fef2f2',
            '& .MuiAlert-icon': {
              color: '#ef4444',
            },
          }}
        >
          {error}
        </Alert>
      )}

      {/* Add User Form */}
      <FormCard elevation={0}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: '#0f172a',
            mb: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <PersonAdd sx={{ color: '#10b981' }} />
          Add New User
        </Typography>

        <Box component="form" onSubmit={handleCreate}>
          <Stack spacing={2.5}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <StyledTextField
                fullWidth
                label="Name"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: '#10b981', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />

              <StyledTextField
                fullWidth
                type="email"
                label="Email"
                placeholder="john@example.com"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: '#10b981', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />

              <StyledTextField
                fullWidth
                type="password"
                label="Password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: '#10b981', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            <AddButton
              type="submit"
              variant="contained"
              disabled={submitting}
              startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <Check />}
              sx={{ alignSelf: { xs: 'stretch', sm: 'flex-end' } }}
            >
              {submitting ? 'Adding...' : 'Add User'}
            </AddButton>
          </Stack>
        </Box>
      </FormCard>

      {/* Users Table */}
      <TableCard elevation={0}>
        <TableContainer>
          <Table>
            <StyledTableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>ID</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Box
                      sx={{
                        textAlign: 'center',
                        py: 6,
                      }}
                    >
                      <Person sx={{ fontSize: 64, color: '#e2e8f0', mb: 2 }} />
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#94a3b8',
                          fontWeight: 600,
                        }}
                      >
                        No users yet
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#cbd5e1',
                          mt: 1,
                        }}
                      >
                        Add your first user to get started
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <StyledTableRow key={user.id}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <UserAvatar>
                          {user.name?.charAt(0)?.toUpperCase() || 'U'}
                        </UserAvatar>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 700,
                            color: '#0f172a',
                          }}
                        >
                          {user.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#64748b',
                          fontWeight: 500,
                        }}
                      >
                        {user.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={`#${user.id}`}
                        size="small"
                        sx={{
                          background: '#f1f5f9',
                          color: '#64748b',
                          fontWeight: 700,
                          fontSize: '12px',
                          height: '24px',
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <DeleteButton
                        onClick={() => handleDelete(user.id)}
                        disabled={deletingId === user.id}
                      >
                        {deletingId === user.id ? (
                          <CircularProgress size={18} color="inherit" />
                        ) : (
                          <Delete fontSize="small" />
                        )}
                      </DeleteButton>
                    </TableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TableCard>
    </PageContainer>
  );
}