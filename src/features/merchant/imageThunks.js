import { createAsyncThunk } from '@reduxjs/toolkit';
import { uploadImage as uploadImageApi, deleteImage as deleteImageApi } from '../../api/merchant/imageApi';

export const uploadImage = createAsyncThunk(
  'image/uploadImage',
  async ({ imageFile, imageType }, { rejectWithValue }) => {
    try {
      return await uploadImageApi(imageFile, imageType);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to upload image');
    }
  }
);

export const deleteImage = createAsyncThunk(
  'image/deleteImage',
  async (imageType, { rejectWithValue }) => {
    try {
      await deleteImageApi(imageType);
      return imageType; // Return imageType to update state
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete image');
    }
  }
);