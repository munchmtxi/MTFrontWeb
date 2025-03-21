/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css, useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, createProduct, deleteProduct } from '@/features/merchant/productThunks';
import MerchantHeader from '@/components/merchant/MerchantHeader';

// ----- Styles -----
const productsStyles = (theme) => css`
  min-height: 100vh;
  background-color: ${theme.grayScale[100]};
  padding: ${theme.spacing[6]} ${theme.spacing[4]};
`;

const headingStyles = (theme) => css`
  font-family: ${theme.typography.fonts.heading};
  font-size: ${theme.typography.fontSizes['2xl']};
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.components.roles.merchant.primary};
  margin-bottom: ${theme.spacing[4]};
`;

const cardStyles = (theme) => css`
  ${theme.components.card.baseStyle};
  ${theme.components.card.variants.interactive};
  padding: ${theme.spacing[4]};
  margin-bottom: ${theme.spacing[4]};
`;

const buttonStyles = (theme) => css`
  ${theme.components.button.baseStyle};
  ${theme.components.button.variants.primary};
  ${theme.components.button.sizes.md};
  margin: ${theme.spacing[2]} 0;
`;

const inputStyles = (theme) => css`
  ${theme.components.input.baseStyle};
  ${theme.components.input.sizes.md};
  width: 100%;
  margin-bottom: ${theme.spacing[2]};
`;

const listStyles = (theme) => css`
  list-style: none;
  padding: 0;
`;

const listItemStyles = (theme) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing[2]};
  background-color: ${theme.grayScale[900]};
  border-radius: ${theme.radii.md};
  margin-bottom: ${theme.spacing[2]};
  color: ${theme.grayScale[100]};
`;

const Products = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products); // Access state.products
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const productData = {
      ...newProduct,
      price: parseFloat(newProduct.price),
      is_published: true,
    };
    dispatch(createProduct(productData)).then(() => {
      setNewProduct({ name: '', price: '', description: '' });
      dispatch(fetchProducts({ page: 1, limit: 10 }));
    });
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(productId)).then(() => {
        dispatch(fetchProducts({ page: 1, limit: 10 }));
      });
    }
  };

  // Extract items from products, default to empty array if undefined
  const productItems = products?.items || [];

  return (
    <div css={productsStyles(theme)}>
      <MerchantHeader />
      <h1 css={headingStyles(theme)}>Manage Your Products</h1>

      {/* Create Product Form */}
      <div css={cardStyles(theme)}>
        <h2 css={css`font-size: ${theme.typography.fontSizes.lg}; margin-bottom: ${theme.spacing[2]};`}>Add New Product</h2>
        <form onSubmit={handleCreateProduct}>
          <input
            css={inputStyles(theme)}
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            required
          />
          <input
            css={inputStyles(theme)}
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            placeholder="Price"
            step="0.01"
            required
          />
          <input
            css={inputStyles(theme)}
            type="text"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            placeholder="Description"
          />
          <button type="submit" css={buttonStyles(theme)} disabled={loading}>
            {loading ? 'Adding...' : 'Add Product'}
          </button>
        </form>
      </div>

      {/* Product List */}
      <div css={cardStyles(theme)}>
        <h2 css={css`font-size: ${theme.typography.fontSizes.lg}; margin-bottom: ${theme.spacing[2]};`}>Product List</h2>
        {loading && <p>Loading...</p>}
        {error && <p css={css`color: #ff6b6b;`}>{error}</p>}
        {productItems.length > 0 ? (
          <ul css={listStyles(theme)}>
            {productItems.map((product) => (
              <li key={product.id} css={listItemStyles(theme)}>
                <span>{product.name} - ${product.price}</span>
                <button
                  css={css`
                    ${theme.components.button.baseStyle};
                    ${theme.components.button.variants.outline};
                    ${theme.components.button.sizes.sm};
                  `}
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Products;