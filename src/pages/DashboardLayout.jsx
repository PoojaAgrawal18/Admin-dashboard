import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  IconButton,
  Badge,
  Stack,
  useMediaQuery,
  useTheme,
  Drawer,
  Paper,
  Chip,
} from '@mui/material';
import {
  GridView,
  People,
  BarChart,
  Settings,
  Notifications,
  Search,
  Menu as MenuIcon,
  Close,
  KeyboardArrowRight,
  Circle,
  Layers,
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';
import { useState } from 'react';

const drawerWidth = 320;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Main Layout with Fresh Colors
const LayoutRoot = styled(Box)({
  display: 'flex',
  minHeight: '100vh',
  background: '#f8fafc',
  position: 'relative',
});

// Sidebar
const StyledSidebar = styled(Box)(({ theme, open }) => ({
  width: drawerWidth,
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  position: 'fixed',
  height: '100vh',
  left: 0,
  top: 0,
  zIndex: 1200,
  background: '#f8fafc',
  transform: open ? 'translateX(0)' : 'translateX(-100%)',
  transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  [theme.breakpoints.up('lg')]: {
    transform: 'translateX(0)',
  },
}));

// Brand Card
const BrandCard = styled(Paper)({
  padding: '28px 24px',
  borderRadius: '24px',
  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  boxShadow: '0 20px 60px rgba(16, 185, 129, 0.3)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    right: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
    animation: `${rotate} 20s linear infinite`,
  },
});

const BrandIcon = styled(Box)({
  width: '56px',
  height: '56px',
  borderRadius: '16px',
  background: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '16px',
  animation: `${float} 3s ease-in-out infinite`,
});

// Navigation Card
const NavCard = styled(Paper)({
  padding: '16px',
  borderRadius: '24px',
  background: '#ffffff',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  border: '1px solid #e2e8f0',
});

// Navigation Item
const NavItem = styled(ListItemButton)(({ active }) => ({
  borderRadius: '16px',
  padding: '14px 16px',
  marginBottom: '8px',
  background: active ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'transparent',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateX(8px) scale(1.02)',
    background: active ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : '#f1f5f9',
  },
  '& .MuiListItemIcon-root': {
    minWidth: '44px',
    color: active ? '#ffffff' : '#10b981',
    zIndex: 1,
  },
  '& .MuiListItemText-primary': {
    fontWeight: active ? 700 : 600,
    fontSize: '15px',
    color: active ? '#ffffff' : '#0f172a',
    zIndex: 1,
  },
}));

// User Profile Card
const ProfileCard = styled(Paper)({
  padding: '20px',
  borderRadius: '24px',
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(16, 185, 129, 0.2)',
  },
});

const StyledAvatar = styled(Avatar)({
  width: 52,
  height: 52,
  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  fontSize: '20px',
  fontWeight: 700,
  boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
  border: '3px solid #ffffff',
});

// Main Content Area
const MainContent = styled(Box)(({ theme }) => ({
  flex: 1,
  marginLeft: 0,
  minHeight: '100vh',
  position: 'relative',
  background: '#f8fafc',
  [theme.breakpoints.up('lg')]: {
    marginLeft: drawerWidth + 48,
  },
}));

// Header Bar
const HeaderBar = styled(Box)({
  padding: '24px 32px',
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
  flexWrap: 'wrap',
  background: '#f8fafc',
});

const SearchCard = styled(Paper)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '14px 20px',
  borderRadius: '20px',
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
  flex: 1,
  maxWidth: '500px',
  transition: 'all 0.3s ease',
  '&:focus-within': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 24px rgba(16, 185, 129, 0.15)',
    border: '1px solid #10b981',
  },
});

const ActionButton = styled(IconButton)({
  width: '48px',
  height: '48px',
  borderRadius: '16px',
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: '#ffffff',
    transform: 'translateY(-4px) scale(1.05)',
    boxShadow: '0 8px 24px rgba(16, 185, 129, 0.15)',
  },
});

const ContentWrapper = styled(Box)({
  padding: '0 32px 32px',
  maxWidth: '1600px',
});

