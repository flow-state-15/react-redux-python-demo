
import React from "react"
import { useDispatch, useSelector } from 'react-redux';
import { increment_frame } from '../../store/gif'

import frame_array from '../../assets/frames'

//lets pretend this is an object you imported or something
// const bad_ref = { index: 0 }

export default function Gif() {

  //TODO: step 1. start here using Redux. useSelector alone will cause rerenders
  const dispatch = useDispatch();
  //note: state var is a primitive; makes it guaranteed to rerender
  const gif_frame = useSelector((state) => state.gif?.frame?.frame_index);


  //edge case
  const image = frame_array[0]

  const manual_click = () => {
    dispatch(increment_frame());
  }


  // //TODO: step 2. the same react principles apply using local component state
  // //same effect but with local component state instead
  // // todo: note the use of a callback in useState. it fixes race conditions




  //todo: HERE BE DRAGONS! ->  using state improperly
  // //react component lifecycle is based on object equality. react will do a === on state to decide when to rerender
  // //recall the gotchas you learned when doing a === on objects

  // const [compState, setCompState] = React.useState(bad_ref)

  // const manual_click = () => {
  //   //scenario 1:
  //   //dont modify objects outside of react state!!
  //   bad_ref.index = bad_ref.index + 1
  //   setCompState(bad_ref)

  //   //scenario 2:
  //   // setCompState(state => {
  //   //   console.log("running useState callback!", state)
  //   //   state.index += 1
  //   //   const modified_state = state
  //   //   console.log("same object in memory? ", state === modified_state)
  //   //   return modified_state
  //   // })

  //   //bad reference: we are mutating an existing object
  //   //reference in memory is the same
  //   //react runs oldState === newState and it is true, so nothing happens


  //   //todo: how to fix this
  //   //copy old state and return a new reference in memory
  //   //the logs will show the asynchronous nature of useState hook
  //   setCompState(state => {

  //     console.log("logging previous state:: ", state)
  //     const modified_state = {...state, index: state.index + 1}
  //     console.log("same object in memory? ", state === modified_state)

  //     return modified_state
  //   })
  //   console.log("I run before the useState callback!", compState)
  // }

  // React.useEffect(() => {
  //   console.log("useEffect runs before next render so you can see the change!", compState)
  // }, [compState]);


  //TODO for good times
  //make it a video lol
  // const [vidStart, setVidStart] = React.useState(false)
  // const [compStateAuto, setCompStateAuto] = React.useState(0)
  // const [intID, setIntID] = React.useState(0)
  // React.useEffect(() => {
  //   if((vidStart === true) && (intID === 0)){
  //       const newIntID = setInterval(() => {
  //         //using local state for index
  //         setCompStateAuto(prev => {
  //           if(prev < frame_array.length-1){
  //             return prev + 1
  //           } else return 0
  //         })

  //         //using database to get index
  //         // dispatch(increment_frame());
  //       }, 0.05);
  //       setIntID(newIntID)
  //   } else if ((vidStart === false) && intID){
  //     clearInterval(intID);
  //     setIntID(0);
  //   }
  // }, [vidStart, intID]);

  // const vid_click = () => {
  //   setVidStart(prev => !prev)
  // }


  //pro tip: to correctly log async code, you need a useEffect
  // React.useEffect(() => {
  //   console.log("intervalID, vidStart:: ", intID, vidStart)
  // }, [vidStart, intID]);


  // React.useEffect(() => {
  //   console.log('I am the effect');
  // });

  // console.log('Non async code in component body will always run first!')

  return (
    <div className="gif-wrapper">
      <h2>Write code to advance the frames!</h2>
      <img
        alt="current-gif-frame"
        className="img-gif"
        //TODO: here we can use either redux or component state to source the index

        //from bad_ref:
        // src={frame_array[compState.index]}

        //from redux:
        src={
          gif_frame
          ? frame_array[gif_frame]
          : image
        }

        //from local state:
        // src={frame_array[compState]}

        //from local auto:
        // src={frame_array[compStateAuto]}

        //from redux auto:
        // src={frame_array[gif_frame]}
      />
      <span>manual frames:</span>
      <button type="button" className="btn" onClick={manual_click}>
        Next Frame
      </button>
      {/* <span>auto frames:</span>
      <button type="button" className="btn" onClick={vid_click}>
        {vidStart ? "Stop gif" : "Start gif"}
      </button> */}
      <br/>
      <br/>
      {/* //todo: switch up the var depending on your source */}
      <span> Using a redux useSelector!  Frame: {gif_frame} </span>
      {/* <span> Using local useState!  Frame: {compState} </span> */}
      {/* <span> Using local useState super fast!  Frame: {compStateAuto} </span> */}
      {/* <span> Using dispatch and useSelector super fast!  Frame: {gif_frame} </span> */}
      {/* <span> Using a bad object reference!  Frame: {compState.index} </span> */}
    </div>
  );
}
