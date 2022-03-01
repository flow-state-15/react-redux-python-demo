
//post switch cases
const create = "posts/CREATE";
const get = "posts/GET";
const remove = "posts/DELETE";
const set_error = "error/NEW_ERROR";

//comment switch cases
const create_c = "comment/CREATE";
const get_c = "comment/GET";
const remove_c = "comment/DELETE";
// const set_error = "error/NEW_ERROR";

//subcomment switch cases
const create_s = "subcomment/CREATE";
const get_s = "subcomment/GET";
const remove_s = "subcomment/DELETE";
// const set_error = "error/NEW_ERROR";


//actions
//post actions --------------------------------------------------------
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

//comment actions --------------------------------------------------------
const add_comment = (comment) => ({
  type: create,
  comment,
});

const all_comments = (comments) => ({
  type: get,
  comments
})

const del_comment_action = (comment_id) => ({
  type: remove,
  comment_id: comment_id
})

// const new_error = (error) => ({
//   type: set_error,
//   error,
// });

//subcomment actions --------------------------------------------------------
const add_subcomment = (subcomment) => ({
  type: create,
  subcomment,
});

const all_subcomments = (subcomments) => ({
  type: get,
  subcomments
})

const del_subcomment_action = (subcomment_id) => ({
  type: remove,
  subcomment_id: subcomment_id
})

// const new_error = (error) => ({
//   type: set_error,
//   error,
// });


//thunks
//posts thunks --------------------------------------------------------
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
  const response = await fetch(`/api/posts/delete/post/${post_id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(del_post_action(post_id));
  }
}


//comments thunks --------------------------------------------------------
export const create_comment = (comment) => async (dispatch) => {
  const response = await fetch('/api/posts/comments', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment)
  });

  if (response.ok) {
    const comment = await response.json();
    dispatch(add_comment(comment));
  } else {
    const error = {
      status_code: response.status,
      error_desc: "increment_frame failed",
    };
    dispatch(new_error(error));
  }
};

export const get_all_comments = () => async (dispatch) => {
  console.log("<<<< DISPATCHING GET ALL COMMENTS >>>>")

  const response = await fetch("/api/posts/comments")
  if(response.ok){
    const { comments } = await response.json();
    dispatch(all_comments(comments))
  } else {
    const error = {
      status_code: response.status,
      error_desc: "increment_frame failed",
    };
    dispatch(new_error(error));
  }
}

export const delete_comment = (comment_id) => async (dispatch) => {
  console.log("delete_comment", comment_id);
  const response = await fetch(`/api/posts/delete/comment/${comment_id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(del_comment_action(comment_id));
  }
}


//subcomments thunks --------------------------------------------------------
export const create_subcomment = (subcomment) => async (dispatch) => {
  const response = await fetch('/api/posts/subcomments', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subcomment)
  });

  if (response.ok) {
    const subcomment = await response.json();
    dispatch(add_subcomment(subcomment));
  } else {
    const error = {
      status_code: response.status,
      error_desc: "increment_frame failed",
    };
    dispatch(new_error(error));
  }
};

export const get_all_subcomments = () => async (dispatch) => {
  console.log("<<<< DISPATCHING GET ALL SUBCOMMENTS >>>>")

  const response = await fetch("/api/posts/subcomments")
  if(response.ok){
    const { subcomments } = await response.json();
    dispatch(all_subcomments(subcomments))
  } else {
    const error = {
      status_code: response.status,
      error_desc: "increment_frame failed",
    };
    dispatch(new_error(error));
  }
}

export const delete_subcomment = (subcomment_id) => async (dispatch) => {
  console.log("delete_subcomment", subcomment_id);
  const response = await fetch(`/api/posts/delete/subcomment/${subcomment_id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(del_subcomment_action(subcomment_id));
  }
}


//reducer --------------------------------------------------------
export default function reducer(state = {all_posts: []}, action){
  //helpers
  //normalize an array into object kvp's
  const update_keys = (array) => {
    const obj = {}
    array.forEach(p => obj[p.id] = p)
    return obj
  }
  //prep newState for multiple cases
  const newState = { ...state };


  switch (action.type) {

    //posts cases ================================================
    case create:
      return {...state, [action.post.id]: action.post, all_posts: [action.post, ...state.all_posts] }

    case get:
      return { ...state, ...update_keys(action.posts), all_posts: [...action.posts] }

    case remove:
      delete newState[action.post_id];
      newState.all_posts.splice(newState.all_posts.findIndex(p => p.id === action.post_id), 1);
      newState.all_posts = [...newState.all_posts]
      return newState


    //comments cases ================================================
    case create_c:
      return {...state, [action.comment.id]: action.comment, all_comments: [action.comment, ...state.all_comments] }

    case get_c:
      return { ...state, ...update_keys(action.comments), all_comments: [...action.comments] }

    case remove_c:
      delete newState[action.comment_id];
      newState.all_comments.splice(newState.all_comments.findIndex(c => c.id === action.comment_id), 1);
      newState.all_comments = [...newState.all_comments]
      return newState


    //subcomments cases ================================================
    case create_s:
      return {...state, [action.subcomment.id]: action.subcomment, all_subcomments: [action.subcomment, ...state.all_subcomments] }

    case get_s:
      return { ...state, ...update_keys(action.subcomments), all_subcomments: [...action.subcomments] }

    case remove_s:
      delete newState[action.subcomment_id];
      newState.all_subcomments.splice(newState.all_subcomments.findIndex(s => s.id === action.subcomment_id), 1);
      newState.all_subcomments = [...newState.all_subcomments]
      return newState


      //error cases ================================================
    case set_error:
      return { ...state, error: action.error };
    default:
      return state;
  }
};
