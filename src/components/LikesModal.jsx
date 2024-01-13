import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AppImages } from '../services/AppImages';

function LikesModal({ title = "", desc = "", btnText = "", onClickDone, show = false, setShow }) {
    const handleClose = () => {
        setShow(false);
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex '>
                        <img
                            src={AppImages.placeholder}
                            style={{ width: "30px", height: '30px', objectFit: 'cover' }}
                        />
                        <p style={{ fontSize: "20px", marginLeft: "12px" }}>Name</p>
                    </div>
                    <img
                        src={AppImages.like}
                        style={{
                            width: "26px", height: '26px', objectFit: 'cover',
                            marginLeft: "45px",
                            marginTop: -12
                        }}
                    />
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={() => onClickDone()}>{btnText}</Button>
                </Modal.Footer> */}
            </Modal>
        </>
    );
}

export default LikesModal;