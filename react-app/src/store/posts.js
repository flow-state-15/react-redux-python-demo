
//switch cases
const create = "post/CREATE";
const set_error = "error/NEW_ERROR";

//actions
const add_post = (post) => ({
  type: create,
  post,
});

const new_error = (error) => ({
  type: set_error,
  error,
});

//thunks
export const create_post = (post) => async (dispatch) => {
  const response = await fetch(`/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  if (response.ok) {
    const post = await response.json();
    dispatch(add_post(post));
  } else {
    const error = {
      status_code: response.status,
      error_desc: "increment_frame failed",
    };
    dispatch(new_error(error));
  }
};

//reducer
export default function reducer(state = [], action){
  switch (action.type) {
    case create:
      return [...state, action.post]
    case set_error:
      return { ...state, error: action.error };
    default:
      return state;
  }
};
