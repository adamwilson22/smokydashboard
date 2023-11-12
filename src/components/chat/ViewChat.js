import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
import { AppLogger } from '../../services/AppLogger';
import firebaseServices from "../../services/unit.service"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Navigation from '../navbar/Navigation';
import Sidebar from '../sidebar/Sidebar'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChatItem from './ChatItem';
import "../../App.css"
import { handleDateTime } from '../../services/AppConstant';


function ViewChat() {
    const history = useHistory();
    const { state } = useLocation();
    const [allMessages, setAllMessages] = useState([]);
    const [finalMessageList, setFinalMessageList] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        if (state) {
            // AppLogger("view chat state", state)
            // AppLogger("view chat state", state.chatItem)
            getAllMessages(state.chatItem.id)
        }
    }, [state])

    const getAllMessages = async (docid) => {
        const data = await firebaseServices.getSingleChatMessagesFire(docid);
        var arrayy = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

        AppLogger("all messages data ", arrayy)
        setAllMessages(arrayy)
    }

    useEffect(() => {
        if (allMessages.length > 0) {
            var dummyArray = []

            allMessages.forEach(msgItem => {
                AppLogger("msgItem", msgItem)

                state.chatItem.memberDetails.forEach((memberItem, index) => {
                    AppLogger("memberItem", memberItem)
                    if (msgItem.senderId == memberItem.uid) {
                        dummyArray.push({
                            ...msgItem,
                            fullName: memberItem.fullName,
                            profilePicture: memberItem.profilePicture,
                            messageType: index == 0 ? "receiver" : "sender"
                        })
                    }
                });
            });

            setFinalMessageList(dummyArray)
        }
    }, [allMessages])

    useEffect(() => {
        AppLogger("finalMessageList", finalMessageList)
    }, [finalMessageList])


    var finalList = []
    finalList = searchText ? searchList : finalMessageList

    return (
        <>
            <div className='side-wrp'>
                <Sidebar />
            </div>
            <Navigation
                originalList={finalMessageList}
                updatedList={(val) => setSearchList(val)}
                searchKey={"text"}
                showSearh={true}
                setSearchQuery={(val) => setSearchText(val)}
            />
            <Row className='full-height'>
                <Col className='white-bg '>
                    <div style={{ alignItems: "center", display: "flex", flexDirection: "row", justifyContent: "space-between", }}>
                        <Link className='back-btn override' to="/list-chats"><ArrowBackIcon /> Back to Chats list </Link>
                        <h2><strong>{state.chatTitle}</strong></h2>
                        <div />
                    </div>
                    <Row>
                        <Col>
                            <section >
                                <div className="container py-5">
                                    <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                            <ul className="list-unstyled">
                                                {finalList.length > 0 ?
                                                    finalList.map((item) =>
                                                        <ChatItem
                                                            key={item.id}
                                                            type={item.messageType}
                                                            name={item.fullName}
                                                            message={item.text}
                                                            profilePhoto={item.profilePicture}
                                                            messageTime={handleDateTime(item.createdAt)}
                                                        />
                                                    )
                                                    :
                                                    <div>
                                                        <h4>No Messages Found</h4>
                                                    </div>
                                                }
                                                {/* <ChatItem type={"sender"}
                                                    name={"lara croft"}
                                                    message={`   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                                                labore et dolore magna aliqua.`}
                                                    profilePhoto={""}
                                                />
                                                <ChatItem type={"receiver"}
                                                    name={"Brad pit"}
                                                    message={`   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                                                labore et dolore magna aliqua.`}
                                                    profilePhoto={""}
                                                />
                                                <ChatItem type={"sender"}
                                                    name={"lara croft"}
                                                    message={`   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                                                labore et dolore magna aliqua.`}
                                                    profilePhoto={""}
                                                /> */}
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

export default ViewChat