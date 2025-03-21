/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css, useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPerformanceMetrics,
  updateMetricsForOrder,
  recalculateMetrics,
} from '../../features/merchant/merchantPerformanceMetricsThunks'; // Correct import
import LoadingSpinner from '../../components/common/LoadingSpinner';

const metricsStyles = (theme) => css`
  padding: ${theme.spacing[6]};
  background-color: #1a1a1a;
  min-height: 100vh;
  color: #ffffff;
`;

const sectionStyles = (theme) => css`
  margin-bottom: ${theme.spacing[6]};
`;

const headingStyles = (theme) => css`
  font-family: ${theme.typography.fonts.heading};
  font-size: ${theme.typography.fontSizes['2xl']};
  margin-bottom: ${theme.spacing[4]};
`;

const cardStyles = (theme) => css`
  ${theme.components.card.baseStyle};
  padding: ${theme.spacing[4]};
  background-color: ${theme.components.card.variants.filled.backgroundColor};
`;

const inputStyles = (theme) => css`
  ${theme.components.input.baseStyle};
  width: 100%;
  margin-bottom: ${theme.spacing[4]};
`;

const buttonStyles = (theme) => css`
  ${theme.components.button.baseStyle};
  ${theme.components.button.variants.primary};
  ${theme.components.button.sizes.md};
  margin-right: ${theme.spacing[2]};
`;

const selectStyles = (theme) => css`
  ${theme.components.input.baseStyle};
  width: 100%;
  margin-bottom: ${theme.spacing[4]};
`;

const MerchantPerformanceMetrics = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { metrics, status, error } = useSelector((state) => state.merchantPerformanceMetrics);
  const [periodType, setPeriodType] = useState('daily');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    dispatch(getPerformanceMetrics({ periodType, startDate, endDate }));
  }, [dispatch, periodType, startDate, endDate]);

  const handleFetchMetrics = () => {
    dispatch(getPerformanceMetrics({ periodType, startDate, endDate }));
  };

  const handleUpdateMetrics = () => {
    if (orderId) {
      dispatch(updateMetricsForOrder(orderId)).then(() => {
        setOrderId('');
        dispatch(getPerformanceMetrics({ periodType, startDate, endDate }));
      });
    }
  };

  const handleRecalculateMetrics = () => {
    dispatch(recalculateMetrics({ periodType, startDate, endDate }));
  };

  // Log metrics for debugging
  console.log('Metrics Data:', JSON.stringify(metrics, null, 2));

  if (status === 'loading') return <LoadingSpinner />;
  if (error) return <div css={metricsStyles(theme)}>Error: {error}</div>;

  return (
    <div css={metricsStyles(theme)}>
      <section css={sectionStyles(theme)}>
        <h2 css={headingStyles(theme)}>Performance Metrics</h2>
        <div css={cardStyles(theme)}>
          <select css={selectStyles(theme)} value={periodType} onChange={(e) => setPeriodType(e.target.value)}>
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            css={inputStyles(theme)}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            css={inputStyles(theme)}
          />
          <button css={buttonStyles(theme)} onClick={handleFetchMetrics}>
            Fetch Metrics
          </button>
          <input
            type="number"
            placeholder="Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            css={inputStyles(theme)}
          />
          <button css={buttonStyles(theme)} onClick={handleUpdateMetrics}>
            Update Metrics for Order
          </button>
          <button css={buttonStyles(theme)} onClick={handleRecalculateMetrics}>
            Recalculate Metrics
          </button>
          <div>
            <h3>Metrics</h3>
            {metrics.length > 0 ? (
              <ul>
                {metrics.map((metric, index) => {
                  const avgOrderValue = typeof metric.avg_order_value === 'number'
                    ? metric.avg_order_value.toFixed(2)
                    : parseFloat(metric.avg_order_value || 0).toFixed(2);

                  return (
                    <li key={index}>
                      <strong>Period:</strong> {metric.period_type} ({new Date(metric.period_start).toLocaleDateString()} - {new Date(metric.period_end).toLocaleDateString()})<br />
                      Orders: {metric.orders_count}, Completed: {metric.completed_orders}, Cancelled: {metric.cancelled_orders}<br />
                      Total Revenue: {metric.total_revenue}, Net Revenue: {metric.net_revenue}, Avg Order Value: {avgOrderValue}<br />
                      Average Rating: {metric.average_rating}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>No metrics available for the selected period.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MerchantPerformanceMetrics;