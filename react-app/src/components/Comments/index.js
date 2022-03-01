import { useSelector } from "react-redux";

import SubComments from "../SubComments";

export default function Comments({ props }) {
  //   const all_comments = props.comments;
  const all_comments = useSelector(
    (state) => state.posts[props.post_id].comments.all
  );

  const element = all_comments
    ? all_comments.map((comment) => {
        const child_props = {
          post_id: props.post_id,
          comment_id: comment.id,
          subcomments: comment.subcomments,
          handle_create: props.handle_create_sub,
          handle_delete: props.handle_delete_sub,
        };

        const ids = { post_id: props.post_id, comment_id: comment.id };

        return (
          <div>
            {comment.content}
            <button type="button" onClick={() => props.handle_delete_c(ids)}>delete</button>
            <button type="button" onClick={() => props.handle_create_sub(comment.id)}>
              new subcomment
            </button>
            {comment.subcomments
              ? <SubComments props={child_props} /> : null}
          </div>
        );
      })
    : null;

  return all_comments ? <div>{element}</div> : null;
}
