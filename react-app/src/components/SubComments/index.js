import { useDispatch, useSelector } from "react-redux";


export default function SubComments({ props }){
    const dispatch = useDispatch();
    const all_sub_comments = props.subcomments;

    const sub_comments = all_sub_comments ? all_sub_comments.map(sc => (
        <div>
            {sc.content}
            <button type="button" onClick={props.handle_create}>delete</button>
        </div>
    )) : null;

    return (
        <div>{sub_comments}</div>
    );
}
