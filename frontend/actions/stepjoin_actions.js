export const SET_STEP_JOIN_STEP = "SET_STEP_JOIN_STEP";

export function setStepJoinStep(step) {
  return {
    type: SET_STEP_JOIN_STEP,
    payload: step,
  };
}