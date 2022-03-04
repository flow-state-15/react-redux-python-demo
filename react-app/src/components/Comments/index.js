import { useSelector } from "react-redux";


export default function Comments({ props }) {
  //   const all_comments = props.comments;
  const all_comments = useSelector(
    (state) => state.posts[props.post_id].comments.all
  );

  const element = all_comments ?
      all_comments.map((comment) => {

        const ids = { post_id: props.post_id, comment_id: comment.id };

        return (
          <div className='single-comment'>
            {comment.content}
            <button type="button" onClick={() => props.handle_delete_c(ids)}>
              delete
            </button>
          </div>
        );
      })
    : null;

  return !(all_comments == null) > 0 && <div>{element}</div>;
}
