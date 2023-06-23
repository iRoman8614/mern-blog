import React, { useCallback, useEffect, useState } from 'react'
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete } from 'react-icons/ai'
import Moment from 'react-moment'
import axios from "../utils/axios"
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { removePost } from '../reducers/features/post/postSlice'
import {toast } from "react-toastify"
import { createComment, getPostComments} from '../reducers/features/comment/commentSlice'
import { CommentItem } from '../components/CommentItem'

export const PostPage = () => {
  const [post, setPost] = useState(null)
  const [comment, setComment] = useState('')

  const { user } = useSelector((state) => state.auth)
  const { comments } = useSelector((state) => state.comment)
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const removePostHandker = () => {
    try {
      dispatch(removePost(params.id))
      toast('post was deleted')
      navigate('/post/user/me')
    } catch (error) {
      console.log(error )
    }
  }

  const handleSubmit = () => {
    try {
        const postId = params.id
        dispatch(createComment({ postId, comment }))
        setComment('')
    } catch (error) {
        console.log(error)
    }
  }

  const fetchComments = useCallback(async () => {
    try {
        dispatch(getPostComments(params.id))
    } catch (error) {
        console.log(error)
    }
  }, [params.id, dispatch])

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/post/${params.id}`)
    setPost(data)
  }, [params.id])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  if(!post) {
    return(
      <>
        <Link to={'/'}>Return</Link>
        <div>0 posts found</div>
      </>
    )
  }

  return (
    <div>
      <Link to={'/'}>Return</Link>
      <div>
        <div>
          <div>
            <div>
                {post.imgUrl && (<img src={`http://localhost:5000/${post.imgUrl}`} alt='img' />)}
            </div>
            <div>
                <div>{post.username}</div>
                <Moment date={post.createdAt} format='DD MM YYYY' />
            </div>
            <div>{post.title}</div>
            <p>{post.text}</p>
            <div>
                <div>
                  <button>
                      <AiFillEye />
                      <span>{post.views}</span>
                  </button>
                  <button>
                      <AiOutlineMessage />
                      <span>{post.comments.length || 0}</span>
                  </button>
                </div>

                {
                  user?._id === post.author && (
                    <div>
                      <button>
                        <Link to={`/${params.id}/edit`}>
                          <AiTwotoneEdit />
                        </Link>
                      </button>
                      <button
                          onClick={removePostHandker}
                      >
                        <AiFillDelete />
                      </button>
                    </div>
                )}
            </div>
          </div>
        </div>
        <div>
          <form onSubmit={(e) => e.preventDefault()}>
            <input 
              type='text' 
              value={comment}
              onChange={(e)=> setComment(e.target.value)}
              placeholder='Comment' />
            <button type='submit' onClick={handleSubmit} >Send</button>
          </form>
          {
            comments?.map((cmt) => (
              <CommentItem key={cmt._id} cmt={cmt} />
            ))
          }
        </div>
      </div>
    </div>
  )
}
