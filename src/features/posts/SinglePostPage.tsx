import { useParams } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import { selectPostById } from "./postsSlice";

export const SinglePostPage = () => {
    const {postId} = useParams()
    const post = useAppSelector(state => selectPostById(state, postId!));

    if(!post){
        return (
            <section>
                <h1>Post not Fount !</h1>
            </section>
        )
    }

    return (
        <section>
            <article className="post">
                <h3>{post.title}</h3>
                <p className="post-content">{post.content}</p>
            </article> 
        </section>
    )
}