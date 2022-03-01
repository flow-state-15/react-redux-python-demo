


export default function SplashPage(){
    return (
        <div className="splash-wrapper">
            <div className="gif-blurb-wrap">
                <h2>
                    The gif animation demonstration displays the rendering power of the useSelector and useDispatch hooks.
                </h2>
            </div>
            <div className="nesting-blurb-wrap">
                <h2>
                    The posts demonstration samples a much more complex scenario that involves nested objects in state. Dynamic rerendering is still achieved through only the useSelector and useDispatch hooks. 
                </h2>
            </div>
        </div>
    )
}
