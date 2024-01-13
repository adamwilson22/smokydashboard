import React, { useState, useCallback } from 'react'
import { AppImages } from '../../services/AppImages'
import ImageViewer from 'react-simple-image-viewer';
import "../../App.css"
import LikesModal from '../LikesModal';
import GalleryModal from '../GalleryModal';
import ReactImageGallery from 'react-image-gallery';


export default function PostItem({ name, message, profilePhoto, messageTime }) {
    const [imagesList, setImagesList] = useState([1, 2, 3, 4, 5])
    const [imageViewer, setImageViewer] = useState(false)

    const imageStyl = {
        objectFit: "cover",
        width: "60px",
        height: "50px",
    }

    // src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9H5nwzfOqFlHqQTV3823zkJkzWVxkhntmMsw8K4gRoWn4H4TOYLUHen5-GJ5-eg2b_Qs&usqp=CAU"


    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const images = [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9H5nwzfOqFlHqQTV3823zkJkzWVxkhntmMsw8K4gRoWn4H4TOYLUHen5-GJ5-eg2b_Qs&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9H5nwzfOqFlHqQTV3823zkJkzWVxkhntmMsw8K4gRoWn4H4TOYLUHen5-GJ5-eg2b_Qs&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9H5nwzfOqFlHqQTV3823zkJkzWVxkhntmMsw8K4gRoWn4H4TOYLUHen5-GJ5-eg2b_Qs&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9H5nwzfOqFlHqQTV3823zkJkzWVxkhntmMsw8K4gRoWn4H4TOYLUHen5-GJ5-eg2b_Qs&usqp=CAU',
        'https://www.youtube.com/watch?v=6TbG2EJITQY',
    ];

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };



    const renderVideo = (item) => {
        return (
            <div className="video-wrapper">
                <iframe
                    width="100%"
                    height="480px"
                    src={item.embedUrl}
                    frameBorder="0"
                    allowFullScreen
                    title="ex"
                />
            </div>
        );
    };


    const images2 = [
        {
            original: 'https://picsum.photos/id/1018/1000/600/',
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1015/1000/600/',
            thumbnail: 'https://picsum.photos/id/1015/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1019/1000/600/',
            thumbnail: 'https://picsum.photos/id/1019/250/150/',
        },
        {
            embedUrl:
                'https://www.youtube.com/embed/4pSzhZ76GdM?autoplay=1&showinfo=0',
            original:
                'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/4v.jpg',
            thumbnail:
                'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/4v.jpg',
            renderItem: renderVideo(),
        },
    ];

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
                        {imagesList.slice(0, 4).map((item, index) => {
                            return (
                                <div onClick={() => {
                                    setImageViewer(true)
                                    console.log("hereee")
                                }}
                                    className='position-relative  post-cont'>
                                    <img
                                        className='post-img'
                                        src={AppImages.placeholder}
                                        alt='post-images'
                                    />
                                    {(imagesList.length > 4 && index == 3) &&
                                        <div className='plus-cont abs-cent-align'>
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
                        {/* {imageViewer &&
                            <ImageViewer
                                backgroundStyle={{ zIndex: "999" }}
                                src={images}
                                currentIndex={currentImage}
                                disableScroll={false}
                                closeOnClickOutside={true}
                                onClose={closeImageViewer}
                            />
                        } */}
                    </div>
                    <div className='d-flex  '>
                        <div className='d-flex '
                            style={{ cursor: "pointer" }}
                        >
                            <img
                                src={AppImages.like}
                                className='like-styl '
                            />
                            <p className='like-sec-p '>Likes 21</p>
                        </div>
                        <div className='d-flex  '
                            style={{ cursor: "pointer" }}
                        >
                            <img
                                src={AppImages.comments}
                                className='comment-styl '
                            />
                            <p className='like-sec-p '>Comments 233</p>
                        </div>
                    </div>

                </div>
            </div>
            <LikesModal
                setShow={() => { }}
                // show={true}
                title='Likes'
            />
            <GalleryModal
                show={true}
                setShow={() => { }}
            />

            <ReactImageGallery
                items={images2}
                showIndex
                //   onSlide={handleSlideChange}
                //   showVideo={showVideo}
                showPlayButton
            />
        </li>
    )
}