const WelcomeCard = styled(Paper)({
  padding: '32px',
  borderRadius: '28px',
  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  boxShadow: '0 20px 60px rgba(16, 185, 129, 0.3)',
  marginBottom: '32px',
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

const StatusDot = styled(Circle)({
  fontSize: '10px',
  color: '#10b981',
  marginRight: '6px',
});

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const menuItems = [
    { text: 'Dashboard', icon: <GridView />, path: '/dashboard', badge: null },
    { text: 'Users & Sales', icon: <People />, path: '/users', badge: '24' },
    { text: 'Analytics', icon: <BarChart />, path: '/analytics', badge: null },
    { text: 'Settings', icon: <Settings />, path: '/settings', badge: null },
  ];

  const drawer = (
    <StyledSidebar open={drawerOpen || !isMobile}>
      <BrandCard elevation={0}>
        <BrandIcon>
          <Layers sx={{ fontSize: 32, color: '#ffffff' }} />
        </BrandIcon>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            color: '#ffffff',
            letterSpacing: '-1px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Forge
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontWeight: 600,
            fontSize: '13px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Admin Dashboard
        </Typography>
        {isMobile && (
          <IconButton
            onClick={() => setDrawerOpen(false)}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              color: '#ffffff',
              zIndex: 1,
            }}
          >
            <Close />
          </IconButton>
        )}
      </BrandCard>

      <NavCard elevation={0}>
        <Typography
          variant="caption"
          sx={{
            px: 2,
            pb: 1,
            display: 'block',
            color: '#64748b',
            fontWeight: 700,
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
          }}
        >
          Navigation
        </Typography>
        <List sx={{ p: 0 }}>
          {menuItems.map((item) => (
            <NavItem
              key={item.text}
              component={NavLink}
              to={item.path}
              active={location.pathname === item.path ? 1 : 0}
              onClick={() => isMobile && setDrawerOpen(false)}
            >
              <ListItemIcon>
                {item.badge ? (
                  <Badge
                    badgeContent={item.badge}
                    sx={{
                      '& .MuiBadge-badge': {
                        background: '#ef4444',
                        color: '#ffffff',
                        fontSize: '10px',
                        fontWeight: 700,
                        boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)',
                      },
                    }}
                  >
                    {item.icon}
                  </Badge>
                ) : (
                  item.icon
                )}
              </ListItemIcon>
              <ListItemText primary={item.text} />
              <KeyboardArrowRight
                sx={{
                  color: location.pathname === item.path ? '#ffffff' : '#94a3b8',
                  fontSize: 20,
                }}
              />
            </NavItem>
          ))}
        </List>
      </NavCard>

      <ProfileCard elevation={0} sx={{ mt: 'auto' }}>
        <StyledAvatar>
          {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'A'}
        </StyledAvatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 700,
              color: '#0f172a',
              fontSize: '14px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {user?.name || 'Admin User'}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.3 }}>
            <StatusDot />
            <Typography
              variant="caption"
              sx={{
                color: '#64748b',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              Active now
            </Typography>
          </Box>
        </Box>
        <IconButton
          size="small"
          onClick={handleLogout}
          sx={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: '#ffffff',
            width: 36,
            height: 36,
            '&:hover': {
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              transform: 'rotate(90deg)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          <KeyboardArrowRight />
        </IconButton>
      </ProfileCard>
    </StyledSidebar>
  );

  return (
    <LayoutRoot>
      {/* Mobile Drawer */}
      {isMobile && (
        <>
          <Drawer
            variant="temporary"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              '& .MuiDrawer-paper': {
                background: 'transparent',
                boxShadow: 'none',
                border: 'none',
              },
            }}
          >
            {drawer}
          </Drawer>
          {drawerOpen && (
            <Box
              onClick={() => setDrawerOpen(false)}
              sx={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(15, 23, 42, 0.4)',
                backdropFilter: 'blur(8px)',
                zIndex: 1100,
              }}
            />
          )}
        </>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && drawer}

      {/* Main Content */}
      <MainContent>
        <HeaderBar>
          {isMobile && (
            <ActionButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon sx={{ color: '#10b981' }} />
            </ActionButton>
          )}

          <SearchCard elevation={0}>
            <Search sx={{ color: '#94a3b8', fontSize: 22 }} />
            <input
              type="text"
              placeholder="Search anything..."
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                flex: 1,
                fontSize: '15px',
                fontWeight: 600,
                color: '#0f172a',
              }}
            />
            <Chip
              label="Ctrl+K"
              size="small"
              sx={{
                background: '#10b981',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '11px',
                height: '24px',
              }}
            />
          </SearchCard>

          <Stack direction="row" spacing={1.5} sx={{ ml: 'auto' }}>
            <ActionButton>
              <Badge
                badgeContent={7}
                sx={{
                  '& .MuiBadge-badge': {
                    background: '#ef4444',
                    color: '#ffffff',
                  },
                }}
              >
                <Notifications sx={{ color: '#10b981' }} />
              </Badge>
            </ActionButton>
          </Stack>
        </HeaderBar>

        <ContentWrapper>
          <WelcomeCard elevation={0}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                color: '#ffffff',
                mb: 1,
                position: 'relative',
                zIndex: 1,
              }}
            >
              Welcome back, {user?.name?.split(' ')[0] || 'Admin'}! 👋
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 500,
                position: 'relative',
                zIndex: 1,
              }}
            >
              Here's what's happening with your business today.
            </Typography>
          </WelcomeCard>

          <Outlet />
        </ContentWrapper>
      </MainContent>
    </LayoutRoot>
  );
}