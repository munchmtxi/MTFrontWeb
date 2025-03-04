 
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/notification';

export const useUserNotifications = (userId, options = {}) =>
  useQuery(
    ['notifications', userId],
    () =>
      axios.get(`${BASE_URL}/user`, {
        params: options,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }).then((res) => res.data.data),
    { enabled: !!userId }
  );

export const useSendNotification = () =>
  useMutation((data) =>
    axios.post(
      `${BASE_URL}/${data.type.toLowerCase()}/template`,
      data,
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    ).then((res) => res.data.data)
  );