import Modal from 'react-bootstrap/Modal';
import { AppImages } from '../services/AppImages';
import { get } from 'lodash';
import CommentItem from './CommentItem';

function CommentsModal({ title = "", show = false, setShow, commentsList, likesList = [23, 4, 234, 21, 34, 12, 34, 12, 34, 12, 342] }) {
    const handleClose = () => {
        setShow(false);
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
            <Modal.Body className='overflow-x-scroll ' style={{ height: "350px" }}>
                {commentsList.length > 0 &&
                    commentsList.map(() =>
                        <>
                            <CommentItem
                                showReplies={true}
                                replies={[23, 32, 4, 234, 23, 42, 34, 234, 23, 423, 423, 4]}
                            />
                            <div style={{ marginLeft: "56px" }}>
                                <div>
                                    <span style={{ margin: "3px" }}>All Replies</span>
                                    <img src={AppImages.upArrowIcon} style={{ width: "10px", height: "10px" }} />
                                </div>
                                {[12, 3, 12, 3, 12, , 31, 23].map((replyItem) =>
                                    <CommentItem className="mb-0 mt-2 " />
                                )}
                            </div>
                        </>
                    )
                }
            </Modal.Body>
            {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={() => onClickDone()}>{btnText}</Button>
                </Modal.Footer> */}
        </Modal>
    );
}

export default CommentsModal;