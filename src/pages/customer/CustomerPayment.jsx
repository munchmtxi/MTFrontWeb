/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import customerProfileApi from '../../api/customer/profile/customerProfileApi';
import CustomerHeader from '../../components/customer/CustomerHeader';

const paymentStyle = css`
  padding: 2rem;
`;

const CustomerPayment = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [newMethod, setNewMethod] = useState({ type: 'card', last4: '', expiry: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await customerProfileApi.getProfile();
        setPaymentMethods(response.data.data.paymentMethods || []);
      } catch (error) {
        console.error('Failed to fetch payment methods:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setNewMethod({ ...newMethod, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    try {
      const response = await customerProfileApi.managePaymentMethods({
        action: 'add',
        paymentMethod: newMethod,
      });
      setPaymentMethods(response.data.data);
      setNewMethod({ type: 'card', last4: '', expiry: '' });
    } catch (error) {
      console.error('Failed to add payment method:', error);
    }
  };

  return (
    <div css={paymentStyle}>
      <CustomerHeader />
      <h1>Payment Methods</h1>
      {paymentMethods.map((method) => (
        <div key={method.id}>
          {method.type} - {method.last4} (Expires: {method.expiry})
        </div>
      ))}
      <h2>Add New Payment Method</h2>
      <input name="last4" value={newMethod.last4} onChange={handleChange} placeholder="Last 4 Digits" />
      <input name="expiry" value={newMethod.expiry} onChange={handleChange} placeholder="MM/YY" />
      <button onClick={handleAdd}>Add Card</button>
    </div>
  );
};

export default CustomerPayment;