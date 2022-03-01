
import { Link } from 'react-router-dom';


export default function SplashPage(){
    return (
        <div className="splash-wrapper">
            <div className="gif-blurb-wrap">
                <h2>
                    The <Link to="/gif-demo">gif</Link> animation demonstration displays the rendering power of the useSelector and useDispatch hooks.
                </h2>
            </div>
            <div className="nesting-blurb-wrap">
                <h2>
                    The <Link to="/posts-demo">posts</Link> demonstration samples a much more complex scenario that involves nested objects in state. Dynamic rerendering is still achieved through only the useSelector and useDispatch hooks.
                </h2>
            </div>
        </div>
    )
}
