import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CustomModal({ title = "", desc = "", btnText = "", onClickDone, show = false, setShow, centered = false }) {
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
                centered={centered}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {desc}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={() => onClickDone()}>{btnText}</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CustomModal;