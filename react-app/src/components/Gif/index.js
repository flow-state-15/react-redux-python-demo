import { useDispatch, useSelector } from 'react-redux';

import { increment_frame } from '../../store/gif_code_along'
import frame_array from '../../assets/frames'

export default function Gif() {
  const dispatch = useDispatch();

  //NOTE: state variable is a primitive, making rerendering easy. No other hooks are necessary for responsive rendering.
  //TODO: hook into store here



  //edge case for when state is empty
  const image = frame_array[0]


  const handle_click = () => {
    dispatch(increment_frame());
  };

  return (
    <div className="gif-wrapper">
      <h2>Click button to advance the frames!</h2>
      <img
        alt="current-gif-frame"
        className="img-gif"
        src={
          gif_frame
            ? frame_array[gif_frame]
            : image
        }
      />
      <button type="button" className="btn" onClick={handle_click}>
        Next Frame
      </button>
    </div>
  );
}
