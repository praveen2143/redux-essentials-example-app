import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectAllUsers } from "../users/usersSlice"
import React from "react"
import { userLoggedIn } from "./authSlice"

interface LoginPageFormFields extends HTMLFormControlsCollection{
    username : HTMLSelectElement
}

interface LoginPageFormElements extends HTMLFormElement{
    readonly elements : LoginPageFormFields
}

export const LoginPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const users = useAppSelector(selectAllUsers)

    const handleSubmit = (e : React.FormEvent<LoginPageFormElements>)=> {
        e.preventDefault()
        const username = e.currentTarget.elements.username.value
        dispatch(userLoggedIn(username))
        navigate('/posts')

    }

    const usersOptions = users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
    ))

    return (
        <section>
            <h1>Welcome to Tweeter ! Please Login </h1>
        <form onSubmit={handleSubmit}>
        <label htmlFor="username">User : </label>
        <select id="username" name="username" required>
            <option value=""></option>
            {usersOptions}
        </select>
        <button>Log In</button>
        </form>
        </section>
    )

}