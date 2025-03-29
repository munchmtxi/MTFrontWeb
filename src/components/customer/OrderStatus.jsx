/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import { cardStyles, cardHeadingStyles, cardTextStyles } from '../common/styles';

const statusStyles = css`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const stepStyles = css`
  text-align: center;
  flex: 1;
  position: relative;
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 15px;
    left: 50%;
    width: 100%;
    height: 2px;
    background: #ccc;
    z-index: -1;
  }
`;

const stepCircleStyles = css`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px;
  &.active {
    background: #1dbf1d;
    color: #000;
  }
`;

const OrderStatus = ({ order }) => {
  const steps = [
    { label: 'Pending', status: 'pending' },
    { label: 'Confirmed', status: 'confirmed' },
    { label: 'Preparing', status: 'preparing' },
    { label: 'Ready', status: 'ready' },
    { label: 'Out for Delivery', status: 'out_for_delivery' },
    { label: 'Completed', status: 'completed' },
  ];

  const currentStepIndex = steps.findIndex(step => step.status === order.status);

  return (
    <div css={cardStyles}>
      <h3 css={cardHeadingStyles}>Order #{order.order_number}</h3>
      <p css={cardTextStyles}>Status: {order.status}</p>
      {order.estimated_delivery_time && (
        <p css={cardTextStyles}>
          Estimated Delivery: {new Date(order.estimated_delivery_time).toLocaleString()}
        </p>
      )}
      <div css={statusStyles}>
        {steps.map((step, index) => (
          <div key={step.status} css={stepStyles}>
            <div css={[stepCircleStyles, index <= currentStepIndex ? css`&.active` : null]}>
              {index + 1}
            </div>
            <p css={cardTextStyles}>{step.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

OrderStatus.propTypes = {
  order: PropTypes.shape({
    order_number: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    estimated_delivery_time: PropTypes.string,
  }).isRequired,
};

export default OrderStatus;