export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const SET_SIGNATURE = "SET_SIGNATURE";
export const MARK_AS_SEEN = "MARK_AS_SEEN";

export const openModal = modal => {
  return {
    type: OPEN_MODAL,
    modal
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  };
};

export const setSignature = () => {
  return {
    type: SET_SIGNATURE
  }
}

export const markAsSeen = () => {
  return {
    type: MARK_AS_SEEN
  }
}