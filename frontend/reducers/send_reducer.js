import { 
  SEND_RESERVATIONS,
} from "../actions/reservation_actions";

const sendReducer = (oldState = null, action) => {
  switch (action.type) {
    case SEND_RESERVATIONS:
      let reservations = action.payload
      return reservations;
    default:
      return oldState;
  }
};

export default sendReducer;
