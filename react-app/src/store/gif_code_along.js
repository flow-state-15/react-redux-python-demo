
//switch cases
const switch_frame = "frame/INCREMENT";
const set_error = "error/NEW_ERROR";

//actions
const increment = (frame_index) => ({
  type: switch_frame,
  frame_index,
});

const new_error = (error) => ({
  type: set_error,
  error,
});

//thunks
export const increment_frame = () => async (dispatch) => {
  const response = await fetch(`/api/gif/get-index`);

  if (response.ok) {
    const frame_index = await response.json();
    dispatch(increment(frame_index));
  } else {
    const error = {
      status_code: response.status,
      error_desc: "increment_frame failed",
    };
    dispatch(new_error(error));
  }
};

//reducer
export default function reducer(state = {}, action){
  switch (action.type) {
    case switch_frame:


    //TODO: Currently this case is returning undefined. Use your knowledge of redux principles to develop a strategy for instant rerenders.

      return {}

    case set_error:
      return { ...state, error: action.error };
    default:
      return state;
  }
};
