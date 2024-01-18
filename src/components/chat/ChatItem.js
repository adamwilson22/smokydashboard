import React from 'react'
import "../../App.css"

export default function ChatItem({ type = "", name, message, profilePhoto, messageTime }) {
    const imageStyl = {
        objectFit: "cover",
        width: "81px",
        height: "70px",

    }
    return (
        type == "receiver" ?
            <li className="d-flex  mb-4">
                <img style={imageStyl}
                    src={profilePhoto} alt="avatar"
                    className="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="50" />
                <div className="card w-100 ">
                    <div className="card-header d-flex justify-content-between p-3">
                        <p className="fw-bold mb-0 chat-name">{name}</p>
                        <p className="text-muted small mb-0 "><i className="far fa-clock"></i> {messageTime}</p>
                    </div>
                    <div className="card-body">
                        <p className="mb-0 text-start  chat-msg">
                            {message}
                        </p>
                    </div>
                </div>
            </li>
            :
            <li className="d-flex  mb-4">
                <div className="card w-100">
                    <div className="card-header d-flex justify-content-between p-3">
                        <p className="fw-bold mb-0 chat-name">{name}</p>
                        <p className="text-muted small mb-0  "><i className="far fa-clock"></i>{messageTime}</p>
                    </div>
                    <div className="card-body">
                        <p className="mb-0 text-start chat-msg">
                            {message}
                        </p>
                    </div>
                </div>
                <img style={imageStyl} src={profilePhoto} alt="avatar"
                    className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong" width="60" />
            </li>
    )
}
