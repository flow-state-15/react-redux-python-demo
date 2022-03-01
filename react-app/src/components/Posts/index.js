import { useDispatch, useSelector } from "react-redux";

import { create_post, get_all_posts, delete_post } from "../../store/posts";


export default function Posts() {
  const dispatch = useDispatch();
    const p_from_reducer = useSelector((state) => state.posts.all_posts);

  const handle_create_post = () => {
    dispatch(create_post({ content: "post id" }));
  };

  const handle_get_posts = () => {
    dispatch(get_all_posts());
  };

  const handle_delete_posts = (post_id) => {
    dispatch(delete_post(post_id));
  }

  const handle_create_comment = () => {
      dispatch(create_comment());
  }

    const posts = p_from_reducer ? p_from_reducer.map((post) => (
      <li>
        {post.content}
        <button type="button" onClick={() => handle_delete_posts(post.id)}>delete post</button>
        <button type="button" onClick={handle_create_comment}>new comment</button>
        {post.comments
          ? post.comments.map((comment) => (
              <li>
                {comment.content}
                {comment.subcomments
                  ? comment.subcomments.map((subcomment) => (
                      <li>{subcomment.content}</li>
                    ))
                  : null}
              </li>
            ))
          : null}
      </li>
    )) : null;

  return (
    <div className="posts-wrapper">
      <h1>Nested Objects: CRUD for posts, comments and subcomments.</h1>
      <button
        className="posts-btn btn"
        type="button"
        onClick={handle_get_posts}
      >
        get posts from backend
      </button>
      <button
        className="posts-btn btn"
        type="button"
        onClick={handle_create_post}
      >
        new post
      </button>
      <ul className="posts-ul">{posts}</ul>
    </div>
  );
}
