import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
  InputAdornment,
  IconButton,
  Fade,
  Slide,
} from '@mui/material';
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  ArrowForward,
  Layers,
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(30px, -30px) rotate(120deg); }
  66% { transform: translate(-20px, 20px) rotate(240deg); }
`;

const GradientBackground = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(-45deg, #f0fdf4, #dcfce7, #d1fae5, #f0fdf4)',
  backgroundSize: '400% 400%',
  animation: `${gradientShift} 15s ease infinite`,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '-300px',
    right: '-200px',
    animation: `${floatAnimation} 20s ease-in-out infinite`,
    filter: 'blur(60px)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(5, 150, 105, 0.15) 0%, transparent 70%)',
    borderRadius: '50%',
    bottom: '-200px',
    left: '-150px',
    animation: `${floatAnimation} 25s ease-in-out infinite reverse`,
    filter: 'blur(60px)',
  },
});

const GridPattern = styled(Box)({
  position: 'absolute',
  inset: 0,
  backgroundImage: `
    linear-gradient(rgba(16, 185, 129, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(16, 185, 129, 0.05) 1px, transparent 1px)
  `,
  backgroundSize: '50px 50px',
  maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
  WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
});

const StyledCard = styled(Card)(({ theme }) => ({
  padding: '56px 48px',
  maxWidth: '480px',
  width: '100%',
  borderRadius: '32px',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(40px) saturate(180%)',
  border: '1px solid rgba(16, 185, 129, 0.2)',
  boxShadow: `
    0 0 80px rgba(16, 185, 129, 0.15),
    0 30px 90px -20px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.5)
  `,
  position: 'relative',
  zIndex: 1,
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `
      0 0 120px rgba(16, 185, 129, 0.25),
      0 40px 120px -20px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.6)
    `,
    border: '1px solid rgba(16, 185, 129, 0.4)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: '32px',
    padding: '1px',
    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(5, 150, 105, 0.3))',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    opacity: 0,
    transition: 'opacity 0.5s ease',
  },
  '&:hover::before': {
    opacity: 1,
  },
  [theme.breakpoints.down('sm')]: {
    padding: '40px 32px',
  },
}));

const LogoContainer = styled(Box)({
  width: '80px',
  height: '80px',
  margin: '0 auto 32px',
  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  borderRadius: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 20px 50px -12px rgba(16, 185, 129, 0.5)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: '-2px',
    borderRadius: '24px',
    background: 'linear-gradient(135deg, #10b981, #059669)',
    zIndex: -1,
    filter: 'blur(20px)',
    opacity: 0.7,
  },
});

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '16px',
    backgroundColor: '#f8fafc',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontSize: '15px',
    fontWeight: 400,
    color: '#0f172a',
    '& fieldset': {
      borderColor: '#e2e8f0',
      borderWidth: '1px',
      transition: 'all 0.3s ease',
    },
    '&:hover': {
      backgroundColor: '#ffffff',
      '& fieldset': {
        borderColor: '#10b981',
      },
    },
    '&.Mui-focused': {
      backgroundColor: '#ffffff',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 30px rgba(16, 185, 129, 0.2), 0 0 0 4px rgba(16, 185, 129, 0.1)',
      '& fieldset': {
        borderColor: '#10b981',
        borderWidth: '2px',
      },
    },
  },
  '& .MuiInputLabel-root': {
    color: '#64748b',
    fontWeight: 500,
    fontSize: '14px',
    letterSpacing: '0.3px',
    '&.Mui-focused': {
      color: '#10b981',
    },
  },
  '& .MuiOutlinedInput-input': {
    '&::placeholder': {
      color: '#94a3b8',
      opacity: 1,
    },
  },
});

const GradientButton = styled(Button)({
  padding: '16px 32px',
  fontSize: '15px',
  fontWeight: 600,
  borderRadius: '16px',
  textTransform: 'none',
  letterSpacing: '0.5px',
  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  boxShadow: '0 10px 40px -10px rgba(16, 185, 129, 0.6)',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
    transition: 'left 0.6s ease',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: '16px',
    padding: '2px',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1))',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    opacity: 0,
    transition: 'opacity 0.4s ease',
  },
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 20px 60px -10px rgba(16, 185, 129, 0.8)',
    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    '&::before': {
      left: '100%',
    },
    '&::after': {
      opacity: 1,
    },
  },
  '&:active': {
    transform: 'translateY(-1px)',
  },
});

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(email, password);
    if (result.success) {
      navigate(from || '/', { replace: true });
    } else {
      setError(result.message || 'Please enter email and password.');
    }
  };

  return (
    <GradientBackground>
      <GridPattern />
      <Container maxWidth="sm">
        <Slide direction="up" in timeout={600}>
          <StyledCard elevation={0}>
            <LogoContainer>
              <Layers sx={{ fontSize: 48, color: 'white' }} />
            </LogoContainer>

            <Box sx={{ textAlign: 'center', mb: 5 }}>
              <Typography 
                variant="h4" 
                component="h1" 
                sx={{ 
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1.5,
                  letterSpacing: '-0.5px',
                }}
              >
                Admin Dashboard
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#64748b',
                  fontWeight: 400,
                  letterSpacing: '0.3px',
                }}
              >
                Enter your credentials to access
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {error && (
                <Fade in>
                  <Alert 
                    severity="error" 
                    sx={{ 
                      borderRadius: '12px',
                      backgroundColor: '#fef2f2',
                      border: '1px solid #fecaca',
                      color: '#dc2626',
                      fontWeight: 500,
                      '& .MuiAlert-icon': {
                        color: '#ef4444',
                      },
                    }}
                  >
                    {error}
                  </Alert>
                </Fade>
              )}

              <StyledTextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@company.com"
                autoComplete="email"
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
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: '#10b981', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ 
                          color: '#64748b',
                          '&:hover': {
                            color: '#10b981',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                          },
                        }}
                      >
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <GradientButton
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                sx={{ mt: 1 }}
              >
                Sign In
              </GradientButton>

              <Typography 
                variant="caption" 
                sx={{ 
                  textAlign: 'center',
                  color: '#64748b',
                  mt: 2,
                  letterSpacing: '0.3px',
                }}
              >
                Protected by enterprise-grade security
              </Typography>
            </Box>
          </StyledCard>
        </Slide>
      </Container>
    </GradientBackground>
  );
}