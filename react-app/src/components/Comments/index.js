import { useDispatch, useSelector } from "react-redux";

import SubComments from "../SubComments";

export default function Comments(props) {
  const dispatch = useDispatch();
  const all_comments = props.comments;

  const element = all_comments.map((comment) => {
    const child_props = {
      subcomments: comment.subcomments,
      handle_create: props.handle_create_sub,
      handle_delete: props.handle_delete_sub
    };

    return (
      <div>
        {comment.content}
        <button type="button" onClick={props.handle_create_c}>
          new comment
        </button>
        {comment.subcomments
          ? comment.subcomments.map((subcomment) => (
              <SubComments props={child_props} />
            ))
          : null}
      </div>
    );
  });

  return all_comments ? <div>{element}</div> : null;
}
