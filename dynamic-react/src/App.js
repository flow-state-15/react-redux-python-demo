import logo from './logo.svg';
import './App.css';
import { increment_frame } from './store'

import { useDispatch, useSelector } from 'react-redux';

function App() {

  //gif logic
  const dispatch = useDispatch();
  const gif_frame = useSelector(state => state.frame)

    //edge case
  const image = require(`./assets/gif_frames_png/IMG00000.png`)

  const handle_click = () => {
    dispatch(increment_frame())
  }

  //posts logic
  const post_id = 1

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          WELCOME TO THE DYNAMIC REACT PROJECT
        </p>
      </header>

      <main className="App-main">
        <div className="gif-wrapper">
          <p>Click button to advance the frames!</p>
          <img alt="current-gif-frame" className="img-gif" src={gif_frame ? require(`./assets/gif_frames_png/IMG${gif_frame}.png`) : image} />
          <button
            type="button"
            className="btn"
            onClick={handle_click}
            >Next Frame</button>
        </div>

        <div className="posts-wrapper">
          <p>Click buttons to change posts and add comments!</p>
          <h1>Post {`${post_id}`}</h1>
          <button
            type="button"
            className="btn"
            onClick={handle_click}
            >Change Post</button>
        </div>
      </main>

      <footer className="App-footer">
        <p>react redux eod series</p>
      </footer>
    </div>
  );
}

export default App;
