import React from 'react'
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

export const PostItem = ({post}) => {
    if(!post) {
        return(
          <div>0 posts found</div>
        )
    }
    const stylePost = {
        color: 'black',
        textDecoration: 'none',
    }
    return (
        <Link style={stylePost} to={`/${post._id}`}>
            <div className='postContainer'>
                <div className='postImg'>
                    {post.imgUrl && (
                        <img src={`http://localhost:5000/${post.imgUrl}`} alt='img' />
                    )}
                </div>
                <div className='postInfo'>
                    <div className='postAuthor'>{post.username}</div>
                    <Moment className='postData' date={post.createdAt} format='DD MM YYYY' />
                </div>
                <div className='postTitle'>{post.title}</div>
                <p className='postText'>{post.text}</p>
                <div className='postActivity'>
                    <button>
                        <AiFillEye />
                        <span>{post.views}</span>
                    </button>
                    <button>
                        <AiOutlineMessage />
                        <span>{post.comments?.length || 0}</span>
                    </button>
                </div>
            </div>
        </Link>
    )
}
