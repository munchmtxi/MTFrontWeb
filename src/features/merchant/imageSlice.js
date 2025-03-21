import { createSlice } from '@reduxjs/toolkit';
import { uploadImage, deleteImage } from './imageThunks';

const initialState = {
  logoUrl: null,
  bannerUrl: null,
  storefrontUrl: null,
  status: 'idle',
  error: null,
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setImages: (state, action) => {
      state.logoUrl = action.payload.logoUrl || null;
      state.bannerUrl = action.payload.bannerUrl || null;
      state.storefrontUrl = action.payload.storefrontUrl || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { logoUrl, bannerUrl, storefrontUrl } = action.payload;
        if (logoUrl) state.logoUrl = logoUrl;
        if (bannerUrl) state.bannerUrl = bannerUrl;
        if (storefrontUrl) state.storefrontUrl = storefrontUrl;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteImage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const imageType = action.meta.arg;
        state[`${imageType}Url`] = null;
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setImages } = imageSlice.actions;
export default imageSlice.reducer;