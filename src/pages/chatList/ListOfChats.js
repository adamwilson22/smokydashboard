
import React, { useState, useEffect, } from 'react'
import { Button } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import { AppLogger } from '../../services/AppLogger';
import firebaseServices from "../../services/unit.service"
import FBServices from "../../services/unit.services"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Sidebar from '../../components/sidebar/Sidebar'
import Navigation from '../../components/navbar/Navigation'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import AppRoutes from '../../services/AppRoutes';

export default function ListOfChats() {

    const history = useHistory();
    const [chatsList, setChatsList] = useState([])
    const [updatedChatsList, setUpdatedChatsList] = useState([])
    const [finalArrayChatList, setFinalArrayChatList] = useState([])
    const [searchList, setSearchList] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        getAllChats()
    }, [])

    const getAllChats = async () => {
        const data = await firebaseServices.getAllChatsFirebase();
        var arrayy = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

        handleMemberDetails(arrayy)

        // AppLogger("all chats list ", data)
        // data.docs.map((doc) => {
        //     AppLogger("all chats doc.data()", doc.data())
        //     AppLogger("doc.id", doc.id)
        // })
    }

    const handleMemberDetails = (chatsList) => {
        var finalArray = []
        var userDetailsArray = []

        chatsList.forEach((element) => {
            element.members.forEach(async (memElement) => {
                const userDetails = await FBServices.getUserDetails(memElement);
                userDetailsArray.push({ userDetails: userDetails.docs[0].data(), id: element.id })
                setUpdatedChatsList(userDetailsArray)
            });

            finalArray.push({ ...element, })
        })

        setChatsList(finalArray)
    }

    useEffect(() => {
        if (updatedChatsList.length > 0) {
            filterChatList()
        }
    }, [updatedChatsList])


    const filterChatList = () => {
        var finalArr = []

        chatsList.forEach(element => {
            var memberAray = []
            var chatName = ""
            updatedChatsList.forEach(upItem => {
                if (element.id == upItem.id) {
                    memberAray.push({ ...upItem.userDetails })
                }
            });

            memberAray.forEach((memberElement, index) => {
                chatName += memberElement?.fullName
                if (index != memberAray.length - 1) {
                    chatName += " - "
                }
            });

            finalArr.push({
                ...element,
                memberDetails: memberAray,
                chatName: chatName,
            })
        });

        setFinalArrayChatList(finalArr)
    }

    useEffect(() => {
        AppLogger("finalArrayChatList", finalArrayChatList)
    }, [finalArrayChatList])


    var finalList = []
    finalList = searchText ? searchList : finalArrayChatList ?? []

    return (
        <div>

            <div className='side-wrp'>
                <Sidebar />
            </div>
            <Navigation
                originalList={finalArrayChatList}
                updatedList={(val) => setSearchList(val)}
                searchKey={"chatName"}
                showSearh={true}
                setSearchQuery={(val) => setSearchText(val)}
            />
            <Row className='full-height'>
                <Col className='white-bg'>
                    <Link className='back-btn override' to={AppRoutes.home}><ArrowBackIcon /> Back to Dashboard </Link>
                    <Row>
                        <Col>
                            <div className='table-wrap'>
                                <h3 className='main-third'>Chats List</h3>

                                <Table striped bordered hover responsive>
                                    {/* <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Chat-Between</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead> */}
                                    <tbody>
                                        {finalList.length > 0 ?
                                            finalList.map((doc, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            {index + 1}
                                                        </td>
                                                        <td>
                                                            {doc.chatName}
                                                        </td>
                                                        <td className='flexColumn'>
                                                            <Button
                                                                variant=''
                                                                className='edit'
                                                                onClick={(e) => {
                                                                    history.push(AppRoutes.viewChat,
                                                                        { chatItem: doc, chatTitle: doc.chatName }
                                                                    )
                                                                }}
                                                            >
                                                                View Chat
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                )
                                            }) :
                                            <tr>
                                                <td colSpan={9} >
                                                    <p>No Chats found</p>
                                                </td>
                                            </tr>
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>

        </div>

    )
}
