export const SET_STEP_JOIN_STEP = "SET_STEP_JOIN_STEP";

export function setStepJoinStep(step) {
  return {
    type: actions.SET_STEP_JOIN_STEP,
    payload: step,
  };
}