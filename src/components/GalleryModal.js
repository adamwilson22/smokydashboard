import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import Modal from 'react-bootstrap/Modal';

function GalleryModal({ show = false, setShow, mediaArray = [] }) {
    const [selectedMedia, setSelectedMedia] = useState(null)

    const handleClose = () => {
        setShow(false);
    }

    useEffect(() => {
        if (mediaArray.length > 0)
            setSelectedMedia(mediaArray[0])
    }, [mediaArray])

    return (
        <Modal
            fullscreen={true}
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body >
                <div className='d-flex '
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.33)', width: "100%", height: "100%" }}
                >
                    {/* item.mediaType == "video" ?
                                    item.mediaThumbnail
                                    : item.mediaURL */}
                    {selectedMedia && get(selectedMedia, "mediaType", "") == "image" ?
                        <img
                            src={get(selectedMedia, "mediaURL", "")}
                            style={{
                                width: "100%", height: '100%', objectFit: 'contain',
                            }}
                        />
                        :
                        <iframe
                            width="100%"
                            height="100%"
                            src={get(selectedMedia, "mediaThumbnail", "")}
                            // src={"https://www.youtube.com/embed/4pSzhZ76GdM?autoplay=1&showinfo=0"}
                            frameBorder="0"
                            allowFullScreen
                            title="ex"
                        />
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div style={{
                    width: "100%", height: '150px',
                    alignItems: 'center',
                    display: 'flex',
                    overflowX: 'scroll'
                }}>
                    {mediaArray.map((item, index) =>
                        <img
                            key={index}
                            src={
                                item.mediaType == "video" ?
                                    item.mediaThumbnail
                                    : item.mediaURL
                            }
                            style={{
                                width: '130px', height: "130px",
                                marginRight: "6px",
                                marginLeft: "6px",
                                cursor: "pointer",
                                border: get(selectedMedia, "id", 0) == index ? "2.7px solid #FF7F7F" : "0px"
                            }}
                            onClick={() => setSelectedMedia({ ...item, id: index })}
                        />
                    )}
                </div>
            </Modal.Footer>
        </Modal>

    );
}

export default GalleryModal;