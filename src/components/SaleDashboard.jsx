import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Chip,
  Avatar,
  IconButton,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  AttachMoney,
  People,
  PercentRounded,
  MoreVert,
  ArrowUpward,
  ArrowDownward,
  CalendarToday,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled Components with New Color Palette
const DashboardContainer = styled(Box)({
  width: '100%',
});

const ToolbarCard = styled(Paper)({
  padding: '20px 24px',
  borderRadius: '20px',
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
  marginBottom: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '16px',
});

const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
  background: '#f1f5f9',
  borderRadius: '14px',
  padding: '4px',
  border: 'none',
  '& .MuiToggleButtonGroup-grouped': {
    border: 'none',
    borderRadius: '10px',
    padding: '8px 20px',
    margin: '0 2px',
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '14px',
    color: '#64748b',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: '#e2e8f0',
    },
    '&.Mui-selected': {
      background: '#10b981',
      color: '#ffffff',
      '&:hover': {
        background: '#059669',
      },
    },
  },
});

const MetricCard = styled(Card)({
  borderRadius: '20px',
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
  transition: 'all 0.3s ease',
  height: '100%',
  position: 'relative',
  overflow: 'visible',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(16, 185, 129, 0.15)',
    borderColor: '#10b981',
  },
});

const IconContainer = styled(Box)(({ color }) => ({
  width: '56px',
  height: '56px',
  borderRadius: '16px',
  background: color || '#10b981',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: `0 8px 24px ${color ? `${color}40` : 'rgba(16, 185, 129, 0.3)'}`,
}));

const ChangeChip = styled(Chip)(({ trend }) => ({
  height: '28px',
  fontWeight: 700,
  fontSize: '12px',
  borderRadius: '8px',
  background: trend === 'up' ? '#d1fae5' : '#fee2e2',
  color: trend === 'up' ? '#059669' : '#dc2626',
  border: 'none',
  '& .MuiChip-icon': {
    fontSize: '16px',
    color: trend === 'up' ? '#059669' : '#dc2626',
  },
}));

const ChartCard = styled(Paper)({
  padding: '28px',
  borderRadius: '20px',
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
  height: '400px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const ProductCard = styled(Paper)({
  padding: '16px',
  borderRadius: '16px',
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  marginBottom: '12px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateX(4px)',
    boxShadow: '0 4px 16px rgba(16, 185, 129, 0.12)',
    borderColor: '#10b981',
  },
});

const ProgressContainer = styled(Box)({
  flex: 1,
});

export default function SaleDashboard() {
  const [period, setPeriod] = useState('week');

  const handlePeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setPeriod(newPeriod);
    }
  };

  const metrics = [
    {
      label: 'Total Sales',
      value: '$12,450',
      change: '+12%',
      trend: 'up',
      icon: <AttachMoney sx={{ fontSize: 28, color: '#ffffff' }} />,
      color: '#10b981',
    },
    {
      label: 'Orders',
      value: '328',
      change: '+8%',
      trend: 'up',
      icon: <ShoppingCart sx={{ fontSize: 28, color: '#ffffff' }} />,
      color: '#6366f1',
    },
    {
      label: 'Customers',
      value: '1,284',
      change: '+15%',
      trend: 'up',
      icon: <People sx={{ fontSize: 28, color: '#ffffff' }} />,
      color: '#0ea5e9',
    },
    {
      label: 'Conversion',
      value: '3.2%',
      change: '-0.4%',
      trend: 'down',
      icon: <PercentRounded sx={{ fontSize: 28, color: '#ffffff' }} />,
      color: '#f59e0b',
    },
  ];

  const topProducts = [
    { name: 'Premium Widget Pro', sales: 145, revenue: '$4,350', progress: 85 },
    { name: 'Deluxe Package', sales: 98, revenue: '$2,940', progress: 65 },
    { name: 'Starter Kit', sales: 67, revenue: '$1,340', progress: 45 },
    { name: 'Enterprise Suite', sales: 18, revenue: '$3,820', progress: 25 },
  ];

  return (
    <DashboardContainer>
      {/* Toolbar */}
      <ToolbarCard elevation={0}>
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: '#0f172a',
              mb: 0.5,
            }}
          >
            Sales Dashboard
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#64748b',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <CalendarToday sx={{ fontSize: 16 }} />
            Last updated: 2 minutes ago
          </Typography>
        </Box>

        <StyledToggleButtonGroup
          value={period}
          exclusive
          onChange={handlePeriodChange}
          aria-label="time period"
        >
          <ToggleButton value="week">Week</ToggleButton>
          <ToggleButton value="month">Month</ToggleButton>
          <ToggleButton value="quarter">Quarter</ToggleButton>
        </StyledToggleButtonGroup>
      </ToolbarCard>

      {/* Metrics Grid */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {metrics.map((metric) => (
          <Grid item xs={12} sm={6} lg={3} key={metric.label}>
            <MetricCard elevation={0}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                  <IconContainer color={metric.color}>{metric.icon}</IconContainer>
                  <IconButton size="small" sx={{ color: '#94a3b8' }}>
                    <MoreVert fontSize="small" />
                  </IconButton>
                </Stack>

                <Typography
                  variant="body2"
                  sx={{
                    color: '#64748b',
                    fontWeight: 600,
                    fontSize: '13px',
                    mb: 1,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  {metric.label}
                </Typography>

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 900,
                    color: '#0f172a',
                    mb: 1.5,
                  }}
                >
                  {metric.value}
                </Typography>

                <ChangeChip
                  trend={metric.trend}
                  icon={metric.trend === 'up' ? <ArrowUpward /> : <ArrowDownward />}
                  label={metric.change}
                  size="small"
                />
              </CardContent>
            </MetricCard>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Chart Placeholder */}
        <Grid item xs={12} lg={8}>
          <ChartCard elevation={0}>
            <TrendingUp sx={{ fontSize: 64, color: '#e2e8f0', mb: 2 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#0f172a',
                mb: 1,
              }}
            >
              Sales Chart
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#64748b',
                textAlign: 'center',
                maxWidth: '400px',
              }}
            >
              Connect your analytics API or embed your charting library here. You can use Chart.js, Recharts, or any
              other visualization tool.
            </Typography>
          </ChartCard>
        </Grid>

        {/* Top Products */}
        <Grid item xs={12} lg={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: '20px',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
              height: '400px',
              overflow: 'auto',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: '#0f172a',
                mb: 2,
              }}
            >
              Top Products
            </Typography>

            {topProducts.map((product, index) => (
              <ProductCard key={product.name} elevation={0}>
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    fontWeight: 700,
                    fontSize: '18px',
                  }}
                >
                  {index + 1}
                </Avatar>

                <ProgressContainer>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        color: '#0f172a',
                        fontSize: '13px',
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        color: '#10b981',
                        fontSize: '13px',
                      }}
                    >
                      {product.revenue}
                    </Typography>
                  </Stack>

                  <LinearProgress
                    variant="determinate"
                    value={product.progress}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      background: '#e2e8f0',
                      '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
                        borderRadius: 3,
                      },
                    }}
                  />

                  <Typography
                    variant="caption"
                    sx={{
                      color: '#94a3b8',
                      fontSize: '11px',
                      fontWeight: 600,
                      mt: 0.5,
                      display: 'block',
                    }}
                  >
                    {product.sales} sales
                  </Typography>
                </ProgressContainer>
              </ProductCard>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </DashboardContainer>
  );
}