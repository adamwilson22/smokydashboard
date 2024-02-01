import React, { useState, useEffect } from 'react'
import { AppImages } from '../../services/AppImages'
import { AppLogger } from '../../services/AppLogger';
import { get, update } from 'lodash';
import LikesModal from '../LikesModal';
import GalleryModal from '../GalleryModal';
import CommentsModal from '../CommentsModal';
import "../../App.css"
import FeedbackItem from './FeedbackItem';
import ReportedUsersModal from '../ReportedUsersModal';
import CustomModal from '../CustomModal';
import FirebaseServices from "../../services/unit.services"
import UnitServices from '../../services/unit.services';
import { showErrorToast, showSuccessToast } from '../../services/AppConstant';

export default function PostItem({ name, message, profilePhoto, messageTime, item, AllUsers = [] }) {
    const [showGallery, setShowGallery] = useState(false)
    const [selectedGalleryItem, setSelectedGalleryItem] = useState(0)
    const [showLikes, setShowLikes] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const [showReportedUsers, setShowReportedUsers] = useState(false)
    const [showPostDelete, setShowPostDelete] = useState(false)
    const [likesArray, setLikesArray] = useState(get(item, "likes", []))
    const [commentsArray, setCommentsArray] = useState(get(item, "comments", []))
    const [reportedUSers, setReportedUsers] = useState(get(item, "reportedUserIds", []))
    const [deleteModal, setDeleteModal] = useState({
        type: "",
        commentIndex: 0,
        replyIndex: 0,
        show: false,
    })

    const imageStyl = {
        objectFit: "cover",
        width: "60px",
        height: "50px",
    }

    useEffect(() => {
        handleUsersDetailsForComments()
        handleUserDetailsForLikes()

        AppLogger("post item", item)
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

    const handleRemovePost = async () => {
        try {
            await FirebaseServices.deletePost(get(item, "postId", ""))
            setShowPostDelete(false)
        } catch (error) {
            AppLogger("error removing product", error)
        }
    }

    const updatePost = async (commentsArray) => {
        setDeleteModal({ ...deleteModal, show: false })
        try {
            await UnitServices.updatePostFirebase(get(item, "postId", ""), commentsArray);

            showSuccessToast(`${deleteModal.type} deleted successfully`)
            setCommentsArray([...commentsArray])
        } catch (error) {
            AppLogger("error blocking user ", error)
            showErrorToast(error)
        }
    }

    const handleDeleteComment = () => {
        var arrayList = commentsArray.filter((it, i) => i != deleteModal.commentIndex)
        updatePost(arrayList)
    }

    const handleDeleteReply = () => {
        var finalComments = [...commentsArray]
        var finalReplies = finalComments[deleteModal.commentIndex]["replies"].filter((it, i) => i != deleteModal.replyIndex)
        finalComments[deleteModal.commentIndex]["replies"] = finalReplies
        updatePost(finalComments)
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
                onMediaClick={(index) => {
                    setShowGallery(true)
                    setSelectedGalleryItem(index)
                }}
                showLikes
                onLikesClick={() => setShowLikes(true)}
                likesArray={get(item, "likes", []) ? get(item, "likes", []) : []}
                showComments
                onCommentsClick={() => setShowComments(true)}
                commentsArray={get(item, "comments", []) ? get(item, "comments", []) : []}
                showReportedUsers={get(item, "reportedUserIds", []).length > 0}
                onReportedUsersClick={() => { setShowReportedUsers(true) }}
                reportedUsers={get(item, "reportedUserIds", [])}
                onOptionClick={() => { setShowPostDelete(true) }}
            />
            <GalleryModal
                show={showGallery}
                setShow={setShowGallery}
                mediaArray={get(item, "media", [])}
                selectedItem={selectedGalleryItem}
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
                    deleteCommentFunc={(commentIndex) => {
                        setDeleteModal({
                            type: "Comment",
                            commentIndex: commentIndex,
                            replyIndex: 0,
                            show: true,
                        })
                    }}
                    deleteReplyFunc={(comIndex, repIndex) => {
                        setDeleteModal({
                            type: "Reply",
                            commentIndex: comIndex,
                            replyIndex: repIndex,
                            show: true
                        })
                    }}
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
            <CustomModal
                show={showPostDelete}
                setShow={(val) => setShowPostDelete(val)}
                title={`Remove Post`}
                desc={`Are you sure you want to remove this post?`}
                btnText={`Yes`}
                onClickDone={() => handleRemovePost()}
            />
            <CustomModal
                show={deleteModal.show}
                setShow={(val) => setDeleteModal({ ...deleteModal, show: val })}
                title={`Remove ${deleteModal.type}`}
                desc={`Are you sure you want to remove this ${deleteModal.type}?`}
                btnText={`Yes`}
                onClickDone={() => deleteModal.type == "Comment" ? handleDeleteComment() : handleDeleteReply()}
                centered={true}
            />
        </li>
    )
}
