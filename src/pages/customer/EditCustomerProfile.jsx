/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
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

const EditCustomerProfile = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '', address: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await customerProfileApi.getProfile();
        const { firstName, lastName, phone, address } = response.data.data;
        setFormData({ firstName, lastName, phone, address });
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await customerProfileApi.updateProfile(formData);
      navigate('/customer/profile');
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <div css={formStyle}>
      <CustomerHeader />
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
        <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
        <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditCustomerProfile;