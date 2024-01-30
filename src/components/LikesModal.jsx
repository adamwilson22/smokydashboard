import Modal from 'react-bootstrap/Modal';
import { AppImages } from '../services/AppImages';
import { get } from 'lodash';
import { DateFormats, handleDateTime } from '../services/AppConstant';

function LikesModal({ title = "", show = false, setShow, likesList = [23, 4, 2134, , 2134, 1, 234] }) {
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
            <Modal.Body className='overflow-y-scroll overflow-x-hidden cus-scrol mb-1' style={{ height: "350px" }}>
                {likesList.length > 0 &&
                    likesList.map((item, index) =>
                        <div key={index} className='d-flex align-items-center mb-4 '>
                            <div className='position-relative  '>
                                <img
                                    className='profile-pic '
                                    src={get(item, "profilePicture", AppImages.placeholder)}
                                />
                                <img
                                    src={AppImages.emojis[get(item, "likeId", "like1")]}
                                    className='position-absolute liked-icon-styl '
                                />
                            </div>
                            <div className='d-flex flex-column '>
                                <span className='username '>
                                    {get(item, "fullName", "")}
                                </span>
                                <span className='comment-time' style={{ marginLeft: "12px" }}>
                                    {handleDateTime(get(item, "createdAt", ""), DateFormats.dateFormatString)}
                                </span>
                            </div>
                        </div>
                    )
                }
            </Modal.Body>
        </Modal>
    );
}

export default LikesModal;