import { useSelector } from "react-redux";


export default function SubComments({ props }){
    const all_sub_comments = useSelector(state => state.posts[props.post_id].comments[props.comment_id].all);

    const sub_comments = all_sub_comments ? all_sub_comments.map(sc => {
        const ids = { subcomment_id: sc.id, post_id: props.post_id };
        return (<div>
            {sc.content}
            <button type="button" onClick={() => props.handle_delete(ids)}>delete</button>
        </div>)
    }) : null;

    return (
        <div>{sub_comments}</div>
    );
}
