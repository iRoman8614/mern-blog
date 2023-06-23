import React, { useState } from "react";
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPost } from "../reducers/features/post/postSlice";

export const AddPostPage = () => {
    const[title, setTitle] = useState('')
    const[text, setText] = useState('')
    const[image, setImage] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = async () => {
         try {
            const data = new FormData()
            data.append('title', title)
            data.append('text', text)
            data.append('image', image)
            dispatch(createPost(data))
            navigate('/')
         } catch (error) {
            console.log(error)
         }
    }

    const clearFormHandler = () => {
        setTitle('')
        setText('')
    }

    return (
        <form
            onSubmit={(e) => e.preventDefault()}
        >
            <label> 
                Add picture
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            </label>
            <div>
                {image && (
                    <img src={URL.createObjectURL(image)} alt={image.name} />
                )}
            </div>
            <label>
                Title:
                <input 
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />
            </label>
            <label>
                Text:
                <textarea 
                    placeholder="Text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </label>
            <div>
                <button
                    onClick={submitHandler}
                >Create post</button>
                <button
                    onClick={clearFormHandler}
                >Cancel</button>
            </div>
        </form> )
}