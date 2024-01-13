import React from 'react'
import { AppImages } from '../services/AppImages'

export default function CommentItem({
    className = "",
    name = "",
    desc = "",
    showReplies = false,
    likes = [],
    replies = [],
    onClickLikes,
    onClickComments
}) {
    return (
        <div className={`d-flex mb-2 ${className}`}>
            <img
                className='profile '
                src={AppImages.placeholder}
            />
            <div className='d-flex flex-column  '>
                <div className='comment-Cont '>
                    <span className='username' style={{ marginLeft: "0px" }}>
                        Name
                    </span>
                    <span>
                        Description a particular comment
                    </span>
                </div>
                <div className='d-flex ' style={{ cursor: "pointer" }} >
                    <p className='like-sec-p cment-likes'>Likes 12</p>
                    {showReplies && <p className='like-sec-p replies'>Replies {replies.length}</p>}
                </div>
            </div>
        </div>
    )
}
