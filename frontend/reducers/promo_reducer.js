import { 
  RECEIVE_PROMOS,
  RECEIVE_PROMO,
} from "../actions/promo_actions";

const promoReducer = (oldState = null, action) => {
  switch (action.type) {
    case RECEIVE_PROMO:
      let currentPromo = action.promo
      return currentPromo;
    case RECEIVE_PROMOS:
      let allPromos = action.promos
      return allPromos;
    default:
      return oldState;
  }
};

export default promoReducer;
