
// //switch cases
// const create = "comments/CREATE";
// const get = "comments/GET";
// const remove = "comments/DELETE";
// const set_error = "error/NEW_ERROR";

// //actions
// const add_comment = (comment) => ({
//   type: create,
//   comment,
// });

// const all_comments = (comments) => ({
//   type: get,
//   comments
// })

// const del_comment_action = (comment_id) => ({
//   type: remove,
//   comment_id: comment_id
// })

// const new_error = (error) => ({
//   type: set_error,
//   error,
// });

// //thunks
// export const create_comment = (comment) => async (dispatch) => {
//   const response = await fetch(`/api/comments/`, {
//     method: "comment",
//     headers: {
//       'Accept': 'application/json',
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(comment)
//   });

//   if (response.ok) {
//     const comment = await response.json();
//     dispatch(add_comment(comment));
//   } else {
//     const error = {
//       status_code: response.status,
//       error_desc: "increment_frame failed",
//     };
//     dispatch(new_error(error));
//   }
// };

// export const get_all_comments = () => async (dispatch) => {
//   console.log("<<<< DISPATCHING GET ALL commentS >>>>")

//   const response = await fetch("/api/comments/")
//   if(response.ok){
//     const { comments } = await response.json();
//     dispatch(all_comments(comments))
//   } else {
//     const error = {
//       status_code: response.status,
//       error_desc: "increment_frame failed",
//     };
//     dispatch(new_error(error));
//   }
// }

// export const delete_comment = (comment_id) => async (dispatch) => {
//   console.log("delete_comment", comment_id);
//   const response = await fetch(`/api/comments/delete/${comment_id}`, {
//     method: "DELETE",
//   });

//   if (response.ok) {
//     dispatch(del_comment_action(comment_id));
//   }
// }


// //reducer
// export default function reducer(state = {all_comments: []}, action){
//   switch (action.type) {
//     case create:
//       return {...state, [action.comment.id]: action.comment, all_comments: [action.comment, ...state.all_comments] }

//     case get:
//       const update_keys = (array) => {
//         const obj = {}
//         array.forEach(p => obj[p.id] = p)
//         return obj
//       }
//       return { ...state, ...update_keys(action.comments), all_comments: [...action.comments] }

//     case remove:
//       const newState = { ...state };
//       delete newState[action.comment_id];
//       newState.all_comments.splice(newState.all_comments.findIndex(p => p.id === action.comment_id), 1);
//       newState.all_comments = [...newState.all_comments]
//       return newState

//     case set_error:
//       return { ...state, error: action.error };
//     default:
//       return state;
//   }
// };
