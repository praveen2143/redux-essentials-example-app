import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import { RootState }  from '@/app/store'
import { ISOStringFormat, sub } from "date-fns";
import { client } from "@/api/client";
import { createAppAsyncThunk } from "@/app/withTypes";
import { userLoggedOut } from "../auth/authSlice";


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

interface PostState {
    posts: Post[],
    status : 'idle' | 'pending' | 'succeeded' | 'failed'
    error : string | null
}

const initialState : PostState = {
    posts: [],
    status : 'idle',
    error : null
}

export const fetchPosts = createAppAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get<Post[]>('fakeApi/posts')
    return response.data
},{
    condition(arg, thunkapi){
        const postsStatus = selectPostsStatus(thunkapi.getState())
        if ( postsStatus !== 'idle'){
            return false
        }
    }
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{
        postAdded:{
        reducer(state, action: PayloadAction<Post>) {
            state.posts.push(action.payload)
        },
        prepare(title: string, content:string, user : string){
            return{
                payload:{id:nanoid(), title, content, user, date: new Date().toISOString(), reactions: initialReactions}
            }
        }
    },
        postUpdated(state, action : PayloadAction<Post>){
            const{ id, title, content } = action.payload;
            const existingPost = state.posts.find(post => post.id === id);
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
            const existingPost = state.posts.find(post => post.id ===postId)
            if(existingPost){
                existingPost.reactions[reaction]++
            }
        }
},
extraReducers: builder => {
    builder
      .addCase(userLoggedOut, state => {
        // Clear out the list of posts whenever the user logs out
        return initialState
      })
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.posts.push(...action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Unknown Error'
      })
  }
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

export const selectAllPosts = (state : RootState) => state.posts.posts
export const selectPostById = (state : RootState, postId: string) => state.posts.posts.find(post => post.id === postId)

export const selectPostsStatus = (state: RootState) => state.posts.status;
export const selectPostsError = (state: RootState) => state.posts.error