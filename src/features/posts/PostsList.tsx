import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Link } from "react-router-dom";
import { fetchPosts, selectAllPosts, selectPostsStatus } from "./postsSlice";

import { PostAuthor } from "./PostAuthor"
import { TimeAgo } from "@/components/TimeAgo";
import { ReactionButtons } from "./ReactionButtons";
import { useEffect } from "react";

export const PostsList = () => {
     
    //const p = useAppDispatch(fetchPosts())
    //const posts = 
    const dispatch = useAppDispatch()
    const posts = useAppSelector(selectAllPosts)
    const postStatus = useAppSelector(selectPostsStatus)

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])




    const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date))

    const renderedPosts = orderedPosts.map(post => (
        <article className="post-excerpt" key={post.id}>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
        <p className="post-content">{post.content.substring(0, 100)}</p>
        <Link to={`/editPost/${post.id}`}>Edit</Link>
        <PostAuthor userId={post.user}/>
        <TimeAgo timestamp={post.date}/>
        <ReactionButtons post = {post}/> 
      </article> 
    ))


    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {renderedPosts}            
        </section>
    )
}