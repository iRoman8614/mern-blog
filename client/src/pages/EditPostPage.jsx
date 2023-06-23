import React, { useState, useCallback, useEffect } from "react";
import {useDispatch} from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "../utils/axios"
import { updatePost } from "../reducers/features/post/postSlice";
import {toast } from "react-toastify"

export const EditPostPage = () => {
  const[title, setTitle] = useState('')
  const[text, setText] = useState('')
  const[oldImage, setOldImage] = useState('')
  const[newImage, setNewImage] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/post/${params.id}`)
    setTitle(data.title)
    setText(data.text)
    setOldImage(data.imgUrl)
  }, [params.id])

  const submitHandler = () => {
    try {
      const updatedPost = new FormData()
      updatedPost.append('title', title)
      updatedPost.append('text', text)
      updatedPost.append('id', params.id)
      updatedPost.append('image', newImage)
      dispatch(updatePost(updatedPost))
      toast('post was edited')
      navigate('/post/user/me')
    } catch (error) {
      console.log(error)
    }
  }

  const clearFormHandler = () => {
    setTitle('')
    setText('')
  }

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  return (
    <form
        onSubmit={(e) => e.preventDefault()}
    >
        <label> 
            Add picture
            <input type="file" onChange={
              (e) => {
                setNewImage(e.target.files[0])
                setOldImage('')}
              } 
            />
        </label>
        <div>
            {oldImage && (
                <img src={`http://localhost:5000/${oldImage}`} 
                    alt={oldImage.name} />
            )}
            {newImage && (
                <img src={URL.createObjectURL(newImage)} 
                    alt={newImage.name} />
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
            >Save</button>
            <button
                onClick={clearFormHandler}
            >Cancel</button>
        </div>
    </form> )
}
