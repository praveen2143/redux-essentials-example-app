import { useAppDispatch, useAppSelector } from '@/app/hooks'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { UserIcon } from './UserIcon'
import { selectCurrentUsername, userLoggedOut } from '@/features/auth/authSlice'
import { selectCurrentUser } from '@/features/users/usersSlice'

export const Navbar = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectCurrentUser)

  const isLoggedIn = !!user
  if (isLoggedIn){
    const onLogoutClicked= () => {
      dispatch(userLoggedOut())
    }
  }
  const navigate = useNavigate()
  function onLogoutClicked(): void {
      dispatch(userLoggedOut())
      navigate('/')
  }

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks"></div>
          <Link to="/posts">Posts</Link>
        </div>
        <div className='userDetails'>
          <UserIcon size={32} />
          {user ? user.name : ''}
          <button className='button small' onClick={onLogoutClicked}>
            Log Out
          </button>
        </div>
      </section>
    </nav>
  )
}
