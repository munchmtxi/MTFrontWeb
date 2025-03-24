/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

const headerStyle = css`
  padding: 1rem;
  background-color: #2d2d2d;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const dropdownStyle = css`
  position: relative;
  display: inline-block;
`;

const dropdownButtonStyle = css`
  background-color: #4caf50;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
`;

const dropdownContentStyle = css`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  &.show {
    display: block;
  }
`;

const linkStyle = css`
  color: black;
  padding: 0.5rem 1rem;
  text-decoration: none;
  display: block;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const CustomerHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header css={headerStyle}>
      <h2>Customer Portal</h2>
      <div css={dropdownStyle}>
        <button css={dropdownButtonStyle} onClick={() => setDropdownOpen(!dropdownOpen)}>
          Profile Options
        </button>
        <div css={dropdownContentStyle} className={dropdownOpen ? 'show' : ''}>
          <Link to="/customer/profile" css={linkStyle} onClick={() => setDropdownOpen(false)}>View Profile</Link>
          <Link to="/customer/profile/edit" css={linkStyle} onClick={() => setDropdownOpen(false)}>Edit Profile</Link>
          <Link to="/customer/profile/password" css={linkStyle} onClick={() => setDropdownOpen(false)}>Change Password</Link>
          <Link to="/customer/profile/payment" css={linkStyle} onClick={() => setDropdownOpen(false)}>Payment Methods</Link>
        </div>
      </div>
    </header>
  );
};

export default CustomerHeader;