import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import { RootState }  from '@/app/store'
import { ISOStringFormat, sub } from "date-fns";

export interface Reactions{
    thumbsUp: number,
    tada: number,
    heart: number,
    rocket:number,
    eyes: number
}

export type ReactionName = keyof Reactions

export interface Post{
    id : string
    title: string
    content: string,
    user: string
    date: string
    reactions : Reactions
}

const initialReactions: Reactions = {
    thumbsUp: 0,
    tada: 0,
    heart: 0,
    rocket: 0,
    eyes: 0
}

const initialState : Post[] = [
    { id: '1', title:'First Post!', content: 'Hello !', user: '1', date: sub(new Date(), {minutes : 10}).toISOString(), reactions:initialReactions },
    { id: '2', title:'Second Post!', content: 'More text !', user: '2', date: sub(new Date(), {minutes : 5}).toISOString(), reactions:initialReactions }
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{
        postAdded:{
        reducer(state, action: PayloadAction<Post>) {
            state.push(action.payload)
        },
        prepare(title: string, content:string, user : string){
            return{
                payload:{id:nanoid(), title, content, user, date: new Date().toISOString(), reactions: initialReactions}
            }
        }
    },
        postUpdated(state, action : PayloadAction<Post>){
            const{ id, title, content } = action.payload;
            const existingPost = state.find(post => post.id === id);
            if (existingPost){
                existingPost.title = title;
                existingPost.content = content;
            }
        },
        reactionAdded(
            state,
            action : PayloadAction<{postId: string, reaction: ReactionName}>
        ){
            const { postId, reaction} = action.payload
            const existingPost = state.find(post => post.id ===postId)
            if(existingPost){
                existingPost.reactions[reaction]++
            }
        }
},
/*
  selectors: {
    // Note that these selectors are given just the `PostsState`
    // as an argument, not the entire `RootState`
    selectAllPosts: postsState => postsState,
    selectPostById: (postsState, postId: string) => {
      return postsState.find(post => post.id === postId)
    }
  }
    */
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = (state : RootState) => state.posts
export const selectPostById = (state : RootState, postId: string) => state.posts.find(post => post.id === postId)