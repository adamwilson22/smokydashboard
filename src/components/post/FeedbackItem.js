import React, { } from 'react'
import { AppImages } from '../../services/AppImages'
import { AppLogger } from '../../services/AppLogger'
import "../../App.css"

export default function FeedbackItem({
    name = "",
    message = "",
    profilePhoto = "",
    messageTime = "",
    mediaArray = [],
    onMediaClick,
    likesArray = [],
    showLikes = true,
    onLikesClick,
    showComments = true,
    onCommentsClick,
    commentsArray = [],
    showReportedUsers = true,
    reportedUsers = [],
    onReportedUsersClick,
    onOptionClick,
}) {

    const imageStyl = {
        objectFit: "cover",
        width: "60px",
        height: "50px",
    }

    return (
        <>
            <img
                style={imageStyl}
                src={profilePhoto} alt="avatar"
                className="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60"
            />
            <div className="card w-100 ">
                <div className="card-header d-flex justify-content-between p-2">
                    <div className='d-flex flex-column' style={{ alignItems: "start" }}>
                        <p style={{ marginLeft: "8px" }} className="fw-bold mb-0 chat-name">{name}</p>
                        <p style={{ marginLeft: "8px" }} className="text-muted small mb-0 "><i className="far fa-clock"></i> {messageTime}</p>
                    </div>
                    <div className='btn dots-cont' onClick={() => onOptionClick()}>
                        <img src={AppImages.threeDotsMenu} className='dots-img' />
                    </div>
                </div>
                <div className="card-body d-flex flex-column justify-content-start  ">
                    <p className="mb-0 text-start chat-msg">
                        {message}
                    </p>
                    <div className='d-flex flex-wrap justify-content-start mt-3  '>
                        {mediaArray.length > 0 &&
                            mediaArray.slice(0, 4).map((mediaIte, index) => {
                                {/* AppLogger("mediaIte type of ", typeof mediaIte + " mediaIte " + mediaIte) */ }
                                return (
                                    <div
                                        key={index}
                                        className='position-relative  post-cont'
                                        onClick={() => onMediaClick(index)}
                                    >
                                        <img
                                            style={{ cursor: "pointer" }}
                                            className='post-img'
                                            src={
                                                typeof mediaIte == "object" ?
                                                    (mediaIte.mediaType == "video" ?
                                                        mediaIte.mediaThumbnail
                                                        : mediaIte.mediaURL)
                                                    : mediaIte
                                            }
                                            alt='post-images'
                                        />
                                        {mediaIte.mediaType == "video" &&
                                            <div
                                                style={{ cursor: "pointer", }}
                                                className='plus-cont abs-cent-align'
                                            >
                                                <img
                                                    className='plus-icon abs-cent-align play-icon'
                                                    src={AppImages.playIcon}
                                                    alt='post-images'
                                                />
                                            </div>
                                        }
                                        {(mediaArray.length > 4 && index == 3) &&
                                            <div
                                                style={{ cursor: "pointer" }}
                                                className='plus-cont abs-cent-align'
                                            >
                                                <img
                                                    className='plus-icon abs-cent-align'
                                                    src={AppImages.plusIcon}
                                                    alt='post-images'
                                                />
                                            </div>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='d-flex  '>
                        {showLikes &&
                            <div className='d-flex '
                                style={{ cursor: "pointer" }}
                                onClick={() => onLikesClick()}
                            >
                                <img
                                    src={AppImages.like}
                                    className='like-styl '
                                />
                                <p className='like-sec-p '>Likes {likesArray.length}</p>
                            </div>
                        }
                        {showComments &&
                            <div className='d-flex  '
                                style={{ cursor: "pointer" }}
                                onClick={() => { onCommentsClick() }}
                            >
                                <img
                                    src={AppImages.comments}
                                    className='like-styl comment-styl '
                                />
                                <p className='like-sec-p '>Comments {commentsArray.length}</p>
                            </div>
                        }
                        {showReportedUsers &&
                            <div className='d-flex  '
                                style={{ cursor: "pointer" }}
                                onClick={() => { onReportedUsersClick() }}
                            >
                                <img
                                    src={AppImages.reportIcon}
                                    className='like-styl comment-styl '
                                />
                                <p className='like-sec-p '>Reported By {reportedUsers.length} {`User${reportedUsers.length > 1 ? "s" : ""}`}</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
