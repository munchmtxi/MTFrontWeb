import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createOrUpdateDraft as createOrUpdateDraftApi,
  getDraft as getDraftApi,
  submitDraft as submitDraftApi,
} from '../../api/merchant/draftApi';

export const createOrUpdateDraft = createAsyncThunk(
  'draft/createOrUpdateDraft',
  async (draftData, { rejectWithValue }) => {
    try {
      return await createOrUpdateDraftApi(draftData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to save draft');
    }
  }
);

export const getDraft = createAsyncThunk(
  'draft/getDraft',
  async (_, { rejectWithValue }) => {
    try {
      return await getDraftApi();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch draft');
    }
  }
);

export const submitDraft = createAsyncThunk(
  'draft/submitDraft',
  async (_, { rejectWithValue }) => {
    try {
      return await submitDraftApi();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to submit draft');
    }
  }
);