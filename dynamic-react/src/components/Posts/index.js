import { increment_frame } from '../../store'

import { useDispatch, useSelector } from 'react-redux';

export default function Posts() {
  const dispatch = useDispatch();
  const gif_frame = useSelector((state) => state.frame);

  //edge case
  const image = require(`../../assets/gif_frames_png/IMG00000.png`);

  const handle_click = () => {
    dispatch(increment_frame());
  };

  //posts logic
  const post_id = 1

  return (
    <div className="posts-wrapper">
          <p>Click buttons to change posts and add comments!</p>
          <h1>Post {`${post_id}`}</h1>
          <button
            type="button"
            className="btn"
            onClick={handle_click}
            >Change Post</button>
        </div>
  );
}
