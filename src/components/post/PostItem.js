import React, { useState } from 'react'
import { AppImages } from '../../services/AppImages'
import ImgsViewer from "react-images-viewer";
import "../../App.css"


export default function PostItem({ name, message, profilePhoto, messageTime }) {
    const [imagesList, setImagesList] = useState([1, 2, 3, 4, 5])
    const [currImg, setCurrImg] = useState(0)
    const [imageViewer, setImageViewer] = useState(false)

    const imageStyl = {
        objectFit: "cover",
        width: "81px",
        height: "70px",

    }

    const gotoNext = () => {
        setCurrImg(currImg + 1)
    }

    const gotoPrevious = () => {
        setCurrImg(currImg - 1)
    }

    const closeViewer = () => {
        setImageViewer(false)
    }

    return (
        <li className="d-flex  mb-4">
            {/* <ImgsViewer
                imgs={[
                    { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9H5nwzfOqFlHqQTV3823zkJkzWVxkhntmMsw8K4gRoWn4H4TOYLUHen5-GJ5-eg2b_Qs&usqp=CAU" },
                    { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9H5nwzfOqFlHqQTV3823zkJkzWVxkhntmMsw8K4gRoWn4H4TOYLUHen5-GJ5-eg2b_Qs&usqp=CAU" },
                    { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9H5nwzfOqFlHqQTV3823zkJkzWVxkhntmMsw8K4gRoWn4H4TOYLUHen5-GJ5-eg2b_Qs&usqp=CAU" },
                    { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9H5nwzfOqFlHqQTV3823zkJkzWVxkhntmMsw8K4gRoWn4H4TOYLUHen5-GJ5-eg2b_Qs&usqp=CAU" },
                    { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9H5nwzfOqFlHqQTV3823zkJkzWVxkhntmMsw8K4gRoWn4H4TOYLUHen5-GJ5-eg2b_Qs&usqp=CAU" },
                ]}
                // currImg={currImg}
                // isOpen={imageViewer}
                isOpen={true}
                // onClickPrev={gotoPrevious}
                // onClickNext={gotoNext}
                onClose={closeViewer}
            /> */}
            <img style={imageStyl}
                src={profilePhoto} alt="avatar"
                className="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60" />
            <div className="card w-100 ">
                <div className="card-header d-flex justify-content-between p-3">
                    <p className="fw-bold mb-0 chat-name">{name}</p>
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
                                    setCurrImg(index + 1)
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
                    </div>
                </div>
            </div>
        </li>
    )
}
