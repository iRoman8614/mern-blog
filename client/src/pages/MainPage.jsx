import React, { useEffect } from 'react'
import { PostItem } from '../components/PostItem'
import { PopularPosts } from '../components/PopularPosts'
import { useDispatch, useSelector } from "react-redux"
import { getAllPosts } from '../reducers/features/post/postSlice.js'


export const MainPage = () => {

  const dispatch = useDispatch()
  const { posts, popularPosts } = useSelector((state) => state.post)

  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])

  if(!posts) {
    return(
      <div>0 posts found</div>
    )
  }

  return (
    <div>
      <div className='mainPageContainer'>
        <div className='postsZone'>
          <div className='mainPageTitle'>Posts</div>
          {
            posts?.map((post, ind) => (<PostItem key={ind} post={post}/>))
          }
        </div>
        <div className='famousZone'>
          <div className='mainPageTitle'>Famous</div>
          {
            popularPosts?.map((post, ind) => (<PopularPosts key={ind} post={post}/>))
          }
        </div>
      </div>
    </div>
  )
}
