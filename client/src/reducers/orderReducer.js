import { GET_ORDERS, GET_INACTIVE_ORDERS } from '../actions/types';

const initialState = {
  orders: [],
  inactiveOrders: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case GET_INACTIVE_ORDERS:
      return {
        ...state,
        inactiveOrders: action.payload,
      };
    default:
      return state;
  }
}
