/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import customerProfileApi from '../../api/customer/profile/customerProfileApi';
import CustomerHeader from '../../components/customer/CustomerHeader';

const formStyle = css`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
`;

const CustomerPassword = () => {
  const [formData, setFormData] = useState({ currentPassword: '', newPassword: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await customerProfileApi.changePassword(formData);
      navigate('/customer/profile');
    } catch (error) {
      console.error('Failed to change password:', error);
    }
  };

  return (
    <div css={formStyle}>
      <CustomerHeader />
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          placeholder="Current Password"
        />
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="New Password"
        />
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};

export default CustomerPassword;