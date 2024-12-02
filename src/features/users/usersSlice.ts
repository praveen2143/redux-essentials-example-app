import { useAppSelector } from "@/app/hooks"
import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "@/app/store"
import { selectCurrentUsername } from "../auth/authSlice"

interface User {
    id : string,
    name : string
}

const initialState : User[] = [
    {id : "1", name : "Praveen"},
    {id : "2", name : "John"},
]

const usersSlice = createSlice({
    name : 'users',
    initialState,
    reducers:{}
})

export default usersSlice.reducer

export const usersActions = usersSlice.actions

export const selectAllUsers = (state: RootState) => state.users

export const selectUserById = (state: RootState, userId : String | null) => state.users.find(users => users.id === userId);

export const selectCurrentUser = (state: RootState) => {
    const currentUsername = selectCurrentUsername(state)
    return selectUserById(state, currentUsername)
}