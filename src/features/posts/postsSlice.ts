import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import { RootState }  from '@/app/store'


export interface Post{
    id : string
    title: string
    content: string
}

const initialState : Post[] = [
    { id: '1', title:'First Post!', content: 'Hello !'},
    { id: '2', title:'Second Post!', content: 'More text !'}
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{
        postAdded:{
        reducer(state, action: PayloadAction<Post>) {
            state.push(action.payload)
        },
        prepare(title: string, content:string){
            return{
                payload:{id:nanoid(), title, content}
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

export const { postAdded, postUpdated } = postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = (state : RootState) => state.posts
export const selectPostById = (state : RootState, postId: string) => state.posts.find(post => post.id === postId)