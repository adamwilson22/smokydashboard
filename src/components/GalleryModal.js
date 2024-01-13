import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AppImages } from '../services/AppImages';

function GalleryModal({ title = "", desc = "", btnText = "", onClickDone, show = false, setShow }) {
    const handleClose = () => {
        setShow(false);
    }

    const mediaArray = [
        {
            id: 1,
            type: "image",
            imageLink: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D",
        },
        {
            id: 2,
            type: "image",
            imageLink: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D",
        },
        {
            id: 3,
            type: "image",
            imageLink: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D",
        },
        {
            id: 4,
            type: "video",
            thumbnail: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D",
            videoLink: "",
        },
        {
            id: 5,
            type: "image",
            imageLink: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D",
        },

        {
            id: 6,
            type: "image",
            imageLink: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D",
        },

    ]

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body >
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

    );
}

export default GalleryModal;