import React, { useState, useEffect } from 'react'
import { AppImages } from '../../services/AppImages'
import { AppLogger } from '../../services/AppLogger';
import { get } from 'lodash';
import LikesModal from '../LikesModal';
import GalleryModal from '../GalleryModal';
import CommentsModal from '../CommentsModal';
import "../../App.css"
import FeedbackItem from './FeedbackItem';
import ReportedUsersModal from '../ReportedUsersModal';

export default function PostItem({ name, message, profilePhoto, messageTime, item, AllUsers = [] }) {
    const [showGallery, setShowGallery] = useState(false)
    const [showLikes, setShowLikes] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const [showReportedUsers, setShowReportedUsers] = useState(false)
    const [likesArray, setLikesArray] = useState(get(item, "likes", []))
    const [commentsArray, setCommentsArray] = useState(get(item, "comments", []))
    const [reportedUSers, setReportedUsers] = useState(get(item, "reportedUserIds", []))

    const imageStyl = {
        objectFit: "cover",
        width: "60px",
        height: "50px",
    }

    useEffect(() => {
        handleUsersDetailsForComments()
        handleUserDetailsForLikes()
    }, [])

    const handleUsersDetailsForComments = () => {
        var comments = []

        if (Array.isArray(commentsArray)) {
            commentsArray.forEach((item) => {
                var repliesArr = []
                const userDetails = AllUsers.find((usrItem) => get(usrItem, "id", "") == get(item, "commentBy", ""))

                if (Array.isArray(item.replies)) {
                    item.replies.forEach((replyItem) => {
                        const getUser = AllUsers.find((usrItem) => get(usrItem, "id", "") == get(replyItem, "replyBy", ""))
                        repliesArr.push({
                            ...replyItem,
                            profilePicture: get(getUser, "profilePicture", ""),
                            fullName: get(getUser, "fullName", ""),
                        })

                    })
                }

                comments.push({
                    ...item,
                    replies: repliesArr,
                    showAllReplies: false,
                    profilePicture: get(userDetails, "profilePicture", AppImages.placeholder),
                    fullName: get(userDetails, "fullName", ""),
                })
            })

            setCommentsArray(comments)
            // AppLogger("Final comments array", comments)
        }
    }

    const handleUserDetailsForLikes = () => {
        var finalArray = []

        if (Array.isArray(item.likes)) {
            item.likes.forEach((element) => {
                const getUser = AllUsers.find((usrItem) => get(usrItem, "id", "") == get(element, "likedBy", ""))
                finalArray.push({
                    ...element,
                    profilePicture: get(getUser, "profilePicture", ""),
                    fullName: get(getUser, "fullName", "")
                })
            })

            setLikesArray(finalArray)
            // AppLogger("final likes array", finalArray)
        }
    }

    return (
        <li className="d-flex  mb-4">
            <FeedbackItem
                key={get(item, "id", 0)}
                profilePhoto={profilePhoto}
                name={name}
                messageTime={messageTime}
                message={message}
                mediaArray={get(item, "media", [])}
                onMediaClick={() => setShowGallery(true)}
                showLikes
                onLikesClick={() => setShowLikes(true)}
                likesArray={get(item, "likes", []) ? get(item, "likes", []) : []}
                showComments
                onCommentsClick={() => setShowComments(true)}
                commentsArray={get(item, "comments", []) ? get(item, "comments", []) : []}
                showReportedUsers={get(item, "reportedUserIds", []).length > 0}
                onReportedUsersClick={() => { setShowReportedUsers(true) }}
                reportedUsers={get(item, "reportedUserIds", [])}
            />
            {/* <img style={imageStyl}
                src={profilePhoto} alt="avatar"
                className="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60" />
            <div className="card w-100 ">
                <div className="card-header d-flex justify-content-between p-2">
                    <p style={{ marginLeft: "8px" }} className="fw-bold mb-0 chat-name">{name}</p>
                    <p className="text-muted small mb-0 "><i className="far fa-clock"></i> {messageTime}</p>
                </div>
                <div className="card-body d-flex flex-column justify-content-start  ">
                    <p className="mb-0 text-start chat-msg">
                        {message}
                    </p>
                    <div className='d-flex flex-wrap justify-content-start mt-3  '>
                        {get(item, "media", []).slice(0, 4).map((mediaIte, index) => {
                            return (
                                <div
                                    key={index}
                                    className='position-relative  post-cont'>
                                    <img
                                        onClick={() => setShowGallery(true)}
                                        style={{ cursor: "pointer" }}
                                        className='post-img'
                                        src={
                                            mediaIte.mediaType == "video" ?
                                                mediaIte.mediaThumbnail
                                                : mediaIte.mediaURL
                                        }
                                        alt='post-images'
                                    />
                                    {(get(item, "media", []).length > 4 && index == 3) &&
                                        <div
                                            onClick={() => setShowGallery(true)}
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
                        })}
                    </div>
                    <div className='d-flex  '>
                        <div className='d-flex '
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowLikes(true)}
                        >
                            <img
                                src={AppImages.like}
                                className='like-styl '
                            />
                            <p className='like-sec-p '>Likes {get(item, "likes", []) ? get(item, "likes", []).length : 0}</p>
                        </div>
                        <div className='d-flex  '
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                setShowComments(true)
                            }}
                        >
                            <img
                                src={AppImages.comments}
                                className='like-styl comment-styl '
                            />
                            <p className='like-sec-p '>Comments {get(item, "comments", []) ? get(item, "comments", []).length : 0}</p>
                        </div>
                    </div>

                </div>
            </div> */}
            <GalleryModal
                show={showGallery}
                setShow={setShowGallery}
                mediaArray={get(item, "media", [])}
            />
            {get(item, "likes", []) &&
                <LikesModal
                    show={showLikes}
                    setShow={setShowLikes}
                    likesList={likesArray}
                    title={"All Likes"}
                />
            }
            {get(item, "comments", []) &&
                <CommentsModal
                    show={showComments}
                    setShow={setShowComments}
                    commentsList={commentsArray}
                    setCommentsArray={(list) => setCommentsArray(list)}
                    title={"All Comments"}
                />
            }
            {get(item, "reportedUserIds", []) &&
                <ReportedUsersModal
                    show={showReportedUsers}
                    setShow={setShowReportedUsers}
                    reportedUsersList={reportedUSers}
                    setReportedUsersList={(list) => setReportedUsers(list)}
                    title={"Reported Post Contributors"}
                    AllUsers={AllUsers}
                />
            }
        </li>
    )
}
