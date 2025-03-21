/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css, useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveBanners, addBanner, deleteBanner } from '@/features/merchant/bannerThunks';
import MerchantHeader from '@/components/merchant/MerchantHeader';

// ----- Styles -----
const bannerPageStyles = (theme) => css`
  padding: ${theme.spacing[4]};
  max-width: ${theme.breakpoints['2xl']};
  margin: 0 auto;
`;

const headingStyles = (theme) => css`
  font-family: ${theme.typography.fonts.heading};
  font-size: ${theme.typography.fontSizes['2xl']};
  color: ${theme.greenScale[700]};
  margin-bottom: ${theme.spacing[4]};
`;

const bannerListStyles = (theme) => css`
  display: grid;
  gap: ${theme.spacing[4]};
`;

const bannerItemStyles = (theme) => css`
  border: 1px solid ${theme.grayScale[300]};
  padding: ${theme.spacing[3]};
  border-radius: ${theme.radii.md};
`;

const formStyles = (theme) => css`
  margin-bottom: ${theme.spacing[4]};
  display: grid;
  gap: ${theme.spacing[2]};
`;

const inputStyles = (theme) => css`
  padding: ${theme.spacing[2]};
  border: 1px solid ${theme.grayScale[300]};
  border-radius: ${theme.radii.sm};
  font-size: ${theme.typography.fontSizes.md};
  width: 100%;
  box-sizing: border-box;
`;

const labelStyles = (theme) => css`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.grayScale[700]};
  margin-bottom: ${theme.spacing[1]};
`;

const buttonStyles = (theme) => css`
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  background-color: ${theme.greenScale[500]};
  color: #ffffff;
  border: none;
  border-radius: ${theme.radii.md};
  cursor: pointer;
  &:hover {
    background-color: ${theme.greenScale[400]};
  }
  &:disabled {
    background-color: ${theme.grayScale[400]};
    cursor: not-allowed;
  }
`;

const infoStyles = (theme) => css`
  margin-bottom: ${theme.spacing[1]};
  font-size: ${theme.typography.fontSizes.md};
  color: ${theme.grayScale[800]};
`;

const errorStyles = (theme) => css`
  color: ${theme.grayScale[400]};
  font-size: ${theme.typography.fontSizes.md};
  margin-bottom: ${theme.spacing[3]};
`;

const Banners = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { banners, loading, error } = useSelector((state) => state.banner || { banners: [], loading: false, error: null });

  const [newBanner, setNewBanner] = useState({
    title: '',
    seasonStart: '',
    seasonEnd: '',
    isActive: true,
    image: null,
  });

  useEffect(() => {
    dispatch(getActiveBanners());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBanner((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewBanner((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleAddBanner = async (e) => {
    e.preventDefault();
    await dispatch(addBanner({ bannerData: newBanner, imageFile: newBanner.image }));
    setNewBanner({ title: '', seasonStart: '', seasonEnd: '', isActive: true, image: null });
    dispatch(getActiveBanners());
  };

  const handleDeleteBanner = (bannerId) => {
    dispatch(deleteBanner(bannerId));
  };

  return (
    <>
      <MerchantHeader />
      <div css={bannerPageStyles(theme)}>
        <h1 css={headingStyles(theme)}>Banner Management</h1>
        {loading && <p css={infoStyles(theme)}>Loading...</p>}
        {error && <p css={errorStyles(theme)}>Error: {error}</p>}

        <form onSubmit={handleAddBanner} css={formStyles(theme)}>
          <div>
            <label css={labelStyles(theme)}>Title</label>
            <input
              type="text"
              name="title"
              value={newBanner.title}
              onChange={handleInputChange}
              required
              css={inputStyles(theme)}
            />
          </div>
          <div>
            <label css={labelStyles(theme)}>Season Start</label>
            <input
              type="date"
              name="seasonStart"
              value={newBanner.seasonStart}
              onChange={handleInputChange}
              required
              css={inputStyles(theme)}
            />
          </div>
          <div>
            <label css={labelStyles(theme)}>Season End</label>
            <input
              type="date"
              name="seasonEnd"
              value={newBanner.seasonEnd}
              onChange={handleInputChange}
              required
              css={inputStyles(theme)}
            />
          </div>
          <div>
            <label css={labelStyles(theme)}>Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              css={inputStyles(theme)}
            />
          </div>
          <button type="submit" css={buttonStyles(theme)} disabled={loading}>
            Add Banner
          </button>
        </form>

        <div css={bannerListStyles(theme)}>
          {Array.isArray(banners) && banners.length > 0 ? (
            banners.map((banner) => (
              <div key={banner.id} css={bannerItemStyles(theme)}>
                <img src={banner.banner_url} alt={banner.title} css={css`max-width: 200px;`} />
                <p css={infoStyles(theme)}>{banner.title || 'Untitled'}</p>
                <p css={infoStyles(theme)}>Start: {banner.season_start ? new Date(banner.season_start).toLocaleDateString() : 'N/A'}</p>
                <p css={infoStyles(theme)}>End: {banner.season_end ? new Date(banner.season_end).toLocaleDateString() : 'N/A'}</p>
                <p css={infoStyles(theme)}>Active: {banner.is_active ? 'Yes' : 'No'}</p>
                <button
                  onClick={() => handleDeleteBanner(banner.id)}
                  css={buttonStyles(theme)}
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p css={infoStyles(theme)}>No banners available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Banners;