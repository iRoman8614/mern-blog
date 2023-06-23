import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "../../../utils/axios.js"

const initialState = {
    posts: [],
    popularPosts: [],
    isLoading: false,
}


// post creation
export const createPost = createAsyncThunk('post/createPost', async (params) => {
    try {
        const {data} = await axios.post('/post', params)
        return data
    } catch (error) {
        console.log(error)
    }
})

//get all posts
export const getAllPosts = createAsyncThunk('post/getAllPosts', async (req, res) => {
    try {
        const {data} = await axios.get('/post')
        return data
    } catch (error) {
        console.log(error)
    }
})

//delete post
export const removePost = createAsyncThunk('post/removePost', async (id) => {
    try {
        const {data} = await axios.delete(`/post/${id}`, id)
        return data
    } catch (error) {
        console.log(error)
    }
})


//update post
export const updatePost = createAsyncThunk('post/updatePost', async (updatedPost) => {
    try {
        const {data} = await axios.put(`/post/${updatedPost.id}`, updatedPost)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: {
        //create post
        //loading
        [createPost.pending]: (state) => {
            state.isLoading = true
        },
        //success
        [createPost.fulfilled]: (state, action) => {
            state.isLoading = false
            state.posts.push(action.payload)
        },
        //error
        [createPost.rejected]: (state) => {
            state.isLoading = false
        },

        //get all posts
        //loading
        [getAllPosts.pending]: (state) => {
            state.isLoading = true
        },
        //success
        [getAllPosts.fulfilled]: (state, action) => {
            state.isLoading = false
            state.posts = action.payload.posts
            state.popularPosts = action.payload.popularPosts
        },
        //error
        [getAllPosts.rejected]: (state) => {
            state.isLoading = false
        },

        //deleting post
        //loading
        [removePost.pending]: (state) => {
            state.isLoading = true
        },
        //success
        [removePost.fulfilled]: (state, action) => {
            state.isLoading = false
            //create new posts array without post with target id, target to delete post id is in action payload 
            state.posts = state.posts.filter((post) => post._id !== action.payload._id)
        },
        //error
        [removePost.rejected]: (state) => {
            state.isLoading = false
        },

        //updating post
        //loading
        [updatePost.pending]: (state) => {
            state.isLoading = true
        },
        //success
        [updatePost.fulfilled]: (state, action) => {
            state.isLoading = false
            const index = state.posts.findIndex((post) => post._id === action.payload._id)
            state.posts[index] = action.payload
        },
        //error
        [updatePost.rejected]: (state) => {
            state.isLoading = false
        },
    },
})

export default postSlice.reducer