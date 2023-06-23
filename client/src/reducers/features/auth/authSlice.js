import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../../utils/axios"

const initialState= {
    user: null,
    token: null,
    isLoading: false,
    status: null,
}

export const registerUser = createAsyncThunk(
    'auth/registerUser', 
    async ({ username, password}) => {
        try {
            // отправляет запрос на "https://localhost:5000/api" +  '/auth/registration'
            const { data } = await axios.post('/auth/registration', {
                username, 
                password,
            }) 
            // если в запросе есть токен то записывает его в сторадж  
            if(data.token) {
                window.localStorage.setItem('token', data.token)
            }
            return data
        } catch (error) {
            console.log(error)
        }
})

export const loginUser = createAsyncThunk(
    'auth/loginUser', 
    async ({ username, password}) => {
        try {
            // отправляет запрос на "https://localhost:5000/api" +  '/auth/login'
            const { data } = await axios.post('/auth/login', {
                username, 
                password,
            }) 
            // если в запросе есть токен то записывает его в сторадж  
            if(data.token) {
                window.localStorage.setItem('token', data.token)
            }
            return data
        } catch (error) {
            console.log(error)
        }
})

export const getUser = createAsyncThunk(
    'auth/getUser', 
    async () => {
        try {
            // отправляет запрос на "https://localhost:5000/api" +  '/auth/user'
            const { data } = await axios.get('/auth/user') 
            return data
        } catch (error) {
            console.log(error)
        }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
            state.isLoading = false
            state.status = null
        }
    },
    extraReducers: {
        // Register user
        // request is sending
        [registerUser.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        // request complited
        [registerUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
        },
         // request error
        [registerUser.rejectWithValue]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
        // Login user
        // request is sending
        [loginUser.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        // request complited
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
        },
         // request error
        [loginUser.rejectWithValue]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
        // Get user
        // request is sending
        [getUser.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        // request complited
        [getUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = null
            state.user = action.payload.user
            state.token = action.payload.token
        },
         // request error
        [getUser.rejectWithValue]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        }
    },
})

export const checkIsAuth = (state) => Boolean(state.auth.token)
export const { logout } = authSlice.actions
export default authSlice.reducer