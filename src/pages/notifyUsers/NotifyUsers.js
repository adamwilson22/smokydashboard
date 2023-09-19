import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { AppLogger } from '../../services/AppLogger';
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import { AppImages } from '../../services/AppImages';
import { AppConstant, handleDateTime } from '../../services/AppConstant';
import UnitDataService from "../../services/unit.service"
import FBServices from "../../services/unit.services"
import Table from 'react-bootstrap/Table';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Sidebar from '../../components/sidebar/Sidebar';
import Navigation from '../../components/navbar/Navigation';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../../App.css';
import { firebaseMessaging } from '../../firebase-config';

function NotifyUsers({ }) {
    const history = useHistory();
    const [listOfUsers, setListOfUsers] = useState([]);
    const [notifyBody, setNotifyBody] = useState({
        title: "",
        body: "",
    });
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        getUsersForNotification();
    }, [])

    const getUsersForNotification = async () => {
        const data = await FBServices.getNotificationUsers();
        setListOfUsers(data.docs.map((doc) => ({
            value: doc.data().fcmToken, label: doc.data().fullName
        })))
    };

    useEffect(() => {
        AppLogger("selectedOptions", selectedOptions)
    }, [selectedOptions])

    // const handleUserName = () => {
    //     var finalArray = []
    //     subsPaymentList.forEach(async (element) => {
    //         const userDetails = await FBServices.getUserDetails(element.userId);
    //         finalArray.push({
    //             ...element,
    //             username: userDetails.docs[0].data().fullName
    //         })
    //         setSubsPaymentListFiltered(...subsPaymentListFiltered, finalArray)
    //     })
    // }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (selectedOptions.length != 0) {
            selectedOptions.forEach((item) => {
                AppLogger("item", item)
                if (item.value != "iOS Device") {
                    sendNotification(notifyBody.title, notifyBody.body, item.value)
                }
            })
        }
    }

    const sendNotification = (title, body, fcmToken) => {
        var apiBody = {
            notification: {
                body: body,
                title: title,
                priority: "high"
            },
            data: {},
            to: `${fcmToken}`
        }
        fetch("https://fcm.googleapis.com/fcm/send", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `key=${AppConstant.FCM_SERVER_KEY}`
            },
            body: JSON.stringify(apiBody)
        },)
            .then((response) => response.json())
            .then((data) => {
                AppLogger("data fcm send notification", data)
            })
            .catch((error) => {
                AppLogger("error fcm send notification", error)
            })
    }

    const selectAllOption = { label: 'Select All', value: '*' };

    const handleChange = (newSelectedOptions) => {
        AppLogger("value", newSelectedOptions)

        const selectAllIsSelected = !!newSelectedOptions.find(
            o => o.value === selectAllOption.value,
        );
        setSelectedOptions(
            selectAllIsSelected ?
                [{ label: "All", value: "*" }, ...listOfUsers]
                : newSelectedOptions
        )
    }

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
            />
            <Row className='full-height'>

                <Col className='white-bg'>
                    <Link className='back-btn' to="/home"><ArrowBackIcon /> Back to Home </Link>
                    <div className="greet-text">
                        <h2>Send Push Notifications to Users</h2>

                    </div>
                    <Row>
                        <Col>
                            <div className='charts '>
                                <Row>
                                    <Col style={{ height: "50px", marginBottom: "24px" }}>
                                        {listOfUsers.length != 0 &&
                                            <ReactSelect
                                                styles={{ height: "100%" }}
                                                // maxMenuHeight={100}
                                                options={[{ label: "All", value: "*" }, ...listOfUsers]}
                                                isMulti
                                                closeMenuOnSelect={false}
                                                hideSelectedOptions={false}
                                                // components={{
                                                //     Option
                                                // }}
                                                onChange={handleChange}
                                                allowSelectAll={true}
                                                value={selectedOptions}
                                                placeholder={"Select Users"}
                                                required
                                            />}
                                    </Col>
                                </Row>
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formBasicSerial">
                                                <Form.Control type="text"
                                                    required
                                                    placeholder='Title' fullWidth
                                                    label="Title" id="title"
                                                    value={notifyBody.title}
                                                    onChange={(e) => setNotifyBody({ ...notifyBody, title: e.target.value })}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formBasicSerial">
                                                <Form.Control as="textarea" rows={6}
                                                    required
                                                    placeholder='Body' fullWidth
                                                    label="Body" id="body"
                                                    value={notifyBody.body}
                                                    onChange={(e) => setNotifyBody({ ...notifyBody, body: e.target.value })}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className='btn-align'>
                                            <Button variant="primary" type='submit'>
                                                Send
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )

}

export default NotifyUsers