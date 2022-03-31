
import React from "react"
// import { useDispatch, useSelector } from 'react-redux';
// import { increment_frame } from '../../store/gif'

import frame_array from '../../assets/frames'


export default function Gif() {
  //todo: using state improperly ->

  //react is based on object equality. react will do a === on state and the DOM tree
  //recall the gotchas you learned when doing a === on objects

  const bad_ref = { index: 0 }

  const [compState, setCompState] = React.useState(bad_ref)

  const manual_click = () => {
    bad_ref.index = bad_ref.index + 1

    console.log("logging bad_ref.index::", bad_ref.index)

    setCompState(bad_ref)

    console.log("logging state with bad ref:: ", compState)

    //bad reference: we are mutating an existing object
    //reference in memory is the same
    //react runs oldState === newState and it is true, so nothing happens
  }


  //TODO: step 1. start here using Redux. useSelector alone will cause rerenders
  // const dispatch = useDispatch();
  //state var as primitive
  // const gif_frame = useSelector((state) => state.gif?.frame?.frame_index);

  //edge case
  // const image = frame_array[0]


  //TODO: step 2. the same react principles apply using local component state
  //same effect but with component state instead
  // const [compState, setCompState] = React.useState(0)


    // const manual_click = () => {
      //todo: use redux and backend for frames:
      // dispatch(increment_frame());

      //todo: use local component state
      // setCompState(prev => {
      //   if(prev < frame_array.length-1){
      //     return prev + 1
      //   } else return 0
      // })
    // };


  //TODO for good times
  //make it a video lol
  // const [vidStart, setVidStart] = React.useState(false)
  // const [compStateAuto, setCompStateAuto] = React.useState(0)
  // const [intID, setIntID] = React.useState(0)
  // React.useEffect(() => {
  //   if((vidStart === true) && (intID === 0)){
  //       const newIntID = setInterval(() => {
  //         setCompStateAuto(prev => {
  //           if(prev < frame_array.length-1){
  //             return prev + 1
  //           } else return 0
  //         })
  //       }, 150);
  //       setIntID(newIntID)
  //   } else if ((vidStart === false) && intID){
  //     clearInterval(intID);
  //     setIntID(0);
  //   }
  // }, [vidStart, intID]);



  //pro tip: to correctly log async code, you need a useEffect
  // React.useEffect(() => {
  //   console.log("intervalID, vidStart:: ", intID, vidStart)
  // }, [vidStart, intID]);

  // const vid_click = () => {
  //   setVidStart(prev => !prev)
  // }


  return (
    <div className="gif-wrapper">
      <h2>Write code to advance the frames!</h2>
      <img
        alt="current-gif-frame"
        className="img-gif"
        //TODO: here we can use either redux or component state to source the index


        //todo: component state source
        //from bad_ref:
        src={frame_array[compState]}

        //from redux:
        // src={
        //   gif_frame
        //   ? frame_array[gif_frame]
        //   : image
        // }

        //from local manual:
        // src={frame_array[compState]}

        //from local auto:
        // src={frame_array[compStateAuto]}
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
      <span> frame: {compState.index} </span>
    </div>
  );
}
