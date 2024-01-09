import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
import { AppLogger } from '../../services/AppLogger';
import { handleDateTime } from '../../services/AppConstant';
import firebaseServices from "../../services/unit.service"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import Navigation from '../navbar/Navigation';
import Navigation from "../../components/navbar/Navigation"
import Sidebar from '../../components/sidebar/Sidebar'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChatItem from '../../components/chat/ChatItem';
import "../../App.css"
import { AppImages } from '../../services/AppImages';
import PostItem from '../../components/post/PostItem';


function ListOfPosts() {

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
                        <Link className='back-btn override' to="/list-chats"><ArrowBackIcon /> Back to Home </Link>
                        <h2><strong>{"Posts posted by user"}</strong></h2>
                        <div />
                    </div>
                    <Row>
                        <Col>
                            <section >
                                <div className="container py-5">
                                    <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                            <ul className="list-unstyled">

                                                {/* <ChatItem
                                                    type={"sender"}
                                                    name={"lara croft"}
                                                    message={`   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                                                labore et dolore magna aliqua.`}
                                                    profilePhoto={AppImages.placeholder}

                                                />
                                                <ChatItem
                                                    type={"receiver"}
                                                    name={"Brad pit"}
                                                    message={`   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                                                labore et dolore magna aliqua.`}
                                                    profilePhoto={AppImages.placeholder}
                                                /> */}
                                                <PostItem
                                                    name={"lara croft"}
                                                    message={`   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                                                labore et dolore magna aliqua.`}
                                                    profilePhoto={AppImages.placeholder}
                                                />
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default ListOfPosts