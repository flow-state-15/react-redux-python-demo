import { useDispatch, useSelector } from "react-redux";

import {
  create_post,
  get_all_posts,
  delete_post,
  create_comment,
  create_subcomment,
  delete_comment,
  delete_subcomment,
  get_all_comments,
  get_all_subcomments,
} from "../../store/posts";
import Comments from "../Comments";



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
  };

  const handle_create_comment = (post_id) => {
    dispatch(create_comment({ content: "comment id", post_id }));
  };

  const handle_create_subcomment = (comment_id) => {
    dispatch(create_subcomment({ content: "subcomment id", comment_id }));
  };

  const handle_delete_comment = (ids) => {
    dispatch(delete_comment(ids));
  };

  const handle_delete_subcomment = (subcomment_id) => {
    dispatch(delete_subcomment(subcomment_id));
  };

  const posts = p_from_reducer
    ? p_from_reducer.map((post) => {
        const child_props = {
          post_id: post.id,
          comments: post.comments.all,
          handle_create_c: handle_create_comment,
          handle_create_sub: handle_create_subcomment,
          handle_delete_c: handle_delete_comment,
          handle_delete_sub: handle_delete_subcomment,
        };

        return (
          <div className='single-post-wrap'>
            <div className="single-post-header">
                <h4>{post.content}</h4>
                <button
                    className='btn-small'
                    type="button"
                    onClick={() => handle_delete_posts(post.id)}
                >
                    delete post
                </button>
                <button
                    className='btn-small'
                    type="button"
                    onClick={() => handle_create_comment(post.id)}
                >
                new comment
                </button>
            </div>
            {post.comments ? <Comments props={child_props} /> : null}
          </div>
        );
      })
    : null;

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
      <div className="posts-list">{posts}</div>
    </div>
  );
}
