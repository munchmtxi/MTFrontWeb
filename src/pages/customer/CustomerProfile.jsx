/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import customerProfileApi from '../../api/customer/profile/customerProfileApi';
import CustomerHeader from '../../components/customer/CustomerHeader';

const profileStyle = css`
  padding: 2rem;
`;

const CustomerProfile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await customerProfileApi.getProfile();
        setProfile(response.data.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div css={profileStyle}>
      <CustomerHeader />
      <h1>Your Profile</h1>
      <p>First Name: {profile.firstName}</p>
      <p>Last Name: {profile.lastName}</p>
      <p>Email: {profile.email}</p>
      <p>Phone: {profile.phone}</p>
      <p>Address: {profile.address}</p>
      <p>Payment Methods: {profile.paymentMethods?.length || 0} registered</p>
      <button onClick={() => navigate('/customer/profile/edit')}>Edit Profile</button>
    </div>
  );
};

export default CustomerProfile;