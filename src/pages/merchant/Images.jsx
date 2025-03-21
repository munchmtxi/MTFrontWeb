/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { css, useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, deleteImage } from '../../features/merchant/imageThunks';
import { setImages } from '../../features/merchant/imageSlice';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const imagesStyles = (theme) => css`
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

const buttonStyles = (theme) => css`
  ${theme.components.button.baseStyle};
  ${theme.components.button.variants.primary};
  ${theme.components.button.sizes.md};
  margin: ${theme.spacing[2]} 0;
`;

const deleteButtonStyles = (theme) => css`
  ${theme.components.button.baseStyle};
  ${theme.components.button.variants.outline};
  ${theme.components.button.sizes.md};
  margin-left: ${theme.spacing[2]};
`;

const imagePreviewStyles = (theme) => css`
  max-width: 200px;
  margin-top: ${theme.spacing[2]};
  border-radius: ${theme.radii.base};
`;

const Images = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { logoUrl, bannerUrl, storefrontUrl, status, error } = useSelector((state) => state.image);
  const merchantId = user?.merchant?.id;

  useEffect(() => {
    // Assuming merchant profile data is available in auth state
    if (merchantId && user?.merchant) {
      dispatch(setImages({
        logoUrl: user.merchant.logo_url,
        bannerUrl: user.merchant.banner_url,
        storefrontUrl: user.merchant.storefront_url,
      }));
    }
  }, [dispatch, merchantId, user]);

  const handleImageUpload = (imageType) => (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(uploadImage({ imageFile: file, imageType }));
    }
  };

  const handleImageDelete = (imageType) => () => {
    dispatch(deleteImage(imageType));
  };

  if (status === 'loading') return <LoadingSpinner />;
  if (error) return <div css={imagesStyles(theme)}>Error: {error}</div>;

  return (
    <div css={imagesStyles(theme)}>
      <section css={sectionStyles(theme)}>
        <h2 css={headingStyles(theme)}>Manage Images</h2>
        
        {/* Logo */}
        <div css={cardStyles(theme)}>
          <h3>Logo</h3>
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageUpload('logo')} />
          {logoUrl && (
            <div>
              <img src={logoUrl} alt="Logo" css={imagePreviewStyles(theme)} />
              <button css={deleteButtonStyles(theme)} onClick={handleImageDelete('logo')}>
                Delete Logo
              </button>
            </div>
          )}
        </div>

        {/* Banner */}
        <div css={cardStyles(theme)}>
          <h3>Banner</h3>
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageUpload('banner')} />
          {bannerUrl && (
            <div>
              <img src={bannerUrl} alt="Banner" css={imagePreviewStyles(theme)} />
              <button css={deleteButtonStyles(theme)} onClick={handleImageDelete('banner')}>
                Delete Banner
              </button>
            </div>
          )}
        </div>

        {/* Storefront */}
        <div css={cardStyles(theme)}>
          <h3>Storefront</h3>
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageUpload('storefront')} />
          {storefrontUrl && (
            <div>
              <img src={storefrontUrl} alt="Storefront" css={imagePreviewStyles(theme)} />
              <button css={deleteButtonStyles(theme)} onClick={handleImageDelete('storefront')}>
                Delete Storefront
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Images;