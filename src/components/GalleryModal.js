import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import Modal from 'react-bootstrap/Modal';
import ReactPlayer from 'react-player';
import { AppImages } from '../services/AppImages';
import { AppLogger } from '../services/AppLogger';

function GalleryModal({ show = false, setShow, mediaArray = [], selectedItem = 0 }) {
    const [selectedMedia, setSelectedMedia] = useState(null)

    const handleClose = () => {
        setShow(false);
    }

    useEffect(() => {
        if (mediaArray.length > 0)
            setSelectedMedia({ ...mediaArray[selectedItem], id: selectedItem })
    }, [mediaArray, selectedItem])

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
            <Modal.Body className='p-1 ' style={{ backgroundColor: "rgba(0, 0, 0, 1)" }}>
                <div className='d-flex w-100 h-100 cus-scrol '
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
                >
                    {selectedMedia && get(selectedMedia, "mediaType", "") == "image" ?
                        <img
                            src={get(selectedMedia, "mediaURL", "")}
                            className='w-100 h-100 object-fit-contain '
                        />
                        :
                        <ReactPlayer
                            url={get(selectedMedia, "mediaURL", "")}
                            width='100%'
                            height='100%'
                            playing={true}
                            controls={true}
                            volume={1}
                            progressInterval={5000}
                            pip={true}
                        />
                    }
                    {/* <iframe
                            width="100%"
                            height="100%"
                            src={get(selectedMedia, "mediaURL", "")}
                            // src="https://firebasestorage.googleapis.com/v0/b/outdoor-trader-8acf0.appspot.com/o/posts%2FFish-x1iE1oztSZhNRykVxDjzPWvEJwT2%2F1705325574266?alt=media&token=fa77fb56-32e1-41df-8aa9-088d9303acd5"
                            frameBorder="0"
                            allowFullScreen
                            title="ex"
                        /> */}
                </div>
            </Modal.Body>
            <Modal.Footer className='p-0'>
                <div className='gallery-list cus-scrol'>
                    {mediaArray.map((item, index) =>
                        <div className='position-relative '
                            onClick={() => setSelectedMedia({ ...item, id: index })}
                        >
                            <img
                                key={index}
                                src={
                                    item.mediaType == "video" ?
                                        item.mediaThumbnail
                                        : item.mediaURL
                                }
                                className='gallery-item'
                                style={{
                                    border: get(selectedMedia, "id", 0) == index ? "2.7px solid #FF7F7F" : "0px"
                                }}

                            />
                            {item.mediaType == "video" &&
                                <div
                                    style={{ cursor: "pointer", backgroundColor: "transparent" }}
                                    className='plus-cont abs-cent-align'
                                >
                                    <img
                                        className='plus-icon abs-cent-align play-icon'
                                        src={AppImages.playIcon}
                                        alt='post-images'
                                    />
                                </div>
                            }
                        </div>
                    )}
                </div>
            </Modal.Footer>
        </Modal>

    );
}

export default GalleryModal;