import { useState } from 'react';
import './SaleDashboard.css';

/**
 * Sale Dashboard: embedded view for sales metrics and data.
 * Replace this with an iframe to your sale-dashboard app or real API data.
 */
export default function SaleDashboard() {
  const [period, setPeriod] = useState('week');

  // Placeholder metrics – replace with real API calls
  const metrics = [
    { label: 'Total Sales', value: '$12,450', change: '+12%' },
    { label: 'Orders', value: '328', change: '+8%' },
    { label: 'Avg. Order', value: '$38', change: '-2%' },
    { label: 'Conversion', value: '3.2%', change: '+0.4%' },
  ];

  return (
    <div className="sale-dashboard">
      <div className="sale-dashboard-toolbar">
        <div className="period-tabs">
          {['week', 'month', 'quarter'].map((p) => (
            <button
              key={p}
              type="button"
              className={period === p ? 'period-tab active' : 'period-tab'}
              onClick={() => setPeriod(p)}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="sale-dashboard-metrics">
        {metrics.map((m) => (
          <div key={m.label} className="metric-card">
            <span className="metric-label">{m.label}</span>
            <span className="metric-value">{m.value}</span>
            <span className="metric-change positive">{m.change}</span>
          </div>
        ))}
      </div>

      <div className="sale-dashboard-placeholder">
        <p>Sale dashboard content</p>
        <p className="hint">
          Connect your sale-dashboard API or embed the sale-dashboard app here (e.g. via iframe or micro-frontend).
        </p>
      </div>
    </div>
  );
}
