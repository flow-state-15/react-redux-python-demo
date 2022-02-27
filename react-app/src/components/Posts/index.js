import { useDispatch, useSelector } from 'react-redux';


export default function Posts(){
    const dispatch = useDispatch();


    return (<div className="posts-wrapper">
        <h1>Nested Objects: CRUD for posts, comments and subcomments.</h1>
    </div>)
}
