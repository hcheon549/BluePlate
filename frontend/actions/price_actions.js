const SET_CHARGE_PRICE = 'SET_CHARGE_PRICE';

export function setChargePrice(price) {
  return {
    type: SET_CHARGE_PRICE,
    price
  };
}

export const chargePriceReducer = (state = 0, action) => {
  Object.freeze(state);
  switch (action.type) {
    case SET_CHARGE_PRICE:
      return action.price;
    default:
      return state;
  }
};

