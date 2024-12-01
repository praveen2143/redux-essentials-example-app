import { useAppSelector } from "@/app/hooks";
import { Link } from "react-router-dom";
import { selectAllPosts } from "./postsSlice";

export const PostsList = () => {
    const posts = useAppSelector(selectAllPosts)

    const renderedPosts = posts.map(post => (
        <article className="post-excerpt" key={post.id}>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
        <p className="post-content">{post.content.substring(0, 100)}</p>
        <Link to={`/posts/${post.id}`}>Edit</Link>
      </article> 
    ))


    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {renderedPosts}            
        </section>
    )
}