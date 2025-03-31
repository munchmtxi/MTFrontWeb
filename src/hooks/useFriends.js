import { useDispatch, useSelector } from 'react-redux';
import {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriendsList,
} from '../features/customer/friendThunks';
import { resetFriendError } from '../features/customer/friendSlice'; // Import from slice

const useFriends = () => {
  const dispatch = useDispatch();
  const { friends, pendingRequests, loading, error } = useSelector((state) => state.friends);

  return {
    friends,
    pendingRequests,
    loading,
    error,
    sendRequest: (friendId) => dispatch(sendFriendRequest(friendId)),
    acceptRequest: (requestId) => dispatch(acceptFriendRequest(requestId)),
    rejectRequest: (requestId) => dispatch(rejectFriendRequest(requestId)),
    getFriends: () => dispatch(getFriendsList()),
    resetError: () => dispatch(resetFriendError()),
  };
};

export default useFriends;