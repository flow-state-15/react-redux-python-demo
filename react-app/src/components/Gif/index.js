import { increment_frame } from '../../store/gif'

import { useDispatch, useSelector } from 'react-redux';
import frame_array from '../../assets/frames'

export default function Gif() {
  const dispatch = useDispatch();

  //state var as primitive
  const gif_frame = useSelector((state) => state.gif?.frame?.frame_index);


  //edge case
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
