import { useDispatch, useSelector } from 'react-redux';
import {
  addItemToOrder,
  updateInDiningOrder,
  closeInDiningOrder,
  getInDiningOrderStatus,
  payInDiningOrder,
  getInDiningRecommendations,
  addTipToOrder,
  getActiveBookingSession,
  addFriendFromSession,
} from '../features/customer/inDiningThunks';
import { resetInDiningError } from '../features/customer/inDiningSlice';

const useInDining = () => {
  const dispatch = useDispatch();
  const { orders, recommendations, activeSession, loading, error } = useSelector((state) => state.inDining);

  return {
    orders,
    recommendations,
    activeSession,
    loading,
    error,
    addItem: (orderId, items) => dispatch(addItemToOrder({ orderId, items })),
    updateOrder: (orderId, updates) => dispatch(updateInDiningOrder({ orderId, updates })),
    closeOrder: (orderId) => dispatch(closeInDiningOrder(orderId)),
    getOrderStatus: (orderId) => dispatch(getInDiningOrderStatus(orderId)),
    payOrder: (orderId, paymentData) => dispatch(payInDiningOrder({ orderId, paymentData })),
    getRecommendations: (branchId) => dispatch(getInDiningRecommendations(branchId)),
    addTip: (orderId, tipData) => dispatch(addTipToOrder({ orderId, tipData })),
    getActiveSession: (orderId) => dispatch(getActiveBookingSession(orderId)),
    addFriend: (orderId, friendUserId) => dispatch(addFriendFromSession({ orderId, friendUserId })),
    resetError: () => dispatch(resetInDiningError()),
  };
};

export default useInDining;