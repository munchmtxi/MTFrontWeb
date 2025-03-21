import axiosInstance from '../axios';

export const createOrUpdateDraft = async (draftData) => {
  const response = await axiosInstance.post('/api/v1/merchants/profile/drafts', draftData);
  return response.data.data.draft;
};

export const getDraft = async () => {
  const response = await axiosInstance.get('/api/v1/merchants/profile/drafts');
  return response.data.data ? response.data.data.draft : null;
};

export const submitDraft = async () => {
  const response = await axiosInstance.post('/api/v1/merchants/profile/drafts/submit');
  return response.data.data.draft;
};