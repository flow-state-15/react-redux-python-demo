
import { NavLink } from 'react-router-dom';


export default function NavBanner (){
    return(
        <div className="nav-banner-wrapper">
            <h1>
            <NavLink to="/gif-demo">
                Gif Demo
            </NavLink>
            </h1>
            <h1>
            <NavLink to="/posts-demo">
                Posts Demo
            </NavLink>
            </h1>
        </div>
    )
}
