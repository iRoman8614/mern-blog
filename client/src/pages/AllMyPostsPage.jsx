import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { PostItem } from '../components/PostItem'
import axios from '../utils/axios'

export const AllMyPostsPage = () => {
  const [posts, setPosts] = useState([])

  const fetchMyPosts = async () => {
    try {
      const { data } = await axios.get('/post/user/me')
      setPosts(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMyPosts()
  }, [])

  return (
    <div>
      {posts?.map((post, idx) => (
        <PostItem post={post} key={idx} />
      ))}
    </div>
  )
}
