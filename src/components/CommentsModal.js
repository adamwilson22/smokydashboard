import Modal from 'react-bootstrap/Modal';
import { AppImages } from '../services/AppImages';
import { handleDateString } from '../services/AppConstant';
import { AppLogger } from '../services/AppLogger';
import { get } from 'lodash';
import CommentItem from './CommentItem';

function CommentsModal({ title = "", show = false, setShow, commentsList = [], setCommentsArray, deleteCommentFunc, deleteReplyFunc }) {
    const handleClose = () => {
        setShow(false);
    }

    const handleShowAllRepliesFrComment = (index, value, key) => {
        var finalArray = [...commentsList]
        finalArray[index][key] = !value
        setCommentsArray([...finalArray])
    }

    return (
        <Modal
            centered
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='overflow-y-scroll overflow-x-hidden cus-scrol mb-1' style={{ height: "350px" }}>
                {commentsList.length > 0 &&
                    commentsList.map((item, index) =>
                        <div key={index}>
                            <CommentItem
                                name={get(item, "fullName", "")}
                                profilePic={get(item, "profilePicture", "")}
                                desc={get(item, "comment", "")}
                                createdAt={handleDateString(get(item, "createdAt", ""))}
                                likes={item.likes ?? []}
                                replies={item.replies ?? []}
                                onOptionClick={() => deleteCommentFunc(index)}
                            />
                            {get(item, "replies", []) && get(item, "replies", []).length > 0 &&
                                <div style={{ marginLeft: "9px", marginBottom: "12px" }}>
                                    <div className='d-flex align-items-center  ' >
                                        <div className='line' />
                                        <div
                                            className='btn p-0'
                                            onClick={() => handleShowAllRepliesFrComment(index, get(item, "showAllReplies", false), "showAllReplies")}
                                        >
                                            <span className='all-replies '> All Replies</span>
                                            <img
                                                className={`${!get(item, "showAllReplies", false) && "collapse-reply"}`}
                                                src={AppImages.upArrowIcon} style={{ width: "14px", height: "14px" }}
                                            />
                                        </div>
                                    </div>
                                    {get(item, "showAllReplies", false) && get(item, "replies", []).map((replyItem, replyIndex) =>
                                        <CommentItem
                                            customStyles={{ marginLeft: "30px" }}
                                            key={replyIndex}
                                            className="mb-0 mt-2 "
                                            name={get(replyItem, "fullName", "")}
                                            profilePic={get(replyItem, "profilePicture", "")}
                                            desc={get(replyItem, "reply", "")}
                                            createdAt={handleDateString(get(replyItem, "createdAt", ""))}
                                            likes={replyItem.likes ?? []}
                                            showReplies={false}
                                            onOptionClick={() => deleteReplyFunc(index, replyIndex)}
                                        />
                                    )}
                                </div>
                            }
                        </div>
                    )
                }
            </Modal.Body>
        </Modal>
    );
}

export default CommentsModal;