
//switch cases
const create = "posts/CREATE";
const get = "posts/GET";
const remove = "posts/DELETE";
const set_error = "error/NEW_ERROR";

//actions
const add_post = (post) => ({
  type: create,
  post,
});

const all_posts = (posts) => ({
  type: get,
  posts
})

const del_post_action = (post_id) => ({
  type: remove,
  post_id: post_id
})

const new_error = (error) => ({
  type: set_error,
  error,
});

//thunks
export const create_post = (post) => async (dispatch) => {
  const response = await fetch(`/api/posts/`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post)
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

export const get_all_posts = () => async (dispatch) => {
  console.log("<<<< DISPATCHING GET ALL POSTS >>>>")

  const response = await fetch("/api/posts/")
  if(response.ok){
    const { posts } = await response.json();
    dispatch(all_posts(posts))
  } else {
    const error = {
      status_code: response.status,
      error_desc: "increment_frame failed",
    };
    dispatch(new_error(error));
  }
}

export const delete_post = (post_id) => async (dispatch) => {
  console.log("delete_post", post_id);
  const response = await fetch(`/api/posts/delete/${post_id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(del_post_action(post_id));
  }
}


//reducer
export default function reducer(state = {all_posts: []}, action){
  switch (action.type) {
    case create:
      return {...state, [action.post.id]: action.post, all_posts: [action.post, ...state.all_posts] }

    case get:
      const update_keys = (array) => {
        const obj = {}
        array.forEach(p => obj[p.id] = p)
        return obj
      }
      return { ...state, ...update_keys(action.posts), all_posts: [...action.posts] }

    case remove:
      const newState = { ...state };
      delete newState[action.post_id];
      newState.all_posts.splice(newState.all_posts.findIndex(p => p.id === action.post_id), 1);
      newState.all_posts = [...newState.all_posts]
      return newState

    case set_error:
      return { ...state, error: action.error };
    default:
      return state;
  }
};
