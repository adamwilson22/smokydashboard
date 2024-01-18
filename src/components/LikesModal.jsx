import Modal from 'react-bootstrap/Modal';
import { AppImages } from '../services/AppImages';

function LikesModal({ title = "", show = false, setShow, likesList = [] }) {
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
                {likesList.length > 0 &&
                    likesList.map(() =>
                        <div className='d-flex align-items-center mb-4 '>
                            <div className='position-relative  '>
                                <img
                                    className='profile-pic '
                                    src={AppImages.placeholder}
                                />
                                <img
                                    src={AppImages.likedIcon}
                                    className='position-absolute liked-icon-styl '
                                />
                            </div>
                            <span className='username '>
                                Name
                            </span>
                        </div>
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

export default LikesModal;