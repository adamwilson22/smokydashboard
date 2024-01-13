import React, { useState, useCallback } from 'react'
import { AppImages } from '../../services/AppImages'
import ImageViewer from 'react-simple-image-viewer';
import LikesModal from '../LikesModal';
import GalleryModal from '../GalleryModal';
import ReactImageGallery from 'react-image-gallery';
import "../../App.css"
import { get } from 'lodash';


export default function PostItem({ name, message, profilePhoto, messageTime, item }) {
    const [imagesList, setImagesList] = useState([1, 2, 3, 4, 5])
    const [showGallery, setShowGallery] = useState(false)

    const imageStyl = {
        objectFit: "cover",
        width: "60px",
        height: "50px",
    }

    const mediaArray = [
        {
            id: 1,
            mediaType: "image",
            imageLink: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D",
        },
        {
            id: 2,
            mediaType: "image",
            imageLink: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D",
        },
        {
            id: 3,
            mediaType: "image",
            imageLink: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D",
        },
        {
            id: 4,
            mediaType: "video",
            imageLink: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D",
            videoLink: "https://www.youtube.com/embed/4pSzhZ76GdM?autoplay=1&showinfo=0",
        },
        {
            id: 5,
            mediaType: "image",
            imageLink: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D",
        },

        {
            id: 6,
            mediaType: "image",
            imageLink: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D",
        },

    ]


    return (
        <li className="d-flex  mb-4">
            <img style={imageStyl}
                src={profilePhoto} alt="avatar"
                className="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60" />
            <div className="card w-100 ">
                <div className="card-header d-flex justify-content-between p-2">
                    <p style={{ marginLeft: "8px" }} className="fw-bold mb-0 chat-name">{name}</p>
                    <p className="text-muted small mb-0 "><i className="far fa-clock"></i> {messageTime}</p>
                </div>
                <div className="card-body d-flex flex-column justify-content-start  ">
                    <p className="mb-0 text-start  chat-msg">
                        {message}
                    </p>
                    <div className='d-flex flex-wrap justify-content-start mt-3  '>
                        {get(item, "media", []).slice(0, 4).map((mediaIte, index) => {
                            return (
                                <div
                                    key={index}
                                    className='position-relative  post-cont'>
                                    <img
                                        onClick={() => setShowGallery(true)}
                                        style={{ cursor: "pointer" }}
                                        className='post-img'
                                        src={
                                            mediaIte.mediaType == "video" ?
                                                mediaIte.mediaThumbnail
                                                : mediaIte.mediaURL
                                        }
                                        alt='post-images'
                                    />
                                    {(get(item, "media", []).length > 4 && index == 3) &&
                                        <div
                                            onClick={() => setShowGallery(true)}
                                            style={{ cursor: "pointer" }}
                                            className='plus-cont abs-cent-align'
                                        >
                                            <img
                                                className='plus-icon abs-cent-align'
                                                src={AppImages.plusIcon}
                                                alt='post-images'
                                            />
                                        </div>
                                    }
                                </div>
                            )
                        })}
                    </div>
                    <div className='d-flex  '>
                        <div className='d-flex '
                            style={{ cursor: "pointer" }}
                        >
                            <img
                                src={AppImages.like}
                                className='like-styl '
                            />
                            <p className='like-sec-p '>Likes {get(item, "likes", []) ? get(item, "likes", []).length : 0}</p>
                        </div>
                        <div className='d-flex  '
                            style={{ cursor: "pointer" }}
                        >
                            <img
                                src={AppImages.comments}
                                className='comment-styl '
                            />
                            <p className='like-sec-p '>Comments {get(item, "comments", []) ? get(item, "comments", []).length : 0}</p>
                        </div>
                    </div>

                </div>
            </div>
            <GalleryModal
                show={showGallery}
                setShow={setShowGallery}
                mediaArray={get(item, "media", [])}
            />
        </li>
    )
}
