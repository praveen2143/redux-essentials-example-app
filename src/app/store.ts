import { Action, configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import postsReducer from '@/features/posts/postsSlice'

interface CounterState{
    value : number
}

function counterReducer(state : CounterState= { value: 0 }, action : Action) {
    
    switch(action.type){
        default:
            return state
    }

}

export const store = configureStore({
    reducer:{
        posts: postsReducer
    }
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>