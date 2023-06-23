import React from 'react'
import { Link } from 'react-router-dom'

export const PopularPosts = ({post}) => {
  if(!post) {
    return(
      <div>0 posts found</div>
    )
  }

  const styleLink = {
    textDecoration: 'none',
    color: "black",
  }

  return (
    <div className='popularPost'>
        <Link
        style={styleLink}
        to={`/${post._id}`}>
            {post.title}
        </Link>
    </div>
  )
}
