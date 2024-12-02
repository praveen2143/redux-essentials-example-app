import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch,useAppSelector } from "@/app/hooks";
import { postUpdated } from "./postsSlice";
import { selectPostById } from "./postsSlice";

export const EditPostForm = () => {
    const { postId } = useParams();

    const post = useAppSelector(state => selectPostById(state, postId!))
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    if(!post){
        return (
            <section>
                <h1>No Post Found !</h1>
            </section>
        )
    }

    const onSavePostClicked = (e: React.FormEvent<EditPostFormElements>) => {
        e.preventDefault()

        const { elements } = e.currentTarget
        const title = elements.postTitle.value
        const content = elements.postContent.value

        if ( title && content) {
            const payload = { id: post.id, title : title, content }
            dispatch(postUpdated(payload))
            navigate(`/`)
        }
    }



    return (
        <section>
            <h2>Edit Post</h2>
            <form onSubmit={onSavePostClicked}>
                <label htmlFor="postTitle">Post Title</label>
                <input
                type="text"
                id="postTitle"
                name="postTitle"
                defaultValue={post.title}
                required
                />
                                <input
                type="text"
                id="postContent"
                name="postContent"
                defaultValue={post.content}
                required
                />

                <button> Save Post </button>
            </form>
        </section>
    )
}