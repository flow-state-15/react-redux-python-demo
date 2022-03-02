
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
  type: create_c,
  comment,
});

const all_comments = (comments) => ({
  type: get_c,
  comments
})

const del_comment_action = (ids) => ({
  type: remove_c,
  ...ids
})

// const new_error = (error) => ({
//   type: set_error,
//   error,
// });

//subcomment actions --------------------------------------------------------
const add_subcomment = (subcomment) => ({
  type: create_s,
  subcomment,
});

const all_subcomments = (subcomments) => ({
  type: get_s,
  subcomments
})

const del_subcomment_action = (ids) => ({
  type: remove_s,
  ...ids
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
    console.log("<<<< new post from backend, post:: ", post)
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

export const delete_comment = (ids) => async (dispatch) => {
  console.log("delete_comment", ids.comment_id);
  const response = await fetch(`/api/posts/delete/comment/${ids.comment_id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(del_comment_action(ids));
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

export const delete_subcomment = (ids) => async (dispatch) => {
  console.log("delete_subcomment", ids.subcomment_id);
  const response = await fetch(`/api/posts/delete/subcomment/${ids.subcomment_id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(del_subcomment_action(ids));
  }
}



//reducer --------------------------------------------------------
export default function reducer(state = {all_posts: []}, action){
  //helpers
  //normalize an array into object kvp's
  const update_keys = (array) => {
    const obj = {}
    array.forEach(i => {
      console.log(i)
      obj[i.id] = i
      if (i.hasOwnProperty("comments")){
        obj[i.id].comments = { ...update_keys(i.comments), all: i.comments}
      } else if (i.hasOwnProperty("subcomments")){
        obj[i.id].subcomments = { ...update_keys(i.subcomments), all: i.subcomments}
      }
    });
    return obj
  }


  //prep newState for multiple cases
  const newState = { ...state };

  switch (action.type) {

    //NOTE: you can organize this code by create a helper reducer for comments
    //posts cases ================================================
    case create:
      const new_post = {
        id: action.post.id,
        content: action.post.content,
        comments: { all: action.post.comments}
        }
      return {
        ...state,
        [action.post.id]: new_post,
        all_posts: [action.post, ...state.all_posts]
        }

    case get:
      return {
        ...state,
        ...update_keys(action.posts),
        all_posts: [...action.posts]
        }

    case remove:
      //delete existing kvp for this id
      delete newState[action.post_id];

      //mutate a COPY of the old array, find object by id and splice it out
      newState.all_posts.splice(newState.all_posts.findIndex(p => p.id === action.post_id), 1);

      //overwrite array key with new array value
      newState.all_posts = [...newState.all_posts]

      return newState


    //comments cases ================================================
    case create_c: {
      //saving this path to a var saves space
      const post_id = action.comment.post_id

      //insert new comment into NEW array, and spread old values behind it(keeps newest comments on top)
      const new_array = [action.comment, ...state[post_id].comments.all]

      //shape your new comment object
      const new_comment = {
        ...action.comment,
        subcomments: {
          all: action.comment.subcomments
          }
        }

      //return the new shape of this slice of state. spread all old objects into new objects
      return {
        ...state,
        [post_id]: {
          ...state[post_id],
          comments: {
            ...state[post_id].comments,
            [action.comment.id]: new_comment,
            all: new_array
            }
          }
        }
    }

    // case get_c: {
    //   const post_id = action.comment.post_id
    //   return { ...state, [post_id]: {...state[post_id], comments: {...update_keys(action.comments), all: action.comments}} }
    // }

    case remove_c: {
      //saving path to object saves space. Note it is referencing the array in new state object.
      const c_array = newState[action.post_id].comments.all;

      //delete comment from new copy of state
      delete newState[action.post_id].comments[action.comment_id];

      //mutate the array copy
      c_array.splice(c_array.findIndex(c => c.id === action.comment_id), 1);

      //construct the proper state shape
      newState[action.post_id].comments = {
        ...newState[action.post_id].comments,
        all: [...c_array]
        }
        
      return newState
    }

    //subcomments cases ================================================

    //NOTE, YOU'LL NEED ID'S OF ALL OBJECTS TO PATH THIS FAR. WE ARE MISSING POST_ID IN SUBCOMMENT OBJECT RETURNED FROM DATABASE

    // case create_s: {
    //   const post_id = action.comment.post_id
    //   const new_array = [action.subcomment, ...state[post_id].comments.subcomments.all]
    //   // console.log("<<<< comment structure in reducer, comment:: ", action.comment)
    //   // console.log("<<<< key path, comments array:: ", action.comment.post_id)
    //   // console.log("<<<< check new_array === state[post_id].comments:: ", new_array === state[post_id].comments)

    //   return {...state, [post_id]:
    //           {...state[post_id], comments:
    //             {...state[post_id].comments, state[post_id].comments[action.subcomment.id]: } } }
    // }

    // case get_s: {
    //   const post_id = action.comment.post_id
    //   return { ...state, [state[post_id]]: {...state[post_id], ...update_keys(action.comments)}, all_comments: [...action.comments] }
    // }

    // case remove_s: {
    //   const c_array = newState[action.post_id].comments
    //   delete newState[action.post_id][action.comment_id];
    //   c_array.splice(c_array.findIndex(c => c.id === action.comment_id), 1);
    //   newState[action.post_id].comments = [...c_array]
    //   return newState
    // }



    //error cases ================================================
    case set_error:
      return { ...state, error: action.error };
    default:
      return state;
  }
};
