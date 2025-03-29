/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const cardStyles = css`
  background: #222;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.8);
  }
`;

export const cardHeadingStyles = css`
  font-size: 18px;
  font-weight: 600;
  color: #1dbf1d;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const cardTextStyles = css`
  font-size: 14px;
  color: #ccc;
  margin: 5px 0;
`;

export const buttonStyles = css`
  padding: 8px 16px;
  background: #1dbf1d;
  color: #000;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
  &:hover {
    background: #17a317;
    transform: scale(1.05);
  }
  &:disabled {
    background: #666;
    cursor: not-allowed;
  }
`;

export const contentStyles = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;
