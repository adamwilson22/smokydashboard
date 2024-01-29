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

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function ListOfPosts() {
    const PostType = {
        allPosts: "all_posts",
        reportedPosts: "reported_posts"
    }

    const [listOfPosts, setlistOfPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [AllUsers, setAllUsers] = useState([])
    const [showReported, setShowReported] = useState(PostType.allPosts);

    const handleChange = (event, newValue) => {
        setShowReported(newValue);
        // if (newValue == PostType.allPosts) {
        //     AppLogger("allposts result", filteredPosts.filter((item) => item.reportedUserIds.length == 0))
        // } else {
        //     AppLogger("reported posts result", filteredPosts.filter((item) => item.reportedUserIds.length > 0))
        // }
    };

    useEffect(() => {
        getAllPosts();
        getAllUsers()
    }, [])

    const getAllPosts = async () => {
        const data = await UnitDataService.getAllPostsFrFirebase();
        setlistOfPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

        data.docs.map((doc) =>
            AppLogger("post item", doc.data())
        )
    };

    const getAllUsers = async () => {
        const data = await UnitDataService.getAllUnit();
        setAllUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    const handleUserDetails = () => {
        var finalArray = []

        listOfPosts.forEach(async (element) => {
            const userDetails = await FBServices.getUserDetails(element.createdBy);
            // AppLogger("userDetails", userDetails.docs[0].data())
            // AppLogger("typeof userDetails.docs", userDetails.docs)
            finalArray.push({
                ...element,
                userDetails: userDetails.docs[0].data(),
                fullName: userDetails.docs[0].data().fullName,
                profilePicture: userDetails.docs[0].data().profilePicture
            })

            // AppLogger("finallarrray payment", finalArray)
            setFilteredPosts(...filteredPosts, finalArray)
        })
    }

    useEffect(() => {
        if (listOfPosts.length != 0) {
            handleUserDetails()
        }
    }, [listOfPosts])

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
                    <div style={{ alignItems: "center", display: "flex", flexDirection: "column", }}>
                        {/* <Link className='back-btn override' to={AppRoutes.listChats}><ArrowBackIcon /> Back to Home </Link> */}
                        <h3><strong>{"Posts posted by user"}</strong></h3>
                        <Box sx={{ width: "100%" }}>
                            <Tabs
                                value={showReported}
                                onChange={handleChange}
                                textColor="inherit"
                                indicatorColor="primary"
                                aria-label="secondary tabs example"
                            >
                                <Tab value={PostType.allPosts} label="All Posts" />
                                <Tab value={PostType.reportedPosts} label="Reported Posts" />
                            </Tabs>
                        </Box>
                        <div />
                    </div>
                    <Row>
                        <Col>
                            <section >
                                <div className="container py-5">
                                    <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                            <ul className="list-unstyled">
                                                {filteredPosts.length > 0 ?
                                                    filteredPosts
                                                        .filter((item) =>
                                                            showReported == PostType.allPosts ?
                                                                item.reportedUserIds.length == 0
                                                                : item.reportedUserIds.length > 0
                                                        )
                                                        .map((item) =>
                                                            <PostItem
                                                                key={get(item, "postId", "")}
                                                                item={item}
                                                                name={get(item, "fullName", "")}
                                                                message={get(item, "caption", "")}
                                                                profilePhoto={get(item, "profilePicture", AppImages.placeholder)}
                                                                AllUsers={AllUsers}
                                                            />
                                                        )
                                                    :
                                                    <div>
                                                        <h4>No Posts Found</h4>
                                                    </div>
                                                }
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