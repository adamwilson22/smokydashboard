import React, { useState, useEffect } from 'react'
import { AppImages } from '../../services/AppImages';
import { Link } from 'react-router-dom';
import { filter, get } from 'lodash';
import { AppLogger } from '../../services/AppLogger';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Navigation from "../../components/navbar/Navigation"
import Sidebar from '../../components/sidebar/Sidebar'
import PostItem from '../../components/post/PostItem';
import UnitDataService from "../../services/unit.service"
import FBServices from "../../services/unit.services"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../../App.css"
import AppRoutes from '../../services/AppRoutes';
import ChatItem from '../../components/chat/ChatItem';
import { handleDateTime } from '../../services/AppConstant';
import FeedbackItem from '../../components/post/FeedbackItem';

function HelpAndFeedback() {
    const [feedbacksList, setFeedbacksList] = useState([])
    const [filteredFeedbacks, setFilteredFeedbacks] = useState([])

    useEffect(() => {
        getFeedbacksList()
    }, [])

    const getFeedbacksList = async () => {
        const data = await UnitDataService.getAllFeedbacks();
        setFeedbacksList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))


        data.docs.map((doc) => {
            AppLogger("Feedback item", doc.data())
        })
    }

    const handleUserDetails = () => {
        var finalArray = []
        feedbacksList.forEach(async (element) => {
            const userDetails = await FBServices.getUserDetails(element.userId);

            finalArray.push({
                ...element,
                userDetails: userDetails.docs[0].data(),
                fullName: userDetails.docs[0].data().fullName,
                profilePicture: userDetails.docs[0].data().profilePicture
            })

            setFilteredFeedbacks(...filteredFeedbacks, finalArray)
        })
    }

    useEffect(() => {
        if (feedbacksList.length != 0) {
            handleUserDetails()
        }
    }, [feedbacksList])


    useEffect(() => {
        AppLogger("Filtered Feedbacks", filteredFeedbacks)
    }, [filteredFeedbacks])


    return (
        <>
            <div className='side-wrp'>
                <Sidebar />
            </div>
            <Navigation
                originalList={[]}
                updatedList={() => { }}
                searchKey={""}
                showSearh={false}
                setSearchQuery={(val) => null}
            />
            <Row className='full-height'>
                <Col className='white-bg '>
                    <div style={{ alignItems: "center", display: "flex", flexDirection: "row", justifyContent: "space-between", }}>
                        <Link className='back-btn override' to={AppRoutes.home}><ArrowBackIcon /> Back to Home </Link>
                        <h2><strong>{"Help & Feedback"}</strong></h2>
                        <div />
                    </div>
                </Col>
                <Row>
                    <Col>
                        <section >
                            <div className="container py-5">
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                        <ul className="list-unstyled">
                                            {/* <ChatItem
                                                        key={index}
                                                        message={item.message}
                                                        messageTime={handleDateTime(item.createdAt)}
                                                        name={item.fullName}
                                                        type='receiver'
                                                        profilePhoto={item.profilePicture}
                                                    /> */}
                                            <li className="d-flex  mb-4">
                                                {filteredFeedbacks.length > 0 ?
                                                    filteredFeedbacks.map((item, index) =>
                                                        <FeedbackItem
                                                            key={index}
                                                            message={item.message}
                                                            messageTime={handleDateTime(item.createdAt)}
                                                            name={item.fullName}
                                                            profilePhoto={item.profilePicture}
                                                            showLikes={false}
                                                            showComments={false}
                                                            mediaArray={get(item, "feedbackImagesURLs", [])}
                                                            onMediaClick={() => { }}
                                                            showReportedUsers={false}
                                                        />
                                                    )
                                                    :
                                                    <div>
                                                        <h4>No Record Found</h4>
                                                    </div>
                                                }
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </Col>
                </Row>
            </Row>
        </>
    );
}

export default HelpAndFeedback