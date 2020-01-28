import axios from "axios";

export const RECEIVE_PROMOS = "RECEIVE_PROMO";
export const RECEIVE_PROMO = "RECEIVE_PROMO";
export const RECEIVE_PROMO_ERRORS = "RECEIVE_PROMO_ERRORS";
export const APPLY_PROMO = "APPLY_PROMO";

export const fetchOnePromo = promoData => dispatch => {
  return fetchPromo(promoData).then(
    result => {
      return dispatch(receivePromo(result.data))
    },
    errors => dispatch(receivePromoErrors(errors.response.data))
  )
}

export const fetchAllPromos = () => dispatch => {
  return fetchPromos().then(
    result => {
      return dispatch(receivePromos(result.data))
    },
    errors => dispatch(receivePromoErrors(errors.response.data))
  )
}

export const applyPromo = promoData => dispatch => {
  return applyOnePromo(promoData).then(
    result => {
      return dispatch(applyAPromo(result.data))
    },
    errors => dispatch(receivePromoErrors(errors.response.data))
  )
}

const fetchPromo = promoCode => {
  return axios({
    method: "GET",
    url: `/api/promos/match?code=${promoCode}`,
  })
}

const fetchPromos = () => {
  return axios({
    method: "GET",
    url: `/api/promos`,
  })
}

const applyOnePromo = promoData => {
  return axios({
    method: "POST",
    url: `/api/promos/apply/${promoData.id}`,
  })
}

const receivePromo = promo => {
  return {
    type: RECEIVE_PROMO,
    promo
  };
};

const receivePromos = promos => {
  return {
    type: RECEIVE_PROMOS,
    promos
  };
};

const receivePromoErrors = error => {
  return {
    type: RECEIVE_PROMO_ERRORS,
    error
  };
};

const applyAPromo = promo => {
  return {
    type: APPLY_PROMO,
    promo
  }
}