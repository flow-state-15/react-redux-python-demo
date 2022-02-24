import { increment_frame } from '../../store'

import { useDispatch, useSelector } from 'react-redux';

export default function Gif() {
  const dispatch = useDispatch();
  const gif_frame = useSelector((state) => state.frame);

  //edge case
  const image = require(`../../assets/gif_frames_png/IMG00000.png`);

  const handle_click = () => {
    dispatch(increment_frame());
  };

  return (
    <div className="gif-wrapper">
      <p>Click button to advance the frames!</p>
      <img
        alt="current-gif-frame"
        className="img-gif"
        src={
          gif_frame
            ? require(`../../assets/gif_frames_png/IMG${gif_frame}.png`)
            : image
        }
      />
      <button type="button" className="btn" onClick={handle_click}>
        Next Frame
      </button>
    </div>
  );
}
