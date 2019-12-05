export const UPDATE_FILTER = "UPDATE_FILTER";
export const RESET_FILTER = "RESET_FILTER";


export const resetFilter = () => {
  return {
    type: RESET_FILTER,
    value: {
      'center': true,
      'favorite': false,
      'search': ''
    }
  };
};


export const changeFilter = (filter, value) => {
  return {
    type: UPDATE_FILTER,
    filter,
    value
  };
};