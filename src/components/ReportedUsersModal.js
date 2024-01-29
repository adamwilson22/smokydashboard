import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { AppImages } from '../services/AppImages';
import { DateFormats, handleDateString, handleDateTime } from '../services/AppConstant';
import { AppLogger } from '../services/AppLogger';
import { get } from 'lodash';
import CommentItem from './CommentItem';

function ReportedUsersModal({ title = "", show = false, setShow, reportedUsersList = [], setReportedUsersList, AllUsers = [] }) {
    const handleClose = () => {
        setShow(false);
    }

    // const handleShowAllRepliesFrComment = (index, value, key) => {
    //     var finalArray = [...reportedUsersList]
    //     finalArray[index][key] = !value
    //     setReportedUsersList([...finalArray])
    // }

    useEffect(() => {
        AppLogger("here", "1")
        if (reportedUsersList.length > 0 && show) {
            AppLogger("here", "2")
            handleUserDetailsForPosts()
        }
    }, [show])

    const handleUserDetailsForPosts = () => {
        // reportedUserId
        var finalArray = []
        if (Array.isArray(reportedUsersList)) {
            reportedUsersList.forEach((element) => {
                const getUser = AllUsers.find((usrItem) => get(usrItem, "id", "") == get(element, "reportedUserId", ""))
                finalArray.push({
                    ...element,
                    profilePicture: get(getUser, "profilePicture", ""),
                    fullName: get(getUser, "fullName", "")
                })
            })

            setReportedUsersList(finalArray)
            // AppLogger("final likes array", finalArray)
        }
    }

    return (
        <Modal
            centered
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='overflow-y-scroll overflow-x-hidden cus-scrol mb-1' style={{ height: "350px" }}>
                {reportedUsersList.length > 0 &&
                    reportedUsersList.map((item, index) =>
                        <div key={index} className='mb-2'>
                            <CommentItem
                                name={get(item, "fullName", "")}
                                profilePic={get(item, "profilePicture", "")}
                                desc={get(item, "reportedReason", "No comments")}
                                createdAt={handleDateTime(get(item, "createdAt", ""), DateFormats.dateFormatString)}
                                showReplies={false}
                                showLikes={false}
                            />
                        </div>
                    )
                }
            </Modal.Body>
        </Modal>
    );
}

export default ReportedUsersModal;