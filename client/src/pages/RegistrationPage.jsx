import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, checkIsAuth } from '../reducers/features/auth/authSlice'
import { toast } from 'react-toastify'

export const RegistrationPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { status } = useSelector((state) => state.auth)
  const isAuth = useSelector(checkIsAuth)
  const navigate = useNavigate()
  const dispatch = useDispatch()


  useEffect(() => {
    if (status) {
        toast(status)
    }
    if (isAuth) navigate('/')
  }, [status, isAuth, navigate])

  const handleSubmit = () => {
    try {
      //dispatch вызывает наш редюсер и передает в него данные username и password
      dispatch(registerUser({ username, password}))
      //затем очищаем форму
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={e => e.preventDefault()}>
      <h1>Sigh Up</h1>
      <label>
        Username:
        <input  
          type='text' 
          value={username}
          // записывает value из input в state username
          onChange={(e) => setUsername(e.target.value)}
          placeholder='username' 
        />
      </label>
      <label>
        Password:
        <input 
          type='password' 
          value={password}
          // записывает value из input в state password
          onChange={(e) => setPassword(e.target.value)}
          placeholder='password' 
        />
      </label>
      <div>
        <button 
          type="submit"
          onClick={handleSubmit}
        >
          Confirm
        </button>
        <Link to={'/login'}>Sing In</Link>
      </div>
    </form>
  )
}
