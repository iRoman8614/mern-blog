import React from 'react'

export const CommentItem = ({ cmt }) => {
    return (
        <div>
            <div>
                {cmt.username}
            </div>
            <div>{cmt.comment}</div>
        </div>
    )
}