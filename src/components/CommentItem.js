import React from 'react'
import { AppImages } from '../services/AppImages'

export default function CommentItem({
    className = "",
    name = "",
    profilePic = AppImages.placeholder,
    desc = "",
    createdAt = "",
    showReplies = true,
    showLikes = true,
    likes = [],
    replies = [],
    customStyles = {},
}) {
    return (
        <div style={customStyles}>
            <div className={`d-flex ${className}  comment-Cont `}>
                <img
                    className='profile '
                    src={profilePic}
                />
                <div className='d-flex flex-column '>
                    <div className='d-flex flex-column  '>
                        <span className='username' style={{ marginLeft: "0px" }}>
                            {name}
                        </span>
                        <span className='comment-desc '>
                            {desc}
                        </span>
                        <span className='comment-time '>
                            {createdAt}
                        </span>
                    </div>
                </div>
            </div>
            <div className='d-flex ' >
                {showLikes && <p className='like-sec-p cment-likes '>
                    <img
                        src={AppImages.heartIcon}
                        className='icon-styl '
                    />
                    Likes {likes.length}
                </p>}
                {showReplies && <p className='like-sec-p replies '>
                    <img
                        src={AppImages.replyIcon}
                        className='icon-styl '
                    />
                    Replies {replies.length}
                </p>}
            </div>
        </div>
    )
}
