import { useAppSelector } from "@/app/hooks"
import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "@/app/store"

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

export const selectUserById = (state: RootState, userId : String) => state.users.find(users => users.id === userId);