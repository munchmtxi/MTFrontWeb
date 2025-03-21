/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css, useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPlacePredictions,
  getPlaceDetails,
  updateMerchantAddress,
} from '../../features/merchant/mapsThunks';
import { clearPredictions, clearSelectedDetails } from '../../features/merchant/mapsSlice';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { v4 as uuidv4 } from 'uuid';

const mapsStyles = (theme) => css`
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

const predictionStyles = (theme) => css`
  padding: ${theme.spacing[2]};
  cursor: pointer;
  &:hover {
    background-color: ${theme.greenScale[600]};
  }
`;

const buttonStyles = (theme) => css`
  ${theme.components.button.baseStyle};
  ${theme.components.button.variants.primary};
  ${theme.components.button.sizes.md};
  margin-top: ${theme.spacing[2]};
`;

const Maps = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { predictions, selectedDetails, merchantAddress, status, error } = useSelector((state) => state.maps);
  const { user } = useSelector((state) => state.auth);
  const [searchInput, setSearchInput] = useState('');
  const [sessionToken, setSessionToken] = useState(uuidv4()); // Generate unique session token

  useEffect(() => {
    if (merchantAddress) {
      // Optionally update auth state or merchant profile here if needed
    }
  }, [merchantAddress]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    if (value.length > 2) {
      dispatch(getPlacePredictions({ input: value, sessionToken }));
    } else {
      dispatch(clearPredictions());
    }
  };

  const handlePredictionClick = (placeId) => {
    dispatch(getPlaceDetails({ placeId, sessionToken }));
    dispatch(clearPredictions());
    setSearchInput('');
  };

  const handleUpdateAddress = () => {
    if (selectedDetails) {
      const addressData = {
        placeId: selectedDetails.placeId || selectedDetails.place_id, // Backend might return place_id
        formattedAddress: selectedDetails.formattedAddress,
        location: selectedDetails.location,
      };
      dispatch(updateMerchantAddress(addressData));
    }
  };

  if (status === 'loading') return <LoadingSpinner />;
  if (error) return <div css={mapsStyles(theme)}>Error: {error}</div>;

  return (
    <div css={mapsStyles(theme)}>
      <section css={sectionStyles(theme)}>
        <h2 css={headingStyles(theme)}>Update Address</h2>
        <div css={cardStyles(theme)}>
          <input
            type="text"
            placeholder="Search for an address..."
            value={searchInput}
            onChange={handleSearchChange}
            css={inputStyles(theme)}
          />
          {predictions.length > 0 && (
            <div>
              {predictions.map((prediction) => (
                <div
                  key={prediction.placeId}
                  css={predictionStyles(theme)}
                  onClick={() => handlePredictionClick(prediction.placeId)}
                >
                  <strong>{prediction.mainText}</strong> - {prediction.secondaryText}
                </div>
              ))}
            </div>
          )}
          {selectedDetails && (
            <div>
              <p>Formatted Address: {selectedDetails.formattedAddress}</p>
              <p>Latitude: {selectedDetails.location.lat}</p>
              <p>Longitude: {selectedDetails.location.lng}</p>
              <button css={buttonStyles(theme)} onClick={handleUpdateAddress}>
                Update Merchant Address
              </button>
            </div>
          )}
          {merchantAddress && (
            <div css={cardStyles(theme)}>
              <h3>Current Address</h3>
              <p>Formatted Address: {merchantAddress.formatted_address}</p>
              <p>Latitude: {merchantAddress.latitude}</p>
              <p>Longitude: {merchantAddress.longitude}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Maps;