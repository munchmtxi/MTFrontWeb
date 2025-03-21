import axios from '../axios';

const bannerApi = {
  // Add a new banner (multipart/form-data for file upload)
  addBanner: async (bannerData, imageFile) => {
    const formData = new FormData();
    formData.append('title', bannerData.title);
    formData.append('season_start', bannerData.seasonStart);
    formData.append('season_end', bannerData.seasonEnd);
    formData.append('is_active', bannerData.isActive);
    formData.append('display_order', bannerData.displayOrder || 0);
    if (imageFile) formData.append('image', imageFile);

    const response = await axios.post('/merchant/profile/banners', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // Update a banner
  updateBanner: async (bannerId, bannerData, imageFile) => {
    const formData = new FormData();
    if (bannerData.title) formData.append('title', bannerData.title);
    if (bannerData.seasonStart) formData.append('season_start', bannerData.seasonStart);
    if (bannerData.seasonEnd) formData.append('season_end', bannerData.seasonEnd);
    if (bannerData.isActive !== undefined) formData.append('is_active', bannerData.isActive);
    if (bannerData.displayOrder !== undefined) formData.append('display_order', bannerData.displayOrder);
    if (imageFile) formData.append('image', imageFile);

    const response = await axios.patch(`/merchant/profile/banners/${bannerId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // Delete a banner
  deleteBanner: async (bannerId) => {
    const response = await axios.delete(`/merchant/profile/banners/${bannerId}`);
    return response.data;
  },

  // Get a specific banner
  getBanner: async (bannerId) => {
    const response = await axios.get(`/merchant/profile/banners/${bannerId}`);
    return response.data;
  },

  // Get active banners
  getActiveBanners: async () => {
    const response = await axios.get('/merchant/profile/banners');
    return response.data;
  },

  // Update banner order
  updateBannerOrder: async (bannerOrders) => {
    const response = await axios.patch('/merchant/profile/banners/order', { bannerOrders });
    return response.data;
  },
};

export default bannerApi;