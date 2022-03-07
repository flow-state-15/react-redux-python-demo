import { useSelector } from "react-redux";


export default function Comments({ props }) {

  //Knowing your state is shaped the way you want it, key into the specific object you need to render your component and pass into props, if needed:

  //NOTE: if your conditional is working properly in your parent, you'll know this path is valid and won't return the wrong type.
  const all_comments = useSelector(
    (state) => state.posts[props.post_id].comments.all
  );

  const element = all_comments ?
      all_comments.map((comment) => {

        const ids = { post_id: props.post_id, comment_id: comment.id };

        return (
          <div className='single-comment' key={'comment' + comment.id.toString()}>
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
