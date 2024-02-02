import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../App.css"

function DeleteCommentModal({ title = "", desc = "", btnText = "", onClickDone, show = false, setShow, centered = false }) {
    const handleClose = () => {
        setShow(false);
    }

    const btnStyles = { height: "36px", lineHeight: "0px" }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered={centered}
                className='delete-comment-modal '
                dialogClassName='justify-content-center '
            >
                <Modal.Header>
                    <Modal.Title style={{ fontSize: "17px" }}>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontSize: "14px" }}>
                    {desc}
                </Modal.Body>
                <Modal.Footer className='justify-content-center '>
                    <Button
                        style={btnStyles}
                        variant="secondary" onClick={handleClose}
                    >
                        No
                    </Button>
                    <Button
                        style={btnStyles}
                        variant="primary" onClick={() => onClickDone()}
                    >{btnText}</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteCommentModal;